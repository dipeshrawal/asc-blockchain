from django.db import models

from customUser.models import User
class Distributor(User):
    
    company_name = models.CharField(max_length=255)
    delivery_zones = models.TextField(max_length=255)
    phone_number = models.CharField(max_length=15)
    address = models.CharField(max_length=255)
    wallet_address = models.CharField(max_length=255, unique=True)
    certification_status = models.BooleanField(default=True)
    number_of_deliveries = models.IntegerField(default=0)
    