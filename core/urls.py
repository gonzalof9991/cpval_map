from os import name
from django.urls import path

from .views import  AreaMapView 
#, lista
app_name = "markers"

urlpatterns = [
    path("", AreaMapView.as_view())

    
]  