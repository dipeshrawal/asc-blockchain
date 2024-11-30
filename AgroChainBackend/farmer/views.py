from django.shortcuts import render


# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from farmer.models import Farmer
from agrochain.permission import IsFarmer
from customUser.models import User
from .serializers import FarmerLoginSerializer, FarmerProfileSerializer, FarmerRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh':str(refresh),
        'access':str(refresh.access_token)
    }


class FarmerRegistrationView(APIView):
    def post(self,request,*args,**kwargs):
        serializer=FarmerRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            token=get_tokens_for_user(User)
            return Response({
                'token':token,
                'msg':"Farmer created successfully"
            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
    
class FarmerLoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = FarmerLoginSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            # Get the validated user object from serializer data
            user = serializer.validated_data['user']
            token = get_tokens_for_user(user)

            return Response({
                'token': token['access'],
                'msg': "Customer logged in successfully"
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class FarmerProfileView(APIView):
    permission_classes=[IsAuthenticated,IsFarmer]
    def get(self,request,format=None):
        serializer = FarmerProfileSerializer(request.user)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class GetAllFarmer(APIView):
    """
    Retrieve all customers from the database.
    """

    def get(self, request):
        farmer = Farmer.objects.all()  # Retrieve all Customer records
        serializer = FarmerProfileSerializer(farmer, many=True)  # Serialize the customer data
        return Response(serializer.data, status=status.HTTP_200_OK)  # Return the serialized data
                