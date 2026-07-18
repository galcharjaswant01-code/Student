from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from .models import Conversation, Message, MessageReadStatus
from .serializers import ConversationSerializer, MessageSerializer

class ConversationViewSet(viewsets.ModelViewSet):
    serializer_class = ConversationSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.request.user.conversations.all()

    def create(self, request, *args, **kwargs):
        participant_ids = request.data.get('participant_ids', [])
        is_group = request.data.get('is_group', False)
        group_name = request.data.get('group_name', '')

        # For 1-1 chats, check if conversation already exists
        if not is_group and len(participant_ids) == 1:
            other_user_id = participant_ids[0]
            existing = Conversation.objects.filter(
                is_group=False,
                participants=request.user
            ).filter(participants=other_user_id).first()
            if existing:
                serializer = self.get_serializer(existing)
                return Response(serializer.data)

        conversation = Conversation.objects.create(
            is_group=is_group,
            group_name=group_name if is_group else ''
        )
        conversation.participants.add(request.user)
        for uid in participant_ids:
            conversation.participants.add(uid)

        serializer = self.get_serializer(conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        conversation = self.get_object()
        msgs = conversation.messages.filter(is_deleted=False).order_by('created_at')
        serializer = MessageSerializer(msgs, many=True, context={'request': request})
        return Response(serializer.data)

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Message.objects.filter(
            conversation__participants=self.request.user,
            is_deleted=False
        )

    def perform_create(self, serializer):
        message = serializer.save(sender=self.request.user)
        # Update conversation's last message
        conv = message.conversation
        conv.last_message = message.content[:100]
        conv.last_message_at = timezone.now()
        conv.save(update_fields=['last_message', 'last_message_at'])

    def destroy(self, request, *args, **kwargs):
        msg = self.get_object()
        if msg.sender != request.user:
            return Response({'error': 'Cannot delete others messages.'}, status=status.HTTP_403_FORBIDDEN)
        msg.is_deleted = True
        msg.save(update_fields=['is_deleted'])
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        msg = self.get_object()
        MessageReadStatus.objects.get_or_create(message=msg, user=request.user)
        return Response({'message': 'Marked as read.'})
