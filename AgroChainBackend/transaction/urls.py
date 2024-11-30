from django.urls import path
from .views import CustomerTransactionAPIView,DistributorTransactionAPIView,RetailerTransactionAPIView,FarmerTransactionAPIView

urlpatterns = [
    path('customer-transactions/', CustomerTransactionAPIView.as_view(), name='customer-transaction-list-create'),
    path('customer-transactions/<int:pk>/', CustomerTransactionAPIView.as_view(), name='customer-transaction-detail'),
    path('distributor-transactions/',DistributorTransactionAPIView.as_view(), name='distributor-transaction-list-create'),
    path('distributor-transactions/<int:pk>/', DistributorTransactionAPIView.as_view(), name='distributor-transaction-detail'),
    path('retailer-transactions/', RetailerTransactionAPIView.as_view(), name='retailer-transaction-list-create'),
    path('retailer-transactions/<int:pk>/', RetailerTransactionAPIView.as_view(), name='retailer-transaction-detail'),
    path('farmer-transactions/', FarmerTransactionAPIView.as_view(), name='farmer-transaction-list-create'),
    path('farmer-transactions/<int:pk>/', FarmerTransactionAPIView.as_view(), name='farmer-transaction-detail'),
]
