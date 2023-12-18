from django.contrib import admin
from django.urls import path
from service_rest.views import (
    api_technician_delete,
    api_technicians,
    api_appointments,
    api_appointment_delete,
    api_appointment_cancel,
    api_appointment_finish
    )


urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:pk>/", api_technician_delete, name="api_technician_delete"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:pk>/", api_appointment_delete, name="api_appointment_delete"),
    path("appointments/<int:pk>/finish/", api_appointment_finish, name="api_appointment_finish"),
    path("appointments/<int:pk>/cancel/", api_appointment_cancel, name="api_appointment_cancel")
]
