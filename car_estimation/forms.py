# car_estimation/forms.py
from django.utils import timezone
from django import forms

class CarPricePredictionForm(forms.Form):
    brand = forms.CharField(max_length=100, required=True)
    model = forms.CharField(max_length=100, required=True) 
    engine_type = forms.CharField(max_length=100, required=True)
    nb_of_doors = forms.CharField(max_length=100, required=True)
    year = forms.IntegerField(min_value=1900, max_value=timezone.now().year, required=True)
    transmission = forms.CharField(max_length=100, required=True)
    fuel_type = forms.CharField(max_length=100, required=True)
    driven_kilometer = forms.CharField(max_length=100, required=True)

