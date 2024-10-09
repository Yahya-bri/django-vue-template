from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LibraryViewSet, BookViewSet, MemberViewSet, BookLoanViewSet

router = DefaultRouter()
router.register(r'libraries', LibraryViewSet)
router.register(r'books', BookViewSet)
router.register(r'members', MemberViewSet)
router.register(r'bookloans', BookLoanViewSet)

urlpatterns = [
    path('', include(router.urls)),
]