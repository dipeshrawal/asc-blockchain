
from customUser.models import User
from customer.models import Customer
from customUser.serializers import UserRegistrationSerializer,UserLoginSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate


class CustomerRegistrationSerializer(UserRegistrationSerializer):
    class Meta(UserRegistrationSerializer.Meta):
        model = Customer
        fields = UserRegistrationSerializer.Meta.fields + ['address', 'phone_number','wallet_address','feedback_score']
        
    def create(self, validated_data):
        # Extract address and phone_number
        address = validated_data.pop('address', None)
        phone_number = validated_data.pop('phone_number', None)
        wallet_address= validated_data.pop('wallet_address', None)
        
        feedback_score= validated_data.pop('feedback_score', None)
        

        # Create the customer instance using create_user
        customer = Customer.objects.create_user(**validated_data)

        # Assign extra fields to the customer
        if address:
            customer.address = address
        if phone_number:
            customer.phone_number = phone_number
        if wallet_address:
            customer.wallet_address=wallet_address
        if feedback_score:
            customer.feedback_score=feedback_score
            
        customer.save()
        return customer
    
class CustomerLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        # Check if the email exists in the database
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("No user found with this email.")
        return value

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        # Authenticate the user using the provided credentials
        user = authenticate(email=email, password=password)
        
        if not user:
            raise serializers.ValidationError("Invalid credentials. Please check your email and password.")
        
        attrs['user'] = user  # Store the authenticated user in the validated data
        return attrs
    
    
class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields="__all__"
        
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields="__all__"