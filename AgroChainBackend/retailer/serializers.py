from customUser.models import User
from retailer.models import Retailer
from customUser.serializers import UserRegistrationSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate



class RetailerRegistrationSerializer(UserRegistrationSerializer):
    class Meta(UserRegistrationSerializer.Meta):
        model = Retailer
        fields = UserRegistrationSerializer.Meta.fields + ['shop_name', 'business_license','address','phone_number','wallet_address','store_type','inventory_capacity']
        
    def create(self, validated_data):
            # Extract shop_name and business_license
            shop_name = validated_data.pop('shop_name', None)
            business_license = validated_data.pop('business_license', None)
            address = validated_data.pop('address',None)
            phone_number=validated_data.pop('phone_number',None)
            wallet_address = validated_data.pop('wallet_address',None)
            store_type = validated_data.pop('store_type',None)
            inventory_capacity = validated_data.pop('inventory_capacity',None)
              

            # Create the retailer instance using create_user
            retailer = Retailer.objects.create_user(**validated_data)

            # Assign extra fields to the retailer
            if shop_name:
                retailer.shop_name = shop_name
            if business_license:
                retailer.business_license = business_license
            if address:
                retailer.address=address
            if phone_number:
                retailer.phone_number = phone_number
            if wallet_address:
                retailer.wallet_address = wallet_address
            if store_type:
                retailer.store_type=store_type
            if inventory_capacity:
                retailer.inventory_capacity=inventory_capacity
                
            
            retailer.save()

            return retailer
        
        
class RetailerLoginSerializer(serializers.Serializer):
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
    
    
class RetailerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields="__all__"