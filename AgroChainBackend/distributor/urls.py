from django.urls import path

from distributor.views import DistributorRegistrationView,DistributorLoginView, GetAllDistributor


urlpatterns = [
    path('register/',DistributorRegistrationView.as_view(),name='distributor_register'),
    path('login/',DistributorLoginView.as_view(),name='distributor_login'),
     path('profile/',DistributorLoginView.as_view(),name='distributor_profile'),
      path('distributor-all/',GetAllDistributor.as_view(),name='distributor_all'),
    
]
