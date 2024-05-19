# car_estimation/forms.py
from django.utils import timezone
from django import forms

class CarPricePredictionForm(forms.Form):
    brand = forms.CharField(max_length=100, required=True)
    model = forms.CharField(max_length=100, required=True) 
    year = forms.IntegerField(min_value=1900, max_value=timezone.now().year, required=True)
    kilometer = forms.IntegerField(min_value=0, required=True)
    engine = forms.FloatField(required=True)  
    transmission = forms.CharField(max_length=100, required=True)
    fuel = forms.CharField(max_length=100, required=True)
    nb_of_doors = forms.FloatField(min_value=0,required=True) 
    horsepower = forms.FloatField(min_value=0,required=True)

 
