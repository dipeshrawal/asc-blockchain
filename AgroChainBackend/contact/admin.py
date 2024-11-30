from django.contrib import admin
from .models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    # Fields to display in the admin list view
    list_display = (
        'name', 'email', 'phone_number', 'created_at'
    )

    # Fields to search in the admin interface
    search_fields = ('name', 'email')

    # Filters for the list view
    list_filter = ('created_at',)

    # Read-only fields
    readonly_fields = ('created_at',)

    # Default ordering for the list view
    ordering = ('-created_at',)

    # Field grouping in the detailed view
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone_number', 'message')
        }),
        ('Timestamps', {
            'fields': ('created_at',)
        }),
    )
