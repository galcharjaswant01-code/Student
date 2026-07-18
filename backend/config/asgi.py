"""
ASGI config for Student Management System.

Configures Django Channels with:
- HTTP requests → Django ASGI application
- WebSocket connections → Channels routing

WebSocket endpoints:
- ws/chat/<conversation_id>/   → ChatConsumer (real-time messaging)
- ws/notifications/             → NotificationConsumer (push notifications)
"""
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')

# Initialize Django ASGI application early
django_asgi_app = get_asgi_application()

from apps.messages.routing import websocket_urlpatterns as chat_patterns
from apps.notifications.routing import websocket_urlpatterns as notification_patterns

all_websocket_patterns = chat_patterns + notification_patterns

application = ProtocolTypeRouter({
    'http': django_asgi_app,
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(all_websocket_patterns)
        )
    ),
})
