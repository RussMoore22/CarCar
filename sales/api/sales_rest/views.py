from django.shortcuts import render
from django.http import JsonResponse
from .models import AutomobileVO, Sale, Salesperson, Customer
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json
# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
        "sold",
    ]





class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id",
    ]

class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
        "id",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonListEncoder(),
        "customer": CustomerListEncoder()
    }



@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            auto_href = content["automobile"]
            automobile = AutomobileVO.objects.get(import_href=auto_href)
            s_person_id = content["salesperson"]
            s_person = Salesperson.objects.get(id=s_person_id)
            cust_id = content["customer"]
            cust = Customer.objects.get(id=cust_id)
            content["automobile"] = automobile
            content["salesperson"] = s_person
            content["customer"] = cust
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile id"},
                status=400,
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleListEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_show_sale(request, pk):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SaleListEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exist"},
                status=400
            )
    else:
        try:
            sale = Sale.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleListEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=400
            )

@require_http_methods(["GET", "POST"])
def api_salesperson_list(request):
    if request.method == "GET":
        persons = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": persons},
            encoder=SalespersonListEncoder
        )
    else:

        content = json.loads(request.body)
        person = Salesperson.objects.create(**content)
        return JsonResponse(
            person,
            encoder=SalespersonListEncoder,
            safe=False
        )

@require_http_methods(["GET", "DELETE"])
def api_salesperson_show(request, pk):
    if request.method == "GET":
        try:
            person = Salesperson.objects.get(id=pk)
            return JsonResponse(
                person,
                encoder=SalespersonListEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"},
                status=400
            )
    else:
        try:
            person = Salesperson.objects.get(id=pk)
            person.delete()
            return JsonResponse(
                person,
                encoder=SalespersonListEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message:" "Person does not exist"},
                status=400
            )

@require_http_methods(["GET", "POST"])
def api_customer_list(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
        )

    else:
        content = json.loads(request.body)
        phone = content["phone_number"]
        new = f'({phone[:3]})-{phone[3:6]}-{phone[6:]}'
        content["phone_number"] = new
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerListEncoder,
            safe=False
        )

@require_http_methods(["GET", "DELETE"])
def api_customer_show(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False
        )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=400,
            )
    else:
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=400
            )
