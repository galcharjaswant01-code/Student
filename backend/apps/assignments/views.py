from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Assignment, Submission, TeacherFeedback
from .serializers import AssignmentSerializer, SubmissionSerializer, TeacherFeedbackSerializer

class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ('course', 'status')
    search_fields = ('title', 'description')
    ordering_fields = ('due_date', 'created_at')

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':
            return Assignment.objects.filter(course__in=user.enrolled_courses.all(), status='published')
        elif user.role == 'teacher':
            return Assignment.objects.filter(course__teacher=user)
        return Assignment.objects.all()

    @action(detail=True, methods=['post'])
    def generate_feedback(self, request, pk=None):
        assignment = self.get_object()
        submission_text = request.data.get('content', '')
        if not submission_text:
            return Response({'error': 'Submission content is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        from apps.ai_studio.services import generate_assignment_feedback
        feedback = generate_assignment_feedback(
            assignment_title=assignment.title,
            assignment_description=assignment.description,
            submission_text=submission_text
        )
        return Response(feedback)

class SubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = SubmissionSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('assignment', 'student')

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':
            return Submission.objects.filter(student=user)
        elif user.role == 'teacher':
            return Submission.objects.filter(assignment__course__teacher=user)
        return Submission.objects.all()

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

class TeacherFeedbackViewSet(viewsets.ModelViewSet):
    serializer_class = TeacherFeedbackSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return TeacherFeedback.objects.filter(teacher=self.request.user)

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user)
