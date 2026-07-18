from django.contrib import admin
from .models import StudentAnalytics, CourseAnalytics

@admin.register(StudentAnalytics)
class StudentAnalyticsAdmin(admin.ModelAdmin):
    list_display = ('student', 'average_grade', 'attendance_percentage', 'last_calculated')
    readonly_fields = ('last_calculated',)

@admin.register(CourseAnalytics)
class CourseAnalyticsAdmin(admin.ModelAdmin):
    list_display = ('course', 'total_enrollments', 'average_attendance', 'last_calculated')
    readonly_fields = ('last_calculated',)
