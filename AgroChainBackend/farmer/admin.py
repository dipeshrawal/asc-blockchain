from django.contrib import admin
from .models import Farmer


@admin.register(Farmer)
class FarmerAdmin(admin.ModelAdmin):
    # Fields to display in the admin list view
    list_display = (
        'id', 'email', 'name', 'user_type', 
        'farm_name', 'location', 'phone_number', 
        'wallet_address', 'crop_name', 'certification_status', 
        'is_active', 'registration_date', 'created_at'
    )

    # Filters for the list view
    list_filter = ('user_type', 'is_active', 'certification_status', 'registration_date', 'created_at')

    # Fields to search by
    search_fields = ('email', 'name', 'farm_name', 'location', 'phone_number', 'wallet_address', 'crop_name')

    # Fields that cannot be edited directly
    readonly_fields = ('id', 'registration_date', 'created_at', 'updated_at')

    # Default ordering for the list view
    ordering = ('-created_at',)

    # Field grouping in the detailed view
    fieldsets = (
        ('Personal Details', {
            'fields': ('email', 'name', 'phone_number', 'wallet_address')
        }),
        ('Farm Information', {
            'fields': ('farm_name', 'location', 'crop_name', 'certification_status')
        }),
        ('Permissions', {
            'fields': ('is_active',)
        }),
        ('Important Dates', {
            'fields': ('registration_date', 'created_at', 'updated_at', 'last_login')
        }),
    )

    # Inline actions
    actions = ['toggle_certification_status']

    # Custom action: Toggle certification status for selected farmers
    def toggle_certification_status(self, request, queryset):
        for farmer in queryset:
            farmer.certification_status = not farmer.certification_status
            farmer.save()
        self.message_user(request, "Certification status toggled for selected farmers.")
    toggle_certification_status.short_description = "Toggle certification status for selected farmers"
