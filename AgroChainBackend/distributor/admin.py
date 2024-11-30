from django.contrib import admin
from .models import Distributor


@admin.register(Distributor)
class DistributorAdmin(admin.ModelAdmin):
    # Fields to display in the admin list view
    list_display = (
        'id', 'email', 'name', 'user_type', 
        'company_name', 'phone_number', 'address', 
        'wallet_address', 'certification_status', 
        'number_of_deliveries', 'is_active', 'created_at'
    )

    # Filters for the list view
    list_filter = ('user_type', 'is_active', 'certification_status', 'created_at')

    # Fields to search by
    search_fields = ('email', 'name', 'company_name', 'phone_number', 'wallet_address')

    # Fields that cannot be edited directly
    readonly_fields = ('id', 'created_at', 'updated_at')

    # Default ordering for the list view
    ordering = ('-created_at',)

    # Field grouping in the detailed view
    fieldsets = (
        ('Personal Details', {
            'fields': ('email', 'name', 'phone_number', 'address', 'wallet_address')
        }),
        ('Company Information', {
            'fields': ('company_name', 'delivery_zones', 'certification_status', 'number_of_deliveries')
        }),
        ('Permissions', {
            'fields': ('is_active',)
        }),
        ('Important Dates', {
            'fields': ('created_at', 'updated_at', 'last_login')
        }),
    )

    # Inline actions
    actions = ['reset_delivery_counts', 'toggle_certification_status']

    # Custom action: Reset delivery counts for selected distributors
    def reset_delivery_counts(self, request, queryset):
        queryset.update(number_of_deliveries=0)
        self.message_user(request, "Delivery counts for selected distributors have been reset.")
    reset_delivery_counts.short_description = "Reset delivery counts for selected distributors"

    # Custom action: Toggle certification status for selected distributors
    def toggle_certification_status(self, request, queryset):
        for distributor in queryset:
            distributor.certification_status = not distributor.certification_status
            distributor.save()
        self.message_user(request, "Certification status toggled for selected distributors.")
    toggle_certification_status.short_description = "Toggle certification status for selected distributors"
