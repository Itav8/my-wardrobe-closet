from django.urls import path

from .api_views import api_list_shoes, api_shoe_detail

urlpatterns = [
    path("shoes/", api_list_shoes, name="api_create_shoes"),
    path("shoes/<int:pk>/", api_shoe_detail, name="api_shoe_detail"),
]
