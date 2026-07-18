from rest_framework import viewsets, views, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import AIConversation, AIMessage, QuizHistory, StudyPlan, ResumeAnalysis
from .serializers import AIConversationSerializer, AIMessageSerializer, QuizHistorySerializer, StudyPlanSerializer, ResumeAnalysisSerializer
from . import services

class AIConversationViewSet(viewsets.ModelViewSet):
    serializer_class = AIConversationSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return AIConversation.objects.filter(user=self.request.user, is_archived=False)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def chat(self, request, pk=None):
        conversation = self.get_object()
        user_message = request.data.get('message', '')
        if not user_message:
            return Response({'error': 'Message is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Save user message
        AIMessage.objects.create(conversation=conversation, role='user', content=user_message)

        # Build history for AI
        history = [
            {'role': 'model' if m.role == 'assistant' else m.role, 'parts': [m.content]}
            for m in conversation.messages.all().order_by('created_at')
        ]

        # Get AI response
        ai_response = services.chat_with_ai(history)

        # Save AI response
        ai_msg = AIMessage.objects.create(conversation=conversation, role='assistant', content=ai_response)

        # Update title if first message
        if conversation.messages.count() <= 2:
            conversation.title = user_message[:60]
            conversation.save(update_fields=['title'])

        return Response({'response': ai_response, 'message_id': str(ai_msg.id)})

class QuizGeneratorView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        topic = request.data.get('topic', '')
        difficulty = request.data.get('difficulty', 'Medium')
        count = int(request.data.get('count', 5))
        if not topic:
            return Response({'error': 'Topic is required.'}, status=status.HTTP_400_BAD_REQUEST)
        result = services.generate_quiz(topic, difficulty, count)
        return Response(result)

    def put(self, request):
        """Save quiz result to history."""
        serializer = QuizHistorySerializer(data={**request.data, 'user': request.user.id})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudyPlannerView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        subject = request.data.get('subject', '')
        days = int(request.data.get('days', 7))
        if not subject:
            return Response({'error': 'Subject is required.'}, status=status.HTTP_400_BAD_REQUEST)
        result = services.generate_study_plan(subject, days)

        # Auto-save to DB
        plan = StudyPlan.objects.create(
            user=request.user,
            subject=subject,
            duration_days=days,
            plan_data=result
        )
        return Response({**result, 'plan_id': str(plan.id)})

    def get(self, request):
        plans = StudyPlan.objects.filter(user=request.user)
        return Response(StudyPlanSerializer(plans, many=True).data)

class CodeAssistantView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        prompt = request.data.get('prompt', '')
        language = request.data.get('language', 'python')
        if not prompt:
            return Response({'error': 'Prompt is required.'}, status=status.HTTP_400_BAD_REQUEST)
        result = services.analyze_code(prompt, language)
        return Response(result)

class NotesSummarizerView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        text = request.data.get('text', '')
        if not text:
            return Response({'error': 'Text is required.'}, status=status.HTTP_400_BAD_REQUEST)
        result = services.summarize_notes(text)
        return Response(result)

class ResumeAnalyzerView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        import random
        resume_file = request.FILES.get('resume')
        # For now simulate ATS scoring (real implementation would parse PDF)
        ats_score = random.randint(55, 95)
        analysis = {
            'atsScore': ats_score,
            'summary': f'Your resume scored {ats_score}/100 on ATS compatibility.',
            'improvements': [
                'Add more quantifiable achievements.',
                'Include relevant keywords for your target role.',
                'Improve formatting for ATS readability.',
            ],
            'keywordsToInclude': ['Python', 'Django', 'REST API', 'PostgreSQL', 'Docker'],
        }
        result = ResumeAnalysis.objects.create(
            user=request.user,
            resume_file=resume_file,
            ats_score=ats_score,
            analysis_result=analysis,
            improvements=analysis['improvements'],
            keywords=analysis['keywordsToInclude'],
        )
        return Response(ResumeAnalysisSerializer(result).data, status=status.HTTP_201_CREATED)

class AIUsageStatsView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        total_conversations = AIConversation.objects.filter(user=user).count()
        total_messages = AIMessage.objects.filter(conversation__user=user).count()
        quizzes_taken = QuizHistory.objects.filter(user=user).count()
        resumes_analyzed = ResumeAnalysis.objects.filter(user=user).count()
        recent_outputs = [
            {'type': 'quiz', 'title': q.topic, 'date': q.created_at.strftime('%d %b')}
            for q in QuizHistory.objects.filter(user=user).order_by('-created_at')[:3]
        ]
        return Response({
            'totalTokens': total_messages * 150,
            'quizzesTaken': quizzes_taken,
            'resumesAnalyzed': resumes_analyzed,
            'totalConversations': total_conversations,
            'recentOutputs': recent_outputs,
        })

class SmartSearchView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        query = request.query_params.get('q', '').lower()
        if not query:
            return Response([
                {'category': 'Quick Actions', 'items': ['Create New Assignment', 'Check Notifications']},
                {'category': 'Recent', 'items': ['Math 101', 'Physics Lab']}
            ])

        from apps.courses.models import Course
        from apps.assignments.models import Assignment
        from apps.resources.models import Resource

        results = []

        # Search Courses
        courses = Course.objects.filter(title__icontains=query) | Course.objects.filter(description__icontains=query)
        if courses.exists():
            results.append({
                'category': 'Courses',
                'items': [c.title for c in courses[:3]]
            })

        # Search Assignments
        assignments = Assignment.objects.filter(title__icontains=query)
        if assignments.exists():
            results.append({
                'category': 'Assignments',
                'items': [a.title for a in assignments[:3]]
            })

        # Search Resources
        resources = Resource.objects.filter(title__icontains=query)
        if resources.exists():
            results.append({
                'category': 'Resources',
                'items': [r.title for r in resources[:3]]
            })

        if not results:
            # Fallback to AI if no direct match
            results = [{
                'category': 'AI Suggestions',
                'items': [f'Ask AI about "{query}"', f'Generate a quiz on "{query}"']
            }]

        return Response(results)
