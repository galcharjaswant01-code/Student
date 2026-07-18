from django.contrib import admin
from .models import Student, Attendance, Homework, Exam, Grade, TimeTable, Notification, Assignment, AssignmentSubmission, LearningResource

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'roll_number', 'email', 'class_name', 'admission_date')
    search_fields = ('name', 'roll_number', 'email')
    list_filter = ('class_name', 'admission_date')
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'roll_number', 'email', 'phone', 'date_of_birth', 'profile_picture')
        }),
        ('Academic Information', {
            'fields': ('class_name', 'admission_date')
        }),
        ('Guardian Information', {
            'fields': ('guardian_name', 'guardian_phone')
        }),
        ('Address', {
            'fields': ('address',)
        }),
    )


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('student', 'date', 'status', 'subject')
    search_fields = ('student__name', 'subject')
    list_filter = ('date', 'status', 'subject')
    date_hierarchy = 'date'
    readonly_fields = ('student',)


@admin.register(Homework)
class HomeworkAdmin(admin.ModelAdmin):
    list_display = ('title', 'student', 'subject', 'due_date', 'status', 'marks')
    search_fields = ('title', 'student__name', 'subject')
    list_filter = ('status', 'subject', 'due_date')
    fieldsets = (
        ('Basic Information', {
            'fields': ('student', 'subject', 'title', 'description')
        }),
        ('Dates', {
            'fields': ('assigned_date', 'due_date', 'submission_date')
        }),
        ('Status & Evaluation', {
            'fields': ('status', 'marks', 'feedback')
        }),
    )


@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ('exam_name', 'student', 'subject', 'date', 'status', 'obtained_marks')
    search_fields = ('exam_name', 'student__name', 'subject')
    list_filter = ('exam_type', 'status', 'date')
    fieldsets = (
        ('Exam Information', {
            'fields': ('student', 'subject', 'exam_name', 'exam_type')
        }),
        ('Schedule', {
            'fields': ('date', 'duration_minutes', 'room_number')
        }),
        ('Marks', {
            'fields': ('total_marks', 'obtained_marks', 'status')
        }),
    )


@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject', 'grade', 'percentage', 'term', 'date')
    search_fields = ('student__name', 'subject')
    list_filter = ('term', 'grade', 'date')
    fieldsets = (
        ('Student & Subject', {
            'fields': ('student', 'subject', 'teacher_name')
        }),
        ('Marks', {
            'fields': ('marks_obtained', 'total_marks', 'percentage', 'grade')
        }),
        ('Term Information', {
            'fields': ('term', 'date')
        }),
        ('Remarks', {
            'fields': ('remarks',)
        }),
    )


@admin.register(TimeTable)
class TimeTableAdmin(admin.ModelAdmin):
    list_display = ('class_name', 'day', 'subject', 'start_time', 'end_time', 'teacher_name')
    search_fields = ('class_name', 'subject', 'teacher_name')
    list_filter = ('class_name', 'day', 'subject')
    ordering = ('class_name', 'day', 'start_time')


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'student', 'notification_type', 'priority', 'is_read', 'created_at')
    search_fields = ('title', 'student__name', 'message')
    list_filter = ('notification_type', 'priority', 'is_read', 'created_at')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Recipient', {
            'fields': ('student',)
        }),
        ('Notification Content', {
            'fields': ('title', 'message', 'notification_type', 'priority')
        }),
        ('Status', {
            'fields': ('is_read', 'created_at')
        }),
        ('Reference', {
            'fields': ('related_url',)
        }),
    )


@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'assignment_type', 'due_date', 'total_marks', 'is_active')
    search_fields = ('title', 'subject', 'description')
    list_filter = ('assignment_type', 'subject', 'due_date', 'is_active')
    fieldsets = (
        ('Basic Information', {
            'fields': ('subject', 'title', 'description', 'assignment_type')
        }),
        ('Details', {
            'fields': ('instructions', 'total_marks', 'attachment')
        }),
        ('Assignment Setup', {
            'fields': ('due_date', 'created_date', 'classes', 'is_active')
        }),
    )
    readonly_fields = ('created_date',)
    date_hierarchy = 'due_date'


@admin.register(AssignmentSubmission)
class AssignmentSubmissionAdmin(admin.ModelAdmin):
    list_display = ('student', 'assignment', 'status', 'submission_date', 'is_late', 'marks_obtained')
    search_fields = ('student__name', 'assignment__title')
    list_filter = ('status', 'submission_date', 'is_late', 'assignment__subject')
    readonly_fields = ('submission_date', 'feedback_date')
    
    fieldsets = (
        ('Submission Details', {
            'fields': ('assignment', 'student', 'submission_file', 'submission_date')
        }),
        ('Status & Timing', {
            'fields': ('status', 'is_late', 'late_days')
        }),
        ('Feedback & Marks', {
            'fields': ('marks_obtained', 'feedback', 'feedback_date', 'feedback_file')
        }),
        ('Resubmission', {
            'fields': ('resubmission_date', 'resubmission_file')
        }),
    )
    
    def has_add_permission(self, request):
        # Submissions should be created by students, not admin
        return False


@admin.register(LearningResource)
class LearningResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'resource_type', 'subject', 'teacher_name', 'class_name', 'is_active', 'created_at', 'download_count', 'view_count')
    search_fields = ('title', 'description', 'teacher_name', 'tags', 'subject')
    list_filter = ('resource_type', 'subject', 'is_active', 'created_at')
    readonly_fields = ('created_at', 'updated_at', 'download_count', 'view_count')
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'resource_type', 'subject', 'teacher_name', 'class_name')
        }),
        ('Files & Links', {
            'fields': ('file', 'video_url')
        }),
        ('Metadata', {
            'fields': ('tags', 'file_size', 'file_extension')
        }),
        ('Status', {
            'fields': ('is_active', 'created_at', 'updated_at', 'download_count', 'view_count')
        }),
    )
    
    def save_model(self, request, obj, form, change):
        # Auto-populate file info if not provided
        if obj.file:
            obj.file_size = obj.file.size
            obj.file_extension = obj.file.name.split('.')[-1].lower() if '.' in obj.file.name else ''
        super().save_model(request, obj, form, change)
