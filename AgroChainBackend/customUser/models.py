from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from customUser.manager import UserManager


#custom User Model 
class User(AbstractBaseUser):
    
    USER_TYPE_CHOICES = [
        ('farmer', 'Farmer'),
        ('customer', 'Customer'),
        ('retailer', 'Retailer'),
        ('distributor', 'Distributor'),
        ('admin','Admin')
    ]

    
    
    email=models.EmailField(verbose_name='email',max_length=255,unique=True)
    name=models.CharField(max_length=255)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    is_active=models.BooleanField(default=True)
    is_admin=models.BooleanField(default=False)
    created_at=models.DateField(auto_now_add=True)
    updated_at=models.DateField(auto_now=True)
    objects = UserManager()
    
    USERNAME_FIELD='email'
    REQUIRED_FIELDS =['name']
    
    def __str__(self):
        return self.email
    
    def has_perm(self,perm,obj=None):
        return self.is_admin
    
    def has_module_perms(self,app_label):
        return True
    
    @property
    def is_staff(self):
        return self.is_admin
    
    