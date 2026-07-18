"""
Root URL configuration for the Student Management System backend.
All API routes are versioned under /api/v1/.
WebSocket routes are handled by ASGI (Django Channels).
Swagger/OpenAPI docs available at /api/docs/.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    # Django Admin
    path('admin/', admin.site.urls),

    # API v1 - Authentication & Users
    path('api/v1/auth/', include('apps.users.urls')),

    # API v1 - Core Modules
    path('api/v1/dashboard/', include('apps.dashboard.urls')),
    path('api/v1/courses/', include('apps.courses.urls')),
    path('api/v1/attendance/', include('apps.attendance.urls')),
    path('api/v1/assignments/', include('apps.assignments.urls')),
    path('api/v1/resources/', include('apps.resources.urls')),
    path('api/v1/messages/', include('apps.messages.urls')),
    path('api/v1/notifications/', include('apps.notifications.urls')),
    path('api/v1/ai-studio/', include('apps.ai_studio.urls')),
    path('api/v1/analytics/', include('apps.analytics.urls')),

    # Swagger / OpenAPI Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
