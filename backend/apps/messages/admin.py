from django.contrib import admin
from .models import Conversation, Message, MessageReadStatus

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ('id', 'is_group', 'group_name', 'last_message_at')
    filter_horizontal = ('participants',)

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'conversation', 'message_type', 'is_deleted', 'created_at')
    list_filter = ('message_type', 'is_deleted')
    search_fields = ('content', 'sender__username')
