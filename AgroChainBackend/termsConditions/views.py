from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TermsAndConditions
from .serializers import TermsAndConditionsSerializer

class TermsAndConditionsAPIView(APIView):
    
    
    """
    List all Terms and Conditions or create a new Terms and Conditions
    """
    def get(self, request, pk=None,*args, **kwargs):
        if pk is not None:
            terms = self.get_object(pk)
            if not terms:
                return Response(status=status.HTTP_404_NOT_FOUND)
            serializer = TermsAndConditionsSerializer(terms)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        terms = TermsAndConditions.objects.all()
        serializer = TermsAndConditionsSerializer(terms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    


