from rest_framework import serializers
from .models import Assignment, Submission, TeacherFeedback

class TeacherFeedbackSerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source='teacher.get_full_name', read_only=True)

    class Meta:
        model = TeacherFeedback
        fields = '__all__'
        read_only_fields = ('id', 'teacher', 'graded_at')

class SubmissionSerializer(serializers.ModelSerializer):
    feedback = TeacherFeedbackSerializer(read_only=True)
    student_name = serializers.CharField(source='student.get_full_name', read_only=True)

    class Meta:
        model = Submission
        fields = '__all__'
        read_only_fields = ('id', 'student', 'submitted_at', 'is_late')

class AssignmentSerializer(serializers.ModelSerializer):
    submission_count = serializers.SerializerMethodField()
    my_submission = serializers.SerializerMethodField()
    course_title = serializers.CharField(source='course.title', read_only=True)

    class Meta:
        model = Assignment
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_submission_count(self, obj):
        return obj.submissions.count()

    def get_my_submission(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                sub = obj.submissions.get(student=request.user)
                return SubmissionSerializer(sub, context=self.context).data
            except Submission.DoesNotExist:
                return None
        return None
