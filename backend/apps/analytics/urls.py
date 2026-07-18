from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'courses', views.CourseAnalyticsViewSet, basename='course-analytics')

urlpatterns = [
    path('my/', views.MyAnalyticsView.as_view(), name='my-analytics'),
    path('overview/', views.DashboardOverviewView.as_view(), name='dashboard-overview'),
    path('performance-summary/', views.PerformanceSummaryView.as_view(), name='performance-summary'),
    path('', include(router.urls)),
]
