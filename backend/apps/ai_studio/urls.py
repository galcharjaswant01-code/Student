from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'conversations', views.AIConversationViewSet, basename='ai-conversation')

urlpatterns = [
    path('', include(router.urls)),
    path('chat/', views.QuizGeneratorView.as_view(), name='quiz-generator'),
    path('quiz/', views.QuizGeneratorView.as_view(), name='quiz-generator'),
    path('study-planner/', views.StudyPlannerView.as_view(), name='study-planner'),
    path('code/', views.CodeAssistantView.as_view(), name='code-assistant'),
    path('summarize/', views.NotesSummarizerView.as_view(), name='notes-summarizer'),
    path('resume/', views.ResumeAnalyzerView.as_view(), name='resume-analyzer'),
    path('stats/', views.AIUsageStatsView.as_view(), name='ai-stats'),
    path('search/', views.SmartSearchView.as_view(), name='smart-search'),
]
