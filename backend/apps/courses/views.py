from rest_framework import viewsets, status, views
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Course, Module, Lesson, ProgressTracking
from .serializers import CourseSerializer, ModuleSerializer, LessonSerializer, ProgressTrackingSerializer

class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ('semester', 'is_active')
    search_fields = ('title', 'code', 'description')
    ordering_fields = ('title', 'created_at')

    def get_queryset(self):
        user = self.request.user
        if user.role == 'teacher':
            return Course.objects.filter(teacher=user)
        elif user.role == 'student':
            return user.enrolled_courses.all()
        return Course.objects.all()

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user)

    @action(detail=True, methods=['post'])
    def enroll(self, request, pk=None):
        course = self.get_object()
        course.students.add(request.user)
        return Response({'message': f'Enrolled in {course.title}.'})

    @action(detail=True, methods=['post'])
    def unenroll(self, request, pk=None):
        course = self.get_object()
        course.students.remove(request.user)
        return Response({'message': f'Unenrolled from {course.title}.'})

class ModuleViewSet(viewsets.ModelViewSet):
    serializer_class = ModuleSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Module.objects.filter(course_id=self.kwargs.get('course_pk'))

class LessonViewSet(viewsets.ModelViewSet):
    serializer_class = LessonSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Lesson.objects.filter(module_id=self.kwargs.get('module_pk'))

class ProgressTrackingViewSet(viewsets.ModelViewSet):
    serializer_class = ProgressTrackingSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return ProgressTracking.objects.filter(student=self.request.user)

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)
