from django.contrib import admin
from .models import ResourceCategory, Resource, DownloadHistory, Bookmark

@admin.register(ResourceCategory)
class ResourceCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'resource_type', 'category', 'uploaded_by', 'download_count', 'is_public')
    list_filter = ('resource_type', 'is_public', 'category')
    search_fields = ('title', 'description')

@admin.register(DownloadHistory)
class DownloadHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'resource', 'downloaded_at')

@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ('user', 'resource', 'bookmarked_at')
