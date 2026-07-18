"""
Dashboard app views.
Provides an aggregated overview endpoint that powers the React frontend Dashboard.
All data is computed server-side and returned in a single request.
"""
from rest_framework import views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model

User = get_user_model()


class DashboardSummaryView(views.APIView):
    """
    GET /api/v1/dashboard/summary/
    Returns a comprehensive summary for the logged-in user's dashboard.
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        data = {'role': user.role, 'user': {
            'id': str(user.id),
            'username': user.username,
            'full_name': user.get_full_name(),
            'email': user.email,
            'profile_picture': request.build_absolute_uri(user.profile_picture.url) if user.profile_picture else None,
        }}

        if user.role == 'student':
            data.update(self._student_summary(user))
        elif user.role == 'teacher':
            data.update(self._teacher_summary(user))
        else:
            data.update(self._admin_summary())

        return Response(data)

    def _student_summary(self, user):
        from apps.courses.models import Course
        from apps.assignments.models import Assignment, Submission
        from apps.attendance.models import AttendanceReport
        from apps.notifications.models import Notification
        from django.db.models import Avg

        enrolled_courses = user.enrolled_courses.filter(is_active=True)
        pending_assignments = Assignment.objects.filter(
            course__in=enrolled_courses, status='published'
        ).exclude(submissions__student=user).count()

        submitted_assignments = Submission.objects.filter(student=user).count()

        avg_attendance = AttendanceReport.objects.filter(student=user).aggregate(
            avg=Avg('percentage')
        )['avg'] or 0

        unread_notifications = Notification.objects.filter(user=user, is_read=False).count()

        return {
            'stats': {
                'enrolled_courses': enrolled_courses.count(),
                'pending_assignments': pending_assignments,
                'submitted_assignments': submitted_assignments,
                'attendance_percentage': round(float(avg_attendance), 1),
                'unread_notifications': unread_notifications,
            },
            'recent_courses': [
                {
                    'id': str(c.id),
                    'title': c.title,
                    'code': c.code,
                    'teacher': c.teacher.get_full_name(),
                }
                for c in enrolled_courses[:5]
            ],
        }

    def _teacher_summary(self, user):
        from apps.courses.models import Course
        from apps.assignments.models import Assignment, Submission

        courses = Course.objects.filter(teacher=user, is_active=True)
        total_students = User.objects.filter(
            enrolled_courses__teacher=user
        ).distinct().count()

        pending_grading = Submission.objects.filter(
            assignment__course__teacher=user,
            feedback__isnull=True
        ).count()

        return {
            'stats': {
                'courses_taught': courses.count(),
                'total_students': total_students,
                'pending_grading': pending_grading,
            },
            'recent_courses': [
                {'id': str(c.id), 'title': c.title, 'code': c.code, 'student_count': c.students.count()}
                for c in courses[:5]
            ],
        }

    def _admin_summary(self):
        from apps.courses.models import Course
        total_students = User.objects.filter(role='student').count()
        total_teachers = User.objects.filter(role='teacher').count()
        total_courses = Course.objects.filter(is_active=True).count()

        return {
            'stats': {
                'total_students': total_students,
                'total_teachers': total_teachers,
                'total_courses': total_courses,
                'total_users': User.objects.count(),
            }
        }


class LayoutView(views.APIView):
    """
    GET/POST /api/v1/dashboard/layout/
    Retrieve or save the user's dashboard widget layout.
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        from apps.dashboard.models import DashboardLayout
        layout, _ = DashboardLayout.objects.get_or_create(user=request.user)
        return Response({
            'layouts': layout.layouts,
            'visible_widgets': layout.visible_widgets,
            'theme_preferences': layout.theme_preferences,
        })

    def post(self, request):
        from apps.dashboard.models import DashboardLayout
        layout, _ = DashboardLayout.objects.get_or_create(user=request.user)
        layout.layouts = request.data.get('layouts', layout.layouts)
        layout.visible_widgets = request.data.get('visible_widgets', layout.visible_widgets)
        layout.theme_preferences = request.data.get('theme_preferences', layout.theme_preferences)
        layout.save()
        return Response({'message': 'Layout saved.'})
