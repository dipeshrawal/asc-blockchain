from django.db import models

from customUser.models import User


class TermsAndConditions(models.Model):
    

    title = models.CharField(max_length=255, unique=True)
    content = models.TextField(help_text="The full text of the terms and conditions")
    version = models.CharField(max_length=50, default="1.0")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    effective_date = models.DateField(help_text="The date from which the terms are effective")
    accepted_by_user = models.BooleanField(default=False)
    url = models.URLField(null=True, blank=True, help_text="URL for full terms document if hosted externally")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='terms_created_by')
    privacy_policy_link = models.URLField(null=True, blank=True)
    cookies_policy_link = models.URLField(null=True, blank=True)
    governing_law = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to='termsConditions_images/', blank=True, null=True, help_text="Upload a full image of the product")
   
    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Terms and Conditions"
        verbose_name_plural = "Terms and Conditions"
