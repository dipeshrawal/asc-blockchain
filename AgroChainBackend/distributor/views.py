from django.shortcuts import render


# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from distributor.models import Distributor
from agrochain.permission import IsDistributor
from customUser.models import User
from .serializers import DistributorLoginSerializer, DistributorProfileSerializer, DistributorRegistrationSerializer, DistributorSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
    
from django.contrib.auth import authenticate 


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh':str(refresh),
        'access':str(refresh.access_token)
    }


class DistributorRegistrationView(APIView):
    def post(self,request,*args,**kwargs):
        serializer=DistributorRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            token=get_tokens_for_user(User)
            return Response({
                'token':token,
                'msg':"Distributor created successfully"
            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class DistributorLoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = DistributorLoginSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            # Get the validated user object from serializer data
            user = serializer.validated_data['user']
            token = get_tokens_for_user(user)

            return Response({
                'token': token['access'],
                'msg': "Customer logged in successfully"
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DistributorProfileView(APIView):
    permission_classes=[IsAuthenticated,IsDistributor]
    def get(self,request,format=None):
        serializer = DistributorProfileSerializer(request.user)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    
class GetAllDistributor(APIView):
    """
    Retrieve all customers from the database.
    """

    def get(self, request):
        distributor = Distributor.objects.all()  # Retrieve all Customer records
        serializer = DistributorSerializer(distributor, many=True)  # Serialize the customer data
        return Response(serializer.data, status=status.HTTP_200_OK)  # Return the serialized data
                