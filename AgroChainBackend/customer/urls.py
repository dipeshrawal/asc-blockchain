from django.urls import path
from .views  import CustomerLoginView, CustomerProfileView, CustomerRegistrationView

urlpatterns = [
    path('register/',CustomerRegistrationView.as_view(),name='customer_register'),
    path('login/',CustomerLoginView.as_view(),name='customer_login'),
     path('profile',CustomerProfileView.as_view(),name='customer_profile'),
    
]
