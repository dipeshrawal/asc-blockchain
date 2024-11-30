from io import BytesIO
from django.db import models
import qrcode
from django.core.files import File


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
    
    qr_code = models.ImageField(upload_to='qr_codes/products/', blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.qr_code or self._state.adding or self.has_changes():
            qr_data = f"Product: {self.name or 'N/A'}, Price: {self.price_per_kg or '0.00'}, Batch Number: {self.batch_number or '0.00'},Category: {self.category or '0.00'} , Quality Certification: {self.quality_certifications or 'False'}, Harvest Date: {self.harvest_date or '0.00'}"
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=10,
                border=4,
            )
            qr.add_data(qr_data)
            qr.make(fit=True)

            img = qr.make_image(fill_color="black", back_color="white")

            buffer = BytesIO()
            img.save(buffer, format="PNG")
            buffer.seek(0)
            self.qr_code.save(f"{self.name}_qr.png", File(buffer), save=False)
            buffer.close()

        super().save(*args, **kwargs)

    def has_changes(self):
        # """Check if any relevant field value has changed."""
        if not self.pk:  # Object is new
            return True
        old = Product.objects.get(pk=self.pk)
        return (
            old.name != self.name or
            old.category != self.category or
            old.quantity != self.quantity or
            old.quality_certifications != self.quality_certifications or
            old.harvest_date != self.harvest_date or
            old.price_per_kg != self.price_per_kg or
            old.batch_number != self.batch_number
        )

        
