from django.contrib import admin
from django.urls import path
from service_rest.views import api_technician_delete, api_technicians


urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:pk>/", api_technician_delete, name="api_technician_delete"),
]
