from django.contrib import admin
from .models import Assignment, Submission, TeacherFeedback

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'due_date', 'status', 'max_marks')
    list_filter = ('status', 'course')
    search_fields = ('title',)

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('student', 'assignment', 'submitted_at', 'is_late')
    list_filter = ('is_late',)

@admin.register(TeacherFeedback)
class TeacherFeedbackAdmin(admin.ModelAdmin):
    list_display = ('submission', 'teacher', 'grade', 'graded_at')
