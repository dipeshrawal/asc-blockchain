from django.contrib import admin
from .models import SmartContract


@admin.register(SmartContract)
class SmartContractAdmin(admin.ModelAdmin):
    # Fields to display in the admin list view
    list_display = (
        'id', 'contract_type', 'initiator', 'receiver', 'product', 
        'status', 'valid_until', 'retailer_approved', 
        'distributor_approved', 'farmer_approved', 'created_at', 'updated_at'
    )

    # Filters for the list view
    list_filter = ('status', 'contract_type', 'valid_until', 'retailer_approved', 'distributor_approved', 'farmer_approved')

    # Fields to search by
    search_fields = ('product__name', 'initiator__name', 'receiver__name', 'contract_type')

    # Fields that cannot be edited directly
    readonly_fields = ('id', 'status', 'created_at', 'updated_at')

    # Default ordering for the list view
    ordering = ('-created_at',)

    # Field grouping in the detailed view
    fieldsets = (
        ('Contract Details', {
            'fields': ('contract_type', 'initiator', 'receiver', 'product', 'terms_and_conditions', 'payment_terms', 'valid_until')
        }),
        ('Approval Status', {
            'fields': ('retailer_approved', 'distributor_approved', 'farmer_approved', 'status')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )

    # Inline actions
    actions = ['mark_all_approved', 'mark_all_disapproved']

    # Custom action: Mark all approvals as True
    def mark_all_approved(self, request, queryset):
        queryset.update(retailer_approved=True, distributor_approved=True, farmer_approved=True)
        for contract in queryset:
            contract.save()  # Update status based on approvals
        self.message_user(request, "Selected contracts marked as approved.")
    mark_all_approved.short_description = "Mark all approvals as True"

    # Custom action: Mark all approvals as False
    def mark_all_disapproved(self, request, queryset):
        queryset.update(retailer_approved=False, distributor_approved=False, farmer_approved=False)
        for contract in queryset:
            contract.save()  # Update status based on approvals
        self.message_user(request, "Selected contracts marked as disapproved.")
    mark_all_disapproved.short_description = "Mark all approvals as False"
