from django.contrib import admin
from .models import AIConversation, AIMessage, QuizHistory, StudyPlan, ResumeAnalysis

class AIMessageInline(admin.TabularInline):
    model = AIMessage
    extra = 0
    readonly_fields = ('role', 'content', 'tokens_used', 'created_at')

@admin.register(AIConversation)
class AIConversationAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'tool', 'total_tokens', 'is_archived', 'created_at')
    list_filter = ('tool', 'is_archived')
    inlines = [AIMessageInline]

@admin.register(QuizHistory)
class QuizHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'topic', 'difficulty', 'score_percentage', 'created_at')
    list_filter = ('difficulty',)

@admin.register(StudyPlan)
class StudyPlanAdmin(admin.ModelAdmin):
    list_display = ('user', 'subject', 'duration_days', 'is_active', 'created_at')

@admin.register(ResumeAnalysis)
class ResumeAnalysisAdmin(admin.ModelAdmin):
    list_display = ('user', 'ats_score', 'created_at')
