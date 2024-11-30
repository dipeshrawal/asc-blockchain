from django.db import models
from django.contrib.auth.models import BaseUserManager

#custom user manager

class UserManager(BaseUserManager):
    
    def create_user(self,email, name, password=None, password2= None , user_type=None  ,**extra_fields):
        if not email:
            raise ValueError("User Must have an email address")
        user = self.model(
            email=self.normalize_email(email),
            name=name,
            user_type=user_type,
        )
        user.set_password(password)
        user.save(using=self.db)
        return user
    
    def create_superuser(self,email,name ,user_type=None,password=None):
        user_type='admin'
        user=self.create_user(email,password=password,name=name,user_type=user_type)
        user.is_admin=True
        user.save(using=self.db)
        return user
    