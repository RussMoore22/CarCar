# Generated by Django 4.0.3 on 2023-12-18 23:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_automobilevo_sold'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='customer',
            field=models.CharField(default='some guy', max_length=100),
            preserve_default=False,
        ),
    ]
