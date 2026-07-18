from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.AssignmentViewSet, basename='assignment')
router.register(r'submissions', views.SubmissionViewSet, basename='submission')
router.register(r'feedback', views.TeacherFeedbackViewSet, basename='feedback')

urlpatterns = [
    path('', include(router.urls)),
]
