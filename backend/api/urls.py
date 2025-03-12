from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, api_root, csrf_token

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'items', ItemViewSet)

urlpatterns = [
    path('', api_root, name='api-root'),
    path('', include(router.urls)),
    path('csrf/', csrf_token, name='csrf'),
]
