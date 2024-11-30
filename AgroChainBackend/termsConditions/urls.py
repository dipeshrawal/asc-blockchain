from django.urls import path
from .views import  TermsAndConditionsAPIView

urlpatterns = [
   path('terms/', TermsAndConditionsAPIView.as_view(), name='terms&conditions-create-getAll'),
   path('terms/<int:pk>/', TermsAndConditionsAPIView.as_view(), name='terms&conditions-create-getSpecific'),
   
]
