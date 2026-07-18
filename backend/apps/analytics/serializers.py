from rest_framework import serializers
from .models import StudentAnalytics, CourseAnalytics

class StudentAnalyticsSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.get_full_name', read_only=True)

    class Meta:
        model = StudentAnalytics
        fields = '__all__'

class CourseAnalyticsSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)

    class Meta:
        model = CourseAnalytics
        fields = '__all__'
