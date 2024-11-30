from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ('email', 'name', 'user_type', 'is_active', 'is_admin')
    list_filter = ('is_active', 'is_admin', 'user_type')
    search_fields = ('email', 'name',)
    ordering = ('email',)

    # Fields for the User form
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'user_type',)}),
        ('Permissions', {'fields': ('is_active', 'is_admin')}),
        ('Important dates', {'fields': ('created_at', 'updated_at')}),
    )
    add_fieldsets = (
        (None, {'fields': ('email', 'password1', 'password2')}),
        ('Personal info', {'fields': ('name', 'user_type',)}),
        ('Permissions', {'fields': ('is_active', 'is_admin')}),
    )

    # Optionally, remove the filter_horizontal attributes if you don't need them
    filter_horizontal = ()

# Register the custom user model with the admin interface
admin.site.register(User, UserAdmin)
