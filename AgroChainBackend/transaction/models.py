from django.db import models
from smartContract.models import SmartContract
from customer.models import Customer

# Define choices for payment methods
PAYMENT_METHOD_CHOICES = [
    ('CASH', 'Cash'),
    ('CARD', 'Card'),
    ('CRYPTO', 'Cryptocurrency'),
]


    
class Transaction(models.Model):
   
    smart_contract = models.ForeignKey(SmartContract, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES)
    payment_status = models.BooleanField(default=False)
    blockchain_hash = models.CharField(max_length=66)  # Ethereum hash length
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    transaction_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    buyer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, related_name='transactions')