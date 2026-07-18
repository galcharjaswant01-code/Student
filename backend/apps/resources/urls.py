from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.ResourceCategoryViewSet, basename='resource-category')
router.register(r'', views.ResourceViewSet, basename='resource')
router.register(r'downloads', views.DownloadHistoryViewSet, basename='download-history')
router.register(r'bookmarks', views.BookmarkViewSet, basename='bookmark')

urlpatterns = [
    path('', include(router.urls)),
]
