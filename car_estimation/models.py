# car_estimation/models.py
from django.db import models

class Car(models.Model):
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    engine_type = models.CharField(max_length=100)
    nb_of_doors = models.CharField(max_length=100)
    year = models.IntegerField()
    transmission = models.CharField(max_length=100)
    fuel_type = models.CharField(max_length=100)
    driven_kilometer = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.year} {self.brand} {self.model}"
