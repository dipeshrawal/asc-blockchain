from django.urls import path

from retailer.views import RetailerLoginView, RetailerRegistrationView,RetailerProfileView


urlpatterns = [
    path('register/',RetailerRegistrationView.as_view(),name='retailer_register'),
    path('login/',RetailerLoginView.as_view(),name='retailer_login'),
    path('profile/',RetailerProfileView.as_view(),name='retailer_profile')
    
]
