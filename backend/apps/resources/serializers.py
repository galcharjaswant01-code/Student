from rest_framework import serializers
from .models import ResourceCategory, Resource, DownloadHistory, Bookmark

class ResourceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceCategory
        fields = '__all__'

class ResourceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    uploaded_by_name = serializers.CharField(source='uploaded_by.get_full_name', read_only=True)
    is_bookmarked = serializers.SerializerMethodField()

    class Meta:
        model = Resource
        fields = '__all__'
        read_only_fields = ('id', 'uploaded_by', 'download_count', 'created_at', 'updated_at')

    def get_is_bookmarked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Bookmark.objects.filter(user=request.user, resource=obj).exists()
        return False

class DownloadHistorySerializer(serializers.ModelSerializer):
    resource_title = serializers.CharField(source='resource.title', read_only=True)

    class Meta:
        model = DownloadHistory
        fields = '__all__'

class BookmarkSerializer(serializers.ModelSerializer):
    resource_detail = ResourceSerializer(source='resource', read_only=True)

    class Meta:
        model = Bookmark
        fields = '__all__'
        read_only_fields = ('user',)
