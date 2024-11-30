from django.contrib import admin
from customUser.models import User
from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    # Fields to display in the admin list view
    list_display = (
        'id', 'email', 'name', 'user_type', 
        'phone_number', 'address', 'wallet_address', 
        'feedback_score', 'is_active', 'created_at'
    )

    # Filters for the list view
    list_filter = ('user_type', 'is_active', 'feedback_score', 'created_at')

    # Fields to search by
    search_fields = ('email', 'name', 'phone_number', 'wallet_address')

    # Fields that cannot be edited directly
    readonly_fields = ('id', 'created_at', 'updated_at')

    # Default ordering for the list view
    ordering = ('-created_at',)

    # Field grouping in the detailed view
    fieldsets = (
        ('Personal Details', {
            'fields': ('email', 'name', 'phone_number', 'address', 'wallet_address')
        }),
        ('Additional Information', {
            'fields': ('feedback_score',)
        }),
        ('Permissions', {
            'fields': ('is_active',)
        }),
        ('Important Dates', {
            'fields': ('created_at', 'updated_at', 'last_login')
        }),
    )

    # Inline actions
    actions = ['reset_feedback_scores']

    # Custom action: Reset feedback scores for selected customers
    def reset_feedback_scores(self, request, queryset):
        queryset.update(feedback_score=0)
        self.message_user(request, "Feedback scores for selected customers have been reset.")
    reset_feedback_scores.short_description = "Reset feedback scores for selected customers"
