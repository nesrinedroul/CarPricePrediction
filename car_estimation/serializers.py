from rest_framework import serializers 
from .models import Car

class CarSerializers(serializers.ModelSerializer): 
    class Meta: 
        model= Car
        fields= '__all__'