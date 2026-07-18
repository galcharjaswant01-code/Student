from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    
    # Authentication URLs
    path('login/', views.user_login, name='login'),
    path('register/', views.user_register, name='register'),
    path('logout/', views.user_logout, name='logout'),
    path('profile/', views.user_profile, name='profile'),
    
    # Dashboard
    path('dashboard/', views.student_dashboard, name='student_dashboard'),
    path('dashboard/<int:student_id>/', views.student_dashboard, name='student_dashboard_with_id'),
    path('notification/<int:notification_id>/read/', views.mark_notification_as_read, name='mark_notification_read'),
    path('notifications/read-all/', views.mark_all_notifications_as_read, name='mark_all_notifications_read'),
    
    # Assignment submission URLs
    path('assignments/', views.assignments_list, name='assignments_list'),
    path('assignments/<int:student_id>/', views.assignments_list, name='assignments_list_with_id'),
    path('assignment/<int:assignment_id>/', views.assignment_detail, name='assignment_detail'),
    path('assignment/<int:assignment_id>/<int:student_id>/', views.assignment_detail, name='assignment_detail_with_id'),
    path('assignment/<int:assignment_id>/submit/', views.submit_assignment, name='submit_assignment'),
    path('assignment/<int:assignment_id>/submit/<int:student_id>/', views.submit_assignment, name='submit_assignment_with_id'),
    path('submissions/', views.my_submissions, name='my_submissions'),
    path('submissions/<int:student_id>/', views.my_submissions, name='my_submissions_with_id'),
    path('submission/<int:submission_id>/feedback/', views.submission_feedback, name='submission_feedback'),
    path('submission/<int:submission_id>/feedback/<int:student_id>/', views.submission_feedback, name='submission_feedback_with_id'),
    
    # Learning Resources URLs
    path('resources/', views.learning_resources, name='learning_resources'),
    path('resources/<int:student_id>/', views.learning_resources, name='learning_resources_with_id'),
    path('resource/<int:resource_id>/', views.resource_detail, name='resource_detail'),
    path('resource/<int:resource_id>/<int:student_id>/', views.resource_detail, name='resource_detail_with_id'),
    path('resource/<int:resource_id>/download/', views.download_resource, name='download_resource'),

    # AI Chatbot URLs
    path('ai-chatbot/', views.ai_chatbot, name='ai_chatbot'),
    path('ai-chatbot/<int:student_id>/', views.ai_chatbot, name='ai_chatbot_with_id'),
    path('ai-chatbot/api/', views.ai_chatbot_api, name='ai_chatbot_api'),
]
