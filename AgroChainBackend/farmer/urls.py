from django.urls import path
from farmer.views import FarmerLoginView, FarmerProfileView, FarmerRegistrationView, GetAllFarmer


urlpatterns = [
    path('register/',FarmerRegistrationView.as_view(),name='farmer_register'),
    path('login/',FarmerLoginView.as_view(),name='farmer_login'),
    path('profile/',FarmerProfileView.as_view(),name='farmer_profile'),
    path('farmer-all/',GetAllFarmer.as_view(),name='farmer_all'),
    
]
