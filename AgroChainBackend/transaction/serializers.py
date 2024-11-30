from .models import Transaction
from rest_framework import serializers
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'  # Or specify fields explicitly

    def create(self, validated_data):
        return Transaction.objects.create(**validated_data)