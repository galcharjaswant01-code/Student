from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import ResourceCategory, Resource, DownloadHistory, Bookmark
from .serializers import ResourceCategorySerializer, ResourceSerializer, DownloadHistorySerializer, BookmarkSerializer

class ResourceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ResourceCategory.objects.all()
    serializer_class = ResourceCategorySerializer
    permission_classes = (IsAuthenticated,)

class ResourceViewSet(viewsets.ModelViewSet):
    serializer_class = ResourceSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ('course', 'category', 'resource_type', 'is_public')
    search_fields = ('title', 'description', 'tags')
    ordering_fields = ('created_at', 'download_count', 'title')

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':
            return Resource.objects.filter(is_public=True)
        return Resource.objects.all()

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)

    @action(detail=True, methods=['post'])
    def download(self, request, pk=None):
        resource = self.get_object()
        resource.download_count += 1
        resource.save(update_fields=['download_count'])
        DownloadHistory.objects.create(user=request.user, resource=resource)
        return Response({'download_url': resource.file.url if resource.file else resource.url})

    @action(detail=True, methods=['post', 'delete'])
    def bookmark(self, request, pk=None):
        resource = self.get_object()
        if request.method == 'POST':
            bookmark, created = Bookmark.objects.get_or_create(user=request.user, resource=resource)
            return Response({'message': 'Bookmarked.' if created else 'Already bookmarked.'})
        else:
            Bookmark.objects.filter(user=request.user, resource=resource).delete()
            return Response({'message': 'Bookmark removed.'}, status=status.HTTP_204_NO_CONTENT)

class DownloadHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DownloadHistorySerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return DownloadHistory.objects.filter(user=self.request.user)

class BookmarkViewSet(viewsets.ModelViewSet):
    serializer_class = BookmarkSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
