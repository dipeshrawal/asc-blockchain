from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=255, help_text="Name of the person")
    email = models.EmailField(help_text="Email address of the person")
    phone_number = models.CharField(max_length=20, blank=True, null=True, help_text="Phone number (optional)")
    message = models.TextField(help_text="Message the user wants to send")
    created_at = models.DateTimeField(auto_now_add=True, help_text="Time when the contact was created")

    def __str__(self):
        return f"Contact from {self.name}"
