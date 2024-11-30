from customUser.models import User
from customUser.serializers import UserRegistrationSerializer
from farmer.models import Farmer
from rest_framework import serializers
from django.contrib.auth import authenticate


class FarmerRegistrationSerializer(UserRegistrationSerializer):
    class Meta(UserRegistrationSerializer.Meta):
        model = Farmer
        fields = UserRegistrationSerializer.Meta.fields + ['farm_name', 'location','phone_number','wallet_address','crop_name','registration_date','certification_status']
        
    def create(self, validated_data):
            # Extract farm_name and location
            farm_name = validated_data.pop('farm_name', None)
            location = validated_data.pop('location', None)
            phone_number = validated_data.pop('phone_number',None)
            
            wallet_address=validated_data.pop('wallet_address',None)
            crop_name = validated_data.pop('crop_name',None)
            registration_date=validated_data.pop('registration_date',None)
            certification_status=validated_data.pop('certification_status',None)

            # Create the farmer instance using create_user
            farmer = Farmer.objects.create_user(**validated_data)

            # Assign extra fields to the farmer
            if farm_name:
                farmer.farm_name = farm_name
            if location:
                farmer.location = location
            if phone_number:
                farmer.phone_number = phone_number
            if wallet_address:
                farmer.wallet_address=wallet_address
            if crop_name:
                farmer.crop_name=crop_name
            if registration_date:
                farmer.registration_date = registration_date
            if certification_status:
                farmer.certification_status = certification_status
                
            
            farmer.save()

            return farmer
        
        
class FarmerLoginSerializer(serializers.Serializer):
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
    
    
class FarmerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields="__all__"
        
        
class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields="__all__"