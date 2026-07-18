import uuid
from django.db import models
from django.conf import settings
from core.models import TimeStampedModel
from apps.courses.models import Course

class StudentAnalytics(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='analytics')
    average_grade = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    attendance_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    assignments_submitted = models.IntegerField(default=0)
    assignments_pending = models.IntegerField(default=0)
    courses_completed = models.IntegerField(default=0)
    study_hours_total = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    ai_interactions = models.IntegerField(default=0)
    last_calculated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Student Analytics'

    def __str__(self):
        return f"Analytics for {self.student.username}"

class CourseAnalytics(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.OneToOneField(Course, on_delete=models.CASCADE, related_name='analytics')
    total_enrollments = models.IntegerField(default=0)
    average_attendance = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    average_grade = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    assignment_completion_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    last_calculated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Course Analytics'

    def __str__(self):
        return f"Analytics for {self.course.title}"
