from rest_framework import serializers
from customUser.models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model=User
        fields=['email','name','password','password2','user_type']
        extra_kwargs = {
            'password': {'write_only': True},  # Correct the syntax here
        }
    def validate(self, attrs):
        password=attrs.get('password')
        password2=attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError(
                {"password2":"passwords do not matched"}
            )
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2',None)
        user=User.objects.create_user(**validated_data)
        return user
    
    
class UserLoginSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email','password']