from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from smartContract.models import SmartContract
from .models import Product
from .serializers import ProductSerializer

class CustomerProductAPIView(APIView):

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests for retrieving all products or a single product.
        """
        pk = kwargs.get('pk')
        if pk:
            # Retrieve a single product
            try:
                product = Product.objects.get(pk=pk)
                serializer = ProductSerializer(product)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Product.DoesNotExist:
                return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Retrieve all products
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    
class DistributorProductAPIView(APIView):

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests for retrieving all products or a single product.
        """
        pk = kwargs.get('pk')
        if pk:
            # Retrieve a single product
            try:
                product = Product.objects.get(pk=pk)
                serializer = ProductSerializer(product)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Product.DoesNotExist:
                return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Retrieve all products
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    

class RetailerProductAPIView(APIView):

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests for retrieving all products or a single product.
        """
        pk = kwargs.get('pk')
        if pk:
            # Retrieve a single product
            try:
                product = Product.objects.get(pk=pk)
                serializer = ProductSerializer(product)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Product.DoesNotExist:
                return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Retrieve all products
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    
    

        
class FarmerProductAPIView(APIView):

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests for retrieving all products or a single product.
        """
        pk = kwargs.get('pk')
        if pk:
            # Retrieve a single product
            try:
                product = Product.objects.get(pk=pk)
                serializer = ProductSerializer(product)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Product.DoesNotExist:
                return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Retrieve all products
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests for creating a new product.
        """
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the new product
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        """
        Handles PATCH requests for partially updating a product.
        """
        pk = kwargs.get('pk')
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        """
        Handles DELETE requests for removing a product.
        """
        pk = kwargs.get('pk')
        try:
            product = Product.objects.get(pk=pk)
            product.delete()
            return Response({"message": "Product deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)





