from django.contrib import admin
from .models import Retailer


@admin.register(Retailer)
class RetailerAdmin(admin.ModelAdmin):
    # Fields to display in the admin list view
    list_display = (
        'id', 'email', 'name', 'user_type', 
        'shop_name', 'business_license', 'store_type', 
        'inventory_capacity', 'wallet_address', 
        'phone_number', 'address', 'is_active', 
        'created_at', 'updated_at'
    )

    # Filters for the list view
    list_filter = ('user_type', 'is_active', 'store_type', 'created_at', 'updated_at')

    # Fields to search by
    search_fields = ('email', 'name', 'shop_name', 'business_license', 'wallet_address', 'store_type', 'address', 'phone_number')

    # Fields that cannot be edited directly
    readonly_fields = ('id', 'created_at', 'updated_at', 'last_login')

    # Default ordering for the list view
    ordering = ('-created_at',)

    # Field grouping in the detailed view
    fieldsets = (
        ('Personal Details', {
            'fields': ('email', 'name', 'phone_number', 'address', 'wallet_address')
        }),
        ('Business Information', {
            'fields': ('shop_name', 'business_license', 'store_type', 'inventory_capacity')
        }),
        ('Permissions', {
            'fields': ('is_active',)
        }),
        ('Important Dates', {
            'fields': ('created_at', 'updated_at', 'last_login')
        }),
    )

    # Inline actions
    actions = ['reset_inventory_capacity']

    # Custom action: Reset inventory capacity for selected retailers
    def reset_inventory_capacity(self, request, queryset):
        queryset.update(inventory_capacity=0)
        self.message_user(request, "Inventory capacity reset for selected retailers.")
    reset_inventory_capacity.short_description = "Reset inventory capacity for selected retailers"
