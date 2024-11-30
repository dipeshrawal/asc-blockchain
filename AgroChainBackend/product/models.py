from django.db import models

from smartContract.models import *
from farmer.models import Farmer
# Create your models here.
# Define choices for product categories
CATEGORY_CHOICES = [
    ('FRUIT', 'Fruit'),
    ('VEGETABLE', 'Vegetable'),
    ('GRAIN', 'Grain'),
    ('DAIRY', 'Dairy'),
    ('MEAT', 'Meat'),
    ('OTHER', 'Other'),
]

class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    quantity = models.IntegerField()
    quality_certifications = models.BooleanField(default=False)
    harvest_date = models.DateField()
    price_per_kg = models.DecimalField(max_digits=10, decimal_places=2)
    batch_number = models.CharField(max_length=255)
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE, related_name='products')
    image = models.ImageField(upload_to='product_images/', blank=True, null=True, help_text="Upload a full image of the product")
    
