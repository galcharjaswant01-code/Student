from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.CourseViewSet, basename='course')
router.register(r'progress', views.ProgressTrackingViewSet, basename='progress')

urlpatterns = [
    path('', include(router.urls)),
]
