# Generated by Django 5.0.3 on 2024-04-03 05:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
                ('year', models.IntegerField()),
                ('driven_kilometer', models.DecimalField(decimal_places=2, max_digits=10)),
                ('transmission', models.CharField(max_length=100)),
                ('engine_type', models.CharField(max_length=100)),
                ('fuel_type', models.CharField(max_length=100)),
                ('owner', models.IntegerField()),
                ('max_power', models.IntegerField()),
            ],
        ),
    ]
