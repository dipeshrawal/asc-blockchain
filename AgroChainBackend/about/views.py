from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import About
from .serializers import AboutSerializer
from rest_framework.permissions import IsAdminUser

class AboutAPIView(APIView):
    
    
    """
    APIView to handle About app data.
    """

    
    def get_object(self):
        # Assuming only one About information exists in the database
        try:
            return About.objects.all().first()
        except About.DoesNotExist:
            return None

    def get(self, request, *args, **kwargs):
        about = self.get_object()
        if about:
            serializer = AboutSerializer(about)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "About information not found."}, status=status.HTTP_404_NOT_FOUND)



