from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from datetime import timedelta

class Student(models.Model):
    """Student model to store student information"""
    ROLL_NUMBER_CHOICES = [(i, f"{i:03d}") for i in range(1, 101)]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='student_profile')
    name = models.CharField(max_length=100)
    roll_number = models.CharField(max_length=10, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    admission_date = models.DateField(auto_now_add=True)
    address = models.TextField(blank=True)
    guardian_name = models.CharField(max_length=100, blank=True)
    guardian_phone = models.CharField(max_length=10, blank=True)
    profile_picture = models.ImageField(upload_to='student_profiles/', blank=True, null=True)
    class_name = models.CharField(max_length=10, default="10A")
    
    def __str__(self):
        return f"{self.name} ({self.roll_number})"
    
    class Meta:
        ordering = ['roll_number']


class Attendance(models.Model):
    """Attendance tracking for students"""
    STATUS_CHOICES = [
        ('Present', 'Present'),
        ('Absent', 'Absent'),
        ('Leave', 'Leave'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendance_records')
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    subject = models.CharField(max_length=50)
    remarks = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.student.name} - {self.date} - {self.status}"
    
    class Meta:
        ordering = ['-date']
        unique_together = ('student', 'date', 'subject')


class Homework(models.Model):
    """Homework assignments for students"""
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Submitted', 'Submitted'),
        ('Reviewed', 'Reviewed'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='homework')
    subject = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    description = models.TextField()
    due_date = models.DateTimeField()
    assigned_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    submission_date = models.DateTimeField(null=True, blank=True)
    marks = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)])
    feedback = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.title} - {self.student.name}"
    
    def is_overdue(self):
        return self.due_date < timezone.now() and self.status == 'Pending'
    
    class Meta:
        ordering = ['-due_date']


class Exam(models.Model):
    """Exam schedule and details"""
    EXAM_TYPE_CHOICES = [
        ('Unit Test', 'Unit Test'),
        ('Mid-term', 'Mid-term'),
        ('Final', 'Final'),
        ('Quiz', 'Quiz'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='exams')
    subject = models.CharField(max_length=50)
    exam_name = models.CharField(max_length=100)
    exam_type = models.CharField(max_length=20, choices=EXAM_TYPE_CHOICES)
    date = models.DateTimeField()
    duration_minutes = models.IntegerField(default=60)
    room_number = models.CharField(max_length=10, blank=True)
    total_marks = models.IntegerField(default=100)
    obtained_marks = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0)])
    status = models.CharField(max_length=20, default='Scheduled', choices=[('Scheduled', 'Scheduled'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled')])
    
    def __str__(self):
        return f"{self.exam_name} - {self.subject}"
    
    def days_until_exam(self):
        delta = self.date.date() - timezone.now().date()
        return delta.days
    
    class Meta:
        ordering = ['date']


class Grade(models.Model):
    """Student grades and performance"""
    TERM_CHOICES = [
        ('Term 1', 'Term 1'),
        ('Term 2', 'Term 2'),
        ('Annual', 'Annual'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='grades')
    subject = models.CharField(max_length=50)
    marks_obtained = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    total_marks = models.FloatField(default=100)
    percentage = models.FloatField()
    grade = models.CharField(max_length=2)  # A, B, C, D, F
    term = models.CharField(max_length=20, choices=TERM_CHOICES)
    date = models.DateField(auto_now_add=True)
    teacher_name = models.CharField(max_length=100, blank=True)
    remarks = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.student.name} - {self.subject} - {self.grade}"
    
    class Meta:
        ordering = ['-date']


class TimeTable(models.Model):
    """Class timetable/schedule"""
    DAY_CHOICES = [
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
    ]
    
    class_name = models.CharField(max_length=10)
    day = models.CharField(max_length=10, choices=DAY_CHOICES)
    subject = models.CharField(max_length=50)
    teacher_name = models.CharField(max_length=100)
    start_time = models.TimeField()
    end_time = models.TimeField()
    room_number = models.CharField(max_length=10, blank=True)
    
    def __str__(self):
        return f"{self.class_name} - {self.day} - {self.subject}"
    
    class Meta:
        ordering = ['day', 'start_time']
        unique_together = ('class_name', 'day', 'start_time')


class Notification(models.Model):
    """System notifications for students"""
    PRIORITY_CHOICES = [
        ('High', 'High'),
        ('Medium', 'Medium'),
        ('Low', 'Low'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=200)
    message = models.TextField()
    notification_type = models.CharField(max_length=50, choices=[
        ('Homework', 'Homework'),
        ('Exam', 'Exam'),
        ('Grade', 'Grade'),
        ('Attendance', 'Attendance'),
        ('General', 'General'),
        ('Event', 'Event'),
    ])
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='Medium')
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    related_url = models.CharField(max_length=200, blank=True)
    
    def __str__(self):
        return f"{self.title} - {self.student.name}"
    
    class Meta:
        ordering = ['-created_at']


class Assignment(models.Model):
    """Online assignments that students need to submit"""
    ASSIGNMENT_TYPE_CHOICES = [
        ('Homework', 'Homework'),
        ('Project', 'Project'),
        ('Quiz', 'Quiz'),
        ('Essay', 'Essay'),
        ('Presentation', 'Presentation'),
    ]
    
    subject = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    description = models.TextField()
    assignment_type = models.CharField(max_length=20, choices=ASSIGNMENT_TYPE_CHOICES, default='Homework')
    created_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    total_marks = models.IntegerField(default=100)
    instructions = models.TextField(blank=True)
    
    # File upload for assignment materials
    attachment = models.FileField(upload_to='assignments/', null=True, blank=True)
    
    # Classes that this assignment is for
    classes = models.CharField(max_length=100, blank=True, help_text='Comma-separated class names (e.g., 10A,10B)')
    
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.subject} - {self.title}"
    
    def is_overdue(self):
        return self.due_date < timezone.now() and self.is_active
    
    def days_remaining(self):
        delta = self.due_date.date() - timezone.now().date()
        return delta.days
    
    class Meta:
        ordering = ['-due_date']


class AssignmentSubmission(models.Model):
    """Student submissions for assignments"""
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Submitted', 'Submitted'),
        ('Reviewed', 'Reviewed'),
        ('Resubmit', 'Resubmit Required'),
    ]
    
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='assignment_submissions')
    
    submission_file = models.FileField(upload_to='submissions/')
    submission_date = models.DateTimeField(auto_now_add=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Submitted')
    
    # Teacher feedback and marks
    marks_obtained = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0)])
    feedback = models.TextField(blank=True)
    feedback_date = models.DateTimeField(null=True, blank=True)
    feedback_file = models.FileField(upload_to='feedback/', null=True, blank=True)
    
    # Resubmission details
    resubmission_date = models.DateTimeField(null=True, blank=True)
    resubmission_file = models.FileField(upload_to='resubmissions/', null=True, blank=True)
    
    is_late = models.BooleanField(default=False)
    late_days = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.student.name} - {self.assignment.title}"
    
    def check_if_late(self):
        """Check if submission is late and calculate days"""
        if self.submission_date > self.assignment.due_date:
            self.is_late = True
            delta = self.submission_date.date() - self.assignment.due_date.date()
            self.late_days = delta.days
        return self.is_late
    
    class Meta:
        ordering = ['-submission_date']
        unique_together = ('assignment', 'student')


