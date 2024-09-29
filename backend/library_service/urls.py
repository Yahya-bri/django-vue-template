from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LibraryViewSet

router = DefaultRouter()
router.register(r'libraries', LibraryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]