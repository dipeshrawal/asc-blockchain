from django.db import models
from distributor.models import Distributor
from retailer.models import Retailer
from product.models import Product

# Define choices for contract types
CONTRACT_TYPE_CHOICES = [
    ('SALE', 'Sale'),
    ('OTHER', 'Other'),
]

class SmartContract(models.Model):
    contract_type = models.CharField(max_length=50, choices=CONTRACT_TYPE_CHOICES)  
    initiator = models.ForeignKey(Distributor, on_delete=models.CASCADE, related_name='initiated_contracts', default=None, null=True)
    receiver = models.ForeignKey(Retailer, on_delete=models.CASCADE, related_name='received_contracts', default=None, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)  # Active or inactive
    valid_until = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Approval Fields
    retailer_approved = models.BooleanField(default=False)
    distributor_approved = models.BooleanField(default=False)
    farmer_approved = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Automatically set status to True if all approval fields are True
        if self.retailer_approved and self.distributor_approved and self.farmer_approved:
            self.status = True
        else:
            self.status = False

        super(SmartContract, self).save(*args, **kwargs)

    def __str__(self):
        return f"Contract for {self.product.name} between {self.initiator} and {self.receiver}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Smart Contract"
        verbose_name_plural = "Smart Contracts"
