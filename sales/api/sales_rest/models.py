from django.db import models
from django.urls import reverse

# Create your models here.

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=225)
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=35)
    employee_id = models.CharField(max_length=40)



class Customer(models.Model):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=35)
    address = models.TextField()
    phone_number = models.CharField(max_length=25)



class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE
    )
    price = models.DecimalField(max_digits=15, decimal_places=2)
