from django.apps import AppConfig


class MessagesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.messages'
    label = 'chat'  # Override Django's built-in 'messages' label conflict
    verbose_name = 'Chat & Messages'
