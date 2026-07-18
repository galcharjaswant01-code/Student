from rest_framework import serializers
from .models import AIConversation, AIMessage, QuizHistory, StudyPlan, ResumeAnalysis

class AIMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIMessage
        fields = '__all__'
        read_only_fields = ('id', 'created_at')

class AIConversationSerializer(serializers.ModelSerializer):
    messages = AIMessageSerializer(many=True, read_only=True)
    message_count = serializers.SerializerMethodField()

    class Meta:
        model = AIConversation
        fields = '__all__'
        read_only_fields = ('id', 'user', 'total_tokens', 'created_at', 'updated_at')

    def get_message_count(self, obj):
        return obj.messages.count()

class QuizHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizHistory
        fields = '__all__'
        read_only_fields = ('id', 'user', 'created_at')

class StudyPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyPlan
        fields = '__all__'
        read_only_fields = ('id', 'user', 'created_at')

class ResumeAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeAnalysis
        fields = '__all__'
        read_only_fields = ('id', 'user', 'ats_score', 'analysis_result', 'improvements', 'keywords', 'created_at')
