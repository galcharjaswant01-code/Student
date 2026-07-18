from rest_framework import views, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import StudentAnalytics, CourseAnalytics
from .serializers import StudentAnalyticsSerializer, CourseAnalyticsSerializer

User = get_user_model()

class MyAnalyticsView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        analytics, _ = StudentAnalytics.objects.get_or_create(student=request.user)
        return Response(StudentAnalyticsSerializer(analytics).data)

class DashboardOverviewView(views.APIView):
    """
    GET /api/v1/analytics/overview/
    Returns aggregated stats for the frontend Dashboard.
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        data = {}

        if user.role == 'student':
            from apps.assignments.models import Assignment, Submission
            from apps.attendance.models import AttendanceReport

            enrolled_courses = user.enrolled_courses.count()
            pending_assignments = Assignment.objects.filter(
                course__in=user.enrolled_courses.all(),
                status='published'
            ).exclude(
                submissions__student=user
            ).count()

            attendance_avg = AttendanceReport.objects.filter(
                student=user
            ).aggregate(
                avg=__import__('django.db.models', fromlist=['Avg']).Avg('percentage')
            )['avg'] or 0

            data = {
                'enrolled_courses': enrolled_courses,
                'pending_assignments': pending_assignments,
                'attendance_percentage': round(float(attendance_avg), 1),
                'role': user.role,
            }

        elif user.role == 'teacher':
            from apps.courses.models import Course
            courses_taught = Course.objects.filter(teacher=user).count()
            total_students = User.objects.filter(enrolled_courses__teacher=user).distinct().count()
            data = {
                'courses_taught': courses_taught,
                'total_students': total_students,
                'role': user.role,
            }

        return Response(data)

class CourseAnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CourseAnalyticsSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        if user.role == 'teacher':
            return CourseAnalytics.objects.filter(course__teacher=user)
        return CourseAnalytics.objects.all()

class PerformanceSummaryView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        if user.role != 'student':
            return Response({'summary': 'AI performance summaries are available for students.'})

        # Gather data
        analytics, _ = StudentAnalytics.objects.get_or_create(student=user)
        
        data = {
            'average_grade': float(analytics.average_grade),
            'attendance_percentage': float(analytics.attendance_percentage),
            'assignments_submitted': analytics.assignments_submitted,
            'assignments_pending': analytics.assignments_pending,
            'courses_completed': analytics.courses_completed,
            'ai_interactions': analytics.ai_interactions
        }

        # Use ai_studio service to generate summary
        from apps.ai_studio.services import generate_performance_summary
        try:
            summary = generate_performance_summary(data)
        except Exception as e:
            summary = "Error generating AI summary."

        return Response({'summary': summary})
