from rest_framework import serializers
from .models import Conversation, Message, MessageReadStatus
from django.contrib.auth import get_user_model

User = get_user_model()

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'profile_picture', 'is_online', 'last_seen')

class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.get_full_name', read_only=True)
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    sender_avatar = serializers.ImageField(source='sender.profile_picture', read_only=True)
    is_read = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = '__all__'
        read_only_fields = ('id', 'sender', 'created_at', 'is_edited')

    def get_is_read(self, obj):
        request = self.context.get('request')
        if request:
            return MessageReadStatus.objects.filter(message=obj, user=request.user).exists()
        return False

class ConversationSerializer(serializers.ModelSerializer):
    participants = ParticipantSerializer(many=True, read_only=True)
    last_message_preview = serializers.CharField(source='last_message', read_only=True)
    unread_count = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = '__all__'
        read_only_fields = ('id', 'last_message', 'last_message_at')

    def get_unread_count(self, obj):
        request = self.context.get('request')
        if request:
            read_ids = MessageReadStatus.objects.filter(
                user=request.user, message__conversation=obj
            ).values_list('message_id', flat=True)
            return obj.messages.exclude(id__in=read_ids).exclude(sender=request.user).count()
        return 0
