from django.urls import path
from .views import ProductRateView

urlpatterns = [
    path('product-rate/', ProductRateView.as_view(), name='product-rate'),
   
]
