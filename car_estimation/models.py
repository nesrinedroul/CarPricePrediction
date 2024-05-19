# car_estimation/models.py
from django.db import models

class Car(models.Model):
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    kilometer = models.IntegerField()
    engine = models.FloatField()
    transmission = models.CharField(max_length=100)
    fuel = models.CharField(max_length=100)
    nb_of_doors = models.FloatField()
    horsepower = models.FloatField()

