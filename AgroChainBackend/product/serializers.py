from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'  # Or specify fields explicitly
        
        read_only_fields = ['id']

    def create(self, validated_data):
        return Product.objects.create(**validated_data)