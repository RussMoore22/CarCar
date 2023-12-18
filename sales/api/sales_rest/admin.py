from django.contrib import admin
from .models import Sale, Salesperson, Customer

# Register your models here.

admin.site.register(Sale)
admin.site.register(Salesperson)
admin.site.register(Customer)
