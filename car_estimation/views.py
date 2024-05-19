# views.py
from django.shortcuts import render , redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import os
from .forms import CarPricePredictionForm
from .models import Car
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.shortcuts import render
from django.http import HttpResponse
import numpy as np
import joblib
import lightgbm as lgb

class MyAPIView(APIView):
   
   @swagger_auto_schema(
        operation_summary="Estimate car price",
        operation_description="Estimate the price of a car based on its brand, model, year, mileage, transmission, engine_type, fuel_type.",
        responses={200: "Success", 400: "Bad request", 404: "Not found"},
    )
   
   def get(self, request):
        return Response({'message': 'Send a POST request with car details to estimate the price.'})

   
   def post(self, request):
        try:
            # Validation of the form data
            form = CarPricePredictionForm(request.data)
            if not form.is_valid():
                return Response({'message': 'Invalid form data.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Cleaned form data
            brand = form.cleaned_data['brand']
            model = form.cleaned_data['model'] 
            year = form.cleaned_data['year']
            kilometer = form.cleaned_data['kilometer']
            engine = form.cleaned_data['engine']
            transmission = form.cleaned_data['transmission'] 
            fuel = form.cleaned_data['fuel']
            nb_of_doors = form.cleaned_data['nb_of_doors']
            horsepower = form.cleaned_data['horsepower']

            # Preprocess the input data
            input_data = preprocess_input(form.cleaned_data)

            model_path = os.path.normpath(settings.MODEL_FILE_PATH)
            if not os.path.exists(model_path):
                return Response({'message': f'Model file not found: {model_path}'}, status=status.HTTP_404_NOT_FOUND)


            with open(settings.MODEL_FILE_PATH, 'rb') as f:
             lgbm = joblib.load(f)

            
            # Make prediction using the loaded model
            predicted_price = lgbm.predict([input_data])

            return Response({'predicted_price': predicted_price[0]}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


            
            
            
def preprocess_input(data):
    """
    Preprocess the input data. The data is expected to be a dictionary with the following keys:
    - year
    - kilometer
    - nb_of_doors
    - horsepower
    - fuel (one of 'flex fuel', 'gasoline', 'hybrid')
    - transmission (one of 'automatic', 'dual clutch', 'manual')
    """
    # Extract numerical features and convert them to float
    year = float(data['year'])
    kilometer = float(data['kilometer'])
    nb_of_doors = float(data['nb_of_doors'])
    horsepower = float(data['horsepower'])

    # One-hot encode the 'fuel' feature
    fuel_types = ['electric','flex fuel', 'gasoline', 'hybrid']
    fuel_encoded = [1 if data['fuel'] == fuel else 0 for fuel in fuel_types]

    # One-hot encode the 'transmission' feature
    transmission_types = ['automatic', 'dual clutch', 'manual']
    transmission_encoded = [1 if data['transmission'] == transmission else 0 for transmission in transmission_types]

    # Combine all features into a single array
    processed_data = [year, kilometer, nb_of_doors, horsepower] + fuel_encoded + transmission_encoded

    return processed_data
