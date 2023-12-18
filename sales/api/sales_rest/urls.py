from django.urls import path
from .views import api_list_sales

urlpatterns = [
    path("sales/", api_list_sales, name="api_list_sales"),
]
