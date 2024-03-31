# car_estimation/forms.py
from django import forms

class CarPricePredictionForm(forms.Form):
    brand = forms.CharField(max_length=100)
    model = forms.CharField(max_length=100)
    year = forms.IntegerField(min_value=1900, max_value=2100)
    mileage = forms.DecimalField(min_value=0, max_digits=10, decimal_places=2)
    transmission = forms.ChoiceField(choices=[('Manual', 'Manual'), ('Automatic', 'Automatic')])
    engine_type = forms.CharField(max_length=100)
    fuel_type = forms.ChoiceField(choices=[('Gasoline', 'Gasoline'), ('Diesel', 'Diesel')])

