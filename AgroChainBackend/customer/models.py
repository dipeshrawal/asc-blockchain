from django.db import models

from customUser.models import User

class Customer(User):
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    wallet_address = models.CharField(max_length=255, unique=True)
    feedback_score = models.IntegerField(null=True, default=0)  # Default to 0 if feedback not given
    