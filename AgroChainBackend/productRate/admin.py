from django.contrib import admin
from .models import ProductRate

@admin.register(ProductRate)
class ProductRateAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'price_per_kg', 'location')
    search_fields = ('product_name', 'location')
    list_filter = ('location',)
