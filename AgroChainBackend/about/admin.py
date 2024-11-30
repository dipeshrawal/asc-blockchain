from django.contrib import admin
from .models import About

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    # Fields to display in the admin list view
    list_display = (
        'title', 'contact_email', 'created_at', 'updated_at'
    )

    # Fields to search in the admin interface
    search_fields = ('title', 'contact_email')

    # Filters for the list view
    list_filter = ('created_at',)

    # Read-only fields
    readonly_fields = ('created_at', 'updated_at')

    # Default ordering for the list view
    ordering = ('-created_at',)

    # Field grouping in the detailed view
    fieldsets = (
        ('About Section', {
            'fields': ('title', 'description', 'mission', 'vision', 'contact_email', 'phone_number', 'address', 'website_url')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
