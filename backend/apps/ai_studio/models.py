import uuid
from django.db import models
from django.conf import settings
from core.models import TimeStampedModel

class AIConversation(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='ai_conversations')
    title = models.CharField(max_length=255, blank=True, default='New Conversation')
    tool = models.CharField(max_length=50, default='chat',
        choices=[
            ('chat', 'AI Chat'),
            ('code', 'Code Assistant'),
            ('resume', 'Resume Analyzer'),
            ('quiz', 'Quiz Generator'),
            ('notes', 'Notes Summarizer'),
            ('planner', 'Study Planner'),
            ('recommendations', 'AI Recommendations'),
        ]
    )
    model_used = models.CharField(max_length=100, default='gemini-1.5-pro')
    total_tokens = models.IntegerField(default=0)
    is_archived = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.title} [{self.tool}]"

class AIMessage(TimeStampedModel):
    ROLE_CHOICES = (('user', 'User'), ('assistant', 'Assistant'), ('system', 'System'))
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(AIConversation, on_delete=models.CASCADE, related_name='messages')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    content = models.TextField()
    tokens_used = models.IntegerField(default=0)
    metadata = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"[{self.role}] {self.content[:80]}"

class QuizHistory(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quiz_history')
    topic = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=20, default='Medium')
    total_questions = models.IntegerField(default=0)
    correct_answers = models.IntegerField(default=0)
    score_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    quiz_data = models.JSONField(default=dict)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.topic} ({self.score_percentage}%)"

class StudyPlan(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='study_plans')
    subject = models.CharField(max_length=255)
    duration_days = models.IntegerField(default=7)
    plan_data = models.JSONField(default=dict)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.subject} ({self.duration_days} days)"

class ResumeAnalysis(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='resume_analyses')
    resume_file = models.FileField(upload_to='resumes/%Y/%m/', blank=True, null=True)
    ats_score = models.IntegerField(default=0)
    analysis_result = models.JSONField(default=dict)
    improvements = models.JSONField(default=list)
    keywords = models.JSONField(default=list)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - ATS Score: {self.ats_score}"
