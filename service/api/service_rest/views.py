from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment


# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "technician"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        techs = Technician.objects.all()
        return JsonResponse(
            {"techs": techs},
            encoder=TechnicianEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        tech = Technician.objects.create(**content)
        return JsonResponse(
            tech,
            encoder=TechnicianEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_technician_delete(request, pk):
    try:
        tech = Technician.objects.get(id=pk)
        tech.delete()
        return JsonResponse(
            tech,
            encoder=TechnicianEncoder,
            safe=False
        )
    except Technician.DoesNotExist:
        return JsonResponse({"message": "Does not exist"})
