from django.urls import path
from .views import CustomerSmartContractAPIView,DistributorSmartContractAPIView, RetailerSmartContractAPIView, FarmerSmartContractAPIView

urlpatterns = [
    path('customer-smart-contracts/', CustomerSmartContractAPIView.as_view(), name='customer-smart-contract-list-create'),
    path('customer-smart-contracts/<int:pk>/', DistributorSmartContractAPIView.as_view(), name='customer-smart-contract-detail'),
    path('distributor-smart-contracts/', RetailerSmartContractAPIView.as_view(), name='distributor-smart-contract-list-create'),
    path('distributor-smart-contracts/<int:pk>/', RetailerSmartContractAPIView.as_view(), name='distributor-smart-contract-detail'),   
    path('retailer-smart-contracts/', RetailerSmartContractAPIView.as_view(), name='retailer-smart-contract-list-create'),
    path('retailer-smart-contracts/<int:pk>/', RetailerSmartContractAPIView.as_view(), name='retailer-smart-contract-detail'),
    path('farmer-smart-contracts/', FarmerSmartContractAPIView.as_view(), name='farmer-smart-contract-list-create'),
    path('farmer-smart-contracts/<int:pk>/', FarmerSmartContractAPIView.as_view(), name='farmer-smart-contract-detail'),
]
