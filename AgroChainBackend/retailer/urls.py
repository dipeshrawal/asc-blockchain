from django.urls import path

from retailer.views import GetAllRetailer, RetailerLoginView, RetailerRegistrationView


urlpatterns = [
    path('register/',RetailerRegistrationView.as_view(),name='retailer_register'),
    path('login/',RetailerLoginView.as_view(),name='retailer_login'),
    path('profile/',RetailerLoginView.as_view(),name='retailer_profile'),
    path('retailer-all/',GetAllRetailer.as_view(),name='retailer_all'),
]
