from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # Fields to display in the admin list view
    list_display = (
        'id', 'name', 'category', 'quantity', 
        'quality_certifications', 'harvest_date', 
        'price_per_kg', 'batch_number', 'farmer'
    )

    # Filters for the list view
    list_filter = ('category', 'quality_certifications', 'harvest_date', 'farmer')

    # Fields to search by
    search_fields = ('name', 'batch_number', 'farmer__name', 'category')

    # Fields that cannot be edited directly
    readonly_fields = ('id',)

    # Default ordering for the list view
    ordering = ('-harvest_date',)

    # Field grouping in the detailed view
    fieldsets = (
        ('Product Details', {
            'fields': ('name', 'category', 'quantity', 'price_per_kg', 'quality_certifications')
        }),
        ('Batch Information', {
            'fields': ('batch_number', 'harvest_date', 'farmer')
        }),
    )

    # Inline actions
    actions = ['mark_certified', 'reset_quantity']

    # Custom action: Mark selected products as certified
    def mark_certified(self, request, queryset):
        queryset.update(quality_certifications=True)
        self.message_user(request, "Selected products marked as certified.")
    mark_certified.short_description = "Mark selected products as certified"

    # Custom action: Reset quantity for selected products
    def reset_quantity(self, request, queryset):
        queryset.update(quantity=0)
        self.message_user(request, "Quantity reset for selected products.")
    reset_quantity.short_description = "Reset quantity for selected products"
