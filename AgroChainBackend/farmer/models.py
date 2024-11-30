from django.db import models
from customUser.models import User
class Farmer(User):
    
    farm_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    wallet_address = models.CharField(max_length=255, unique=True)
    crop_name = models.CharField(max_length=255)
    registration_date = models.DateField(auto_now_add=True)
    certification_status = models.BooleanField(default=False)
    