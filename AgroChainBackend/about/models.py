from django.db import models

class About(models.Model):
    title = models.CharField(max_length=255, help_text="Title of the about section")
    description = models.TextField(help_text="Detailed description")
    mission = models.TextField(blank=True, null=True, help_text="Mission statement")
    vision = models.TextField(blank=True, null=True, help_text="Vision statement")
    contact_email = models.EmailField(help_text="Contact email address")
    phone_number = models.CharField(max_length=20, blank=True, null=True, help_text="Contact phone number")
    address = models.TextField(blank=True, null=True, help_text="Physical address")
    website_url = models.URLField(blank=True, null=True, help_text="Official website link")
    created_at = models.DateTimeField(auto_now_add=True, help_text="Time when the record was created")
    updated_at = models.DateTimeField(auto_now=True, help_text="Time when the record was last updated")
    image = models.ImageField(upload_to='about_images/', blank=True, null=True, help_text="Upload a full image of the product")

    def __str__(self):
        return self.title
