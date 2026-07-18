import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils import timezone

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.conversation_id = self.scope['url_route']['kwargs']['conversation_id']
        self.room_group_name = f'chat_{self.conversation_id}'
        self.user = self.scope['user']

        if self.user.is_anonymous:
            await self.close()
            return

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.update_user_online_status(True)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        await self.update_user_online_status(False)

    async def receive(self, text_data):
        data = json.loads(text_data)
        event_type = data.get('type', 'message')

        if event_type == 'message':
            message = await self.save_message(data.get('content', ''), data.get('message_type', 'text'))
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'sender_id': str(self.user.id),
                    'sender_username': self.user.username,
                    'sender_name': self.user.get_full_name(),
                }
            )
        elif event_type == 'typing':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'typing_indicator',
                    'user_id': str(self.user.id),
                    'username': self.user.username,
                    'is_typing': data.get('is_typing', False),
                }
            )
        elif event_type == 'read':
            await self.mark_message_read(data.get('message_id'))

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'type': 'message',
            **event
        }))

    async def typing_indicator(self, event):
        await self.send(text_data=json.dumps({
            'type': 'typing',
            **event
        }))

    @database_sync_to_async
    def save_message(self, content, message_type='text'):
        from apps.messages.models import Message, Conversation
        try:
            conversation = Conversation.objects.get(id=self.conversation_id)
            msg = Message.objects.create(
                conversation=conversation,
                sender=self.user,
                content=content,
                message_type=message_type,
            )
            conversation.last_message = content[:100]
            conversation.last_message_at = timezone.now()
            conversation.save(update_fields=['last_message', 'last_message_at'])
            return {
                'id': str(msg.id),
                'content': msg.content,
                'created_at': msg.created_at.isoformat(),
                'message_type': msg.message_type,
            }
        except Conversation.DoesNotExist:
            return {}

    @database_sync_to_async
    def mark_message_read(self, message_id):
        from apps.messages.models import Message, MessageReadStatus
        try:
            msg = Message.objects.get(id=message_id)
            MessageReadStatus.objects.get_or_create(message=msg, user=self.user)
        except Message.DoesNotExist:
            pass

    @database_sync_to_async
    def update_user_online_status(self, is_online):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        User.objects.filter(id=self.user.id).update(
            is_online=is_online,
            last_seen=timezone.now()
        )
