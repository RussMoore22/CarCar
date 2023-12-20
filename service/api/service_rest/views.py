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
        "id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "customer",
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
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"delete": count > 0})
    except Technician.DoesNotExist:
        return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appts = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appts},
            encoder=AppointmentEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        tech = Technician.objects.get(id=content["technician"])
        content["technician"] = tech
        tech = Appointment.objects.create(**content)
        return JsonResponse(
            tech,
            encoder=AppointmentEncoder,
            safe=False,
        )

@require_http_methods("DELETE")
def api_appointment_delete(request, pk):
    try:
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"delete": count > 0})
    except Technician.DoesNotExist:
        return JsonResponse({"message": "Does not exist"})


@require_http_methods("PUT")
def api_appointment_cancel(request, pk):
    print(pk, " THIS IS PK **********")
    Appointment.objects.filter(id=pk).update(status="CANCELLED")
    appt = Appointment.objects.get(id=pk)

    return JsonResponse(
        appt,
        encoder=AppointmentEncoder,
        safe=False
    )


@require_http_methods("PUT")
def api_appointment_finish(request, pk):
    Appointment.objects.filter(id=pk).update(status="FINISHED")
    appt = Appointment.objects.get(id=pk)
    return JsonResponse(
        appt,
        encoder=AppointmentEncoder,
        safe=False
    )


@require_http_methods(["GET"])
def api_automobileVOs_list(request):
    autos = AutomobileVO.objects.all()
    return JsonResponse(
        {"autos": autos},
        encoder=AutomobileVOEncoder,
        safe=False
        )


