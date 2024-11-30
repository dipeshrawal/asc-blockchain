from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from agrochain.permission import IsCustomer

from customUser.models import User
from .serializers import CustomerLoginSerializer, CustomerProfileSerializer, CustomerRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh':str(refresh),
        'access':str(refresh.access_token)
    }


class CustomerRegistrationView(APIView):
    def post(self,request,*args,**kwargs):
        serializer=CustomerRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            token=get_tokens_for_user(User)
            return Response({
                'token':token,
                'msg':"customer created successfully"
            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class CustomerLoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CustomerLoginSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            # Get the validated user object from serializer data
            user = serializer.validated_data['user']
            token = get_tokens_for_user(user)

            return Response({
                'token': token['access'],
                'msg': "Customer logged in successfully"
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class CustomerProfileView(APIView):
    permission_classes=[IsAuthenticated,IsCustomer]
    def get(self,request,format=None):
        serializer = CustomerProfileSerializer(request.user)
        return Response(serializer.data,status=status.HTTP_200_OK)