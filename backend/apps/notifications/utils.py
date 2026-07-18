from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import Notification

def send_notification(user, title, content, notification_type='system', action_url='', metadata=None):
    """Utility to create a notification and push it via WebSocket."""
    notif = Notification.objects.create(
        user=user,
        title=title,
        content=content,
        notification_type=notification_type,
        action_url=action_url,
        metadata=metadata or {}
    )
    channel_layer = get_channel_layer()
    group_name = f'notifications_{user.id}'
    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            'type': 'notify',
            'data': {
                'id': str(notif.id),
                'title': title,
                'content': content,
                'notification_type': notification_type,
                'action_url': action_url,
                'created_at': notif.created_at.isoformat(),
            }
        }
    )
    return notif
