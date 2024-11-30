from django.urls import path, include
from django.urls import path
from .views import CustomerProductAPIView,DistributorProductAPIView, RetailerProductAPIView,FarmerProductAPIView



urlpatterns = [
    path('customer-products/', CustomerProductAPIView.as_view(), name='customer-product-list'),
    path('customer-products/<int:pk>/', CustomerProductAPIView.as_view(), name='customer-product-detail'),
    path('distributor-products/', DistributorProductAPIView.as_view(), name='distributor-product-list'),
    path('distributor-products/<int:pk>/', DistributorProductAPIView.as_view(), name='distributor-product-detail'),
    path('retailer-products/', RetailerProductAPIView.as_view(), name='retailer-product-list'),
    path('retailer-products/<int:pk>/', RetailerProductAPIView.as_view(), name='retailer-product-detail'),
    path('farmer-products/', FarmerProductAPIView.as_view(), name='farmer-product-list'),
    path('farmer-products/<int:pk>/', FarmerProductAPIView.as_view(), name='farmer-product-detail'),
]