class LearningResource(models.Model):
    """Learning resources uploaded by teachers for students"""
    RESOURCE_TYPE_CHOICES = [
        ('Notes', 'Notes'),
        ('PDF', 'PDF Document'),
        ('Video', 'Video'),
        ('Presentation', 'Presentation'),
        ('Coding', 'Coding Files'),
        ('Other', 'Other'),
    ]
    
    SUBJECT_CHOICES = [
        ('Mathematics', 'Mathematics'),
        ('Physics', 'Physics'),
        ('Chemistry', 'Chemistry'),
        ('Biology', 'Biology'),
        ('English', 'English'),
        ('Computer Science', 'Computer Science'),
        ('History', 'History'),
        ('Geography', 'Geography'),
        ('Economics', 'Economics'),
        ('Other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPE_CHOICES, default='Notes')
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES, default='Other')
    
    # File upload
    file = models.FileField(upload_to='learning_resources/')
    
    # For video resources, can also have external URL
    video_url = models.URLField(blank=True, help_text='External video URL (e.g., YouTube)')
    
    # Metadata
    teacher_name = models.CharField(max_length=100)
    class_name = models.CharField(max_length=100, blank=True, help_text='Comma-separated class names (e.g., 10A,10B)')
    
    # File info
    file_size = models.IntegerField(null=True, blank=True, help_text='File size in bytes')
    file_extension = models.CharField(max_length=10, blank=True)
    
    # Stats
    download_count = models.IntegerField(default=0)
    view_count = models.IntegerField(default=0)
    
    # Status
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Tags for better searchability
    tags = models.CharField(max_length=200, blank=True, help_text='Comma-separated tags')
    
    def __str__(self):
        return f"{self.title} - {self.subject}"
    
    def get_resource_icon(self):
        """Get appropriate icon based on resource type"""
        icons = {
            'Notes': 'fa-file-alt',
            'PDF': 'fa-file-pdf',
            'Video': 'fa-video',
            'Presentation': 'fa-file-powerpoint',
            'Coding': 'fa-file-code',
            'Other': 'fa-file',
        }
        return icons.get(self.resource_type, 'fa-file')
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Learning Resources'
