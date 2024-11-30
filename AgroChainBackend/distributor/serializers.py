from customUser.models import User
from distributor.models import Distributor
from rest_framework import serializers
from django.contrib.auth import authenticate

from customUser.serializers import UserRegistrationSerializer


class DistributorRegistrationSerializer(UserRegistrationSerializer):
    class Meta(UserRegistrationSerializer.Meta):
        model = Distributor
        fields = UserRegistrationSerializer.Meta.fields + ['company_name', 'delivery_zones','phone_number','address','wallet_address','certification_status','number_of_deliveries']
        
    def create(self, validated_data):
            # Extract company_name and delivery_zones
            company_name = validated_data.pop('company_name', None)
            delivery_zones = validated_data.pop('delivery_zones', None)
            phone_number= validated_data.pop('phone_number', None)
            address= validated_data.pop('address', None)
            wallet_address = validated_data.pop('wallet_address', None)
            certification_status = validated_data.pop('certification_status', None)
            number_of_deliveries = validated_data.pop('number_of_deliveries', None)

            # Create the distributor instance using create_user
            distributor = Distributor.objects.create_user(**validated_data)

            # Assign extra fields to the distributor
            if company_name:
                distributor.company_name = company_name
            if delivery_zones:
                distributor.delivery_zones = delivery_zones
            if phone_number:
                distributor.phone_number=phone_number
            if wallet_address:
                distributor.wallet_address=wallet_address
            if certification_status:
                distributor.certification_status
            if number_of_deliveries:
                distributor.number_of_deliveries
            if address:
                distributor.address = address
                
            
            distributor.save()

            return distributor
        
        
class DistributorLoginSerializer(serializers.Serializer):
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
    
    
class DistributorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields="__all__"
        
        
class DistributorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Distributor
        fields="__all__"