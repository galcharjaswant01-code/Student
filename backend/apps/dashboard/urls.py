from django.urls import path
from . import views

urlpatterns = [
    path('summary/', views.DashboardSummaryView.as_view(), name='dashboard-summary'),
    path('layout/', views.LayoutView.as_view(), name='dashboard-layout'),
]
