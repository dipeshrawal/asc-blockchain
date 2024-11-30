from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ProductRate
from .serializers import ProductRateSerializer

class ProductRateView(APIView):
    def get(self, request, *args, **kwargs):
        # Get all ProductRate objects
        products = ProductRate.objects.all()
        # Serialize the products
        serializer = ProductRateSerializer(products, many=True)
        # Return the response
        return Response(serializer.data, status=status.HTTP_200_OK)
