from rest_framework import viewsets, status, views
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import AttendanceSession, AttendanceRecord, AttendanceReport
from .serializers import AttendanceSessionSerializer, AttendanceRecordSerializer, AttendanceReportSerializer

class AttendanceSessionViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceSessionSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_fields = ('course', 'date')
    ordering_fields = ('date',)

    def get_queryset(self):
        user = self.request.user
        if user.role == 'teacher':
            return AttendanceSession.objects.filter(teacher=user)
        elif user.role == 'student':
            return AttendanceSession.objects.filter(course__in=user.enrolled_courses.all())
        return AttendanceSession.objects.all()

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user)

class AttendanceRecordViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceRecordSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('session', 'student', 'status')

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':
            return AttendanceRecord.objects.filter(student=user)
        return AttendanceRecord.objects.all()

class AttendanceReportViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AttendanceReportSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':
            return AttendanceReport.objects.filter(student=user)
        return AttendanceReport.objects.all()
