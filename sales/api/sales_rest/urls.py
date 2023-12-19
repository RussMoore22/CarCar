from django.urls import path
from .views import api_list_sales, api_customer_list, api_customer_show, api_salesperson_list, api_salesperson_show, api_show_sale

urlpatterns = [
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:pk>/", api_show_sale, name="api_show_sale"),
    path("customers/", api_customer_list, name="api_customer_list"),
    path("customers/<int:pk>/", api_customer_show, name="api_customer_show"),
    path("salespeople/", api_salesperson_list, name="api_salesperson_list"),
    path("salespeople/<int:pk>/", api_salesperson_show, name="api_salesperson_show")
]
