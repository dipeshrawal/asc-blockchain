from django.db import models


from customUser.models import User

class Retailer(User):
   
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    shop_name = models.CharField(max_length=255)
    business_license = models.CharField(max_length=255)
    wallet_address = models.CharField(max_length=255, unique=True)
    store_type = models.CharField(max_length=255)
    inventory_capacity = models.CharField(max_length=20)