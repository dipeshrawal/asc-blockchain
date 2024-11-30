from django.contrib import admin
from .models import Transaction


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    # Fields to display in the admin list view
    list_display = (
        'id', 'smart_contract', 'buyer', 'amount', 'payment_method', 
        'payment_status', 'blockchain_hash', 'transaction_fee', 'created_at', 'updated_at'
    )

    # Filters for the list view
    list_filter = ('payment_method', 'payment_status', 'created_at', 'smart_contract')

    # Fields that can be searched in the admin interface
    search_fields = ('blockchain_hash', 'smart_contract__product__name', 'buyer__email')

    # Read-only fields
    readonly_fields = ('created_at', 'updated_at')

    # Default ordering for the list view
    ordering = ('-created_at',)

    # Field grouping in the detailed view
    fieldsets = (
        ('Transaction Details', {
            'fields': ('smart_contract', 'buyer', 'amount', 'payment_method', 'payment_status', 'blockchain_hash', 'transaction_fee')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )

    # Inline actions for bulk updates
    actions = ['mark_all_paid', 'mark_all_unpaid']

    # Custom action to mark all selected transactions as paid
    def mark_all_paid(self, request, queryset):
        queryset.update(payment_status=True)
        self.message_user(request, "Selected transactions marked as paid.")
    mark_all_paid.short_description = "Mark all selected transactions as paid"

    # Custom action to mark all selected transactions as unpaid
    def mark_all_unpaid(self, request, queryset):
        queryset.update(payment_status=False)
        self.message_user(request, "Selected transactions marked as unpaid.")
    mark_all_unpaid.short_description = "Mark all selected transactions as unpaid"
