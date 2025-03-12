from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from .models import Item
from .serializers import ItemSerializer


@extend_schema(
    description="API root endpoint providing basic information",
    responses={200: {'type': 'object', 'properties': {
        'message': {'type': 'string'},
        'status': {'type': 'string'}
    }}},
    examples=[
        OpenApiExample(
            'Example response',
            value={'message': 'Welcome to the API', 'status': 'API is working correctly'},
            response_only=True
        )
    ]
)
@api_view(['GET'])
def api_root(request):
    """
    API root endpoint providing basic information about the API.
    """
    return Response({
        'message': 'Welcome to the API',
        'status': 'API is working correctly',
    })


# Add a CSRF token endpoint
@api_view(['GET'])
@permission_classes([])  # Allow any - no authentication required
def csrf_token(request):
    """
    Get a CSRF token for the client.
    This view doesn't need to return anything special - just accessing it
    will set the CSRF cookie that the client can then use.
    """
    return Response({"detail": "CSRF cookie set"})


@extend_schema(tags=["Items"])
class ItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows items to be viewed, created, updated or deleted.
    
    * Requires authentication.
    * Lists all items in the system.
    * Supports filtering, searching, and pagination.
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]
