from django.urls import path
from .views import AboutAPIView
urlpatterns = [
    path('about/', AboutAPIView.as_view(), name='about-getAll'),
    path('about/<int:pk>', AboutAPIView.as_view(), name='about-getSpecific'),
    
]
