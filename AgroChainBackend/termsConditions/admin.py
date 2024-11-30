from django.contrib import admin
from .models import TermsAndConditions


@admin.register(TermsAndConditions)
class TermsAndConditionsAdmin(admin.ModelAdmin):
    # Fields to display in the admin list view
    list_display = (
        'id', 'title', 'version', 'created_by', 'effective_date', 
        'accepted_by_user', 'created_at', 'updated_at'
    )

    # Filters for the list view
    list_filter = ('version', 'created_by', 'effective_date', 'accepted_by_user')

    # Fields that can be searched in the admin interface
    search_fields = ('title', 'created_by__email', 'content')

    # Fields that should be read-only (cannot be edited directly)
    readonly_fields = ('created_at', 'updated_at')

    # Default ordering for the list view
    ordering = ('-created_at',)

    # Field grouping in the detailed view
    fieldsets = (
        ('Terms Details', {
            'fields': ('title', 'content', 'version', 'effective_date', 'accepted_by_user')
        }),
        ('Additional Info', {
            'fields': ('url', 'privacy_policy_link', 'cookies_policy_link', 'governing_law')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
        ('Creator Info', {
            'fields': ('created_by',)
        }),
    )

    # Inline actions for bulk updates
    actions = ['mark_all_accepted', 'mark_all_rejected']

    # Custom action to mark all terms as accepted
    def mark_all_accepted(self, request, queryset):
        queryset.update(accepted_by_user=True)
        self.message_user(request, "Selected terms marked as accepted.")
    mark_all_accepted.short_description = "Mark all terms as accepted"

    # Custom action to mark all terms as not accepted
    def mark_all_rejected(self, request, queryset):
        queryset.update(accepted_by_user=False)
        self.message_user(request, "Selected terms marked as not accepted.")
    mark_all_rejected.short_description = "Mark all terms as not accepted"
