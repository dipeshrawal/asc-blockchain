from .models import SmartContract
from rest_framework import serializers

class SmartContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = SmartContract
        fields = '__all__'  # Or specify fields explicitly

    def create(self, validated_data):
        return SmartContract.objects.create(**validated_data)