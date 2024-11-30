from django.db import models

class ProductRate(models.Model):
    product_name = models.CharField(max_length=100, verbose_name="Product Name")
    price_per_kg = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Price per Kg")
    location = models.CharField(max_length=100, verbose_name="Location")

    class Meta:
        verbose_name = "Product Rate"
        verbose_name_plural = "Product Rates"
        db_table = "product_rate"  # Custom table name
        ordering = ['product_name']  # Default ordering by product name

    def __str__(self):
        return f"{self.product_name} ({self.location})"
