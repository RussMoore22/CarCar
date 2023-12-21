from django.db import models

# Create your models here.
STATUS_CHOICES = (
    ("CREATED", "created"),
    ("CANCELLED", "cancelled"),
    ("FINISHED", "finished"),
)

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField()


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=51, unique=True)

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    customer = models.CharField(max_length=100)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="CREATED")
    vin = models.CharField(max_length=17)

    technician = models.ForeignKey(
        Technician,
        related_name='appointmens',
        on_delete=models.CASCADE
    )
