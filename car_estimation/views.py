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
from sklearn.preprocessing import LabelEncoder

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

            # Preprocess the input data for american model
            input_data = preprocess_input(form.cleaned_data)
            # Preprocess the input data for algerian model
            input_dataDZ = preprocess_inputDZ(form.cleaned_data)

            model_path = os.path.normpath(settings.MODEL_FILE_PATH)
            if not os.path.exists(model_path):
                return Response({'message': f'Model file not found: {model_path}'}, status=status.HTTP_404_NOT_FOUND)

            with open(settings.MODEL_FILE_PATH, 'rb') as f:
             lgbm = joblib.load(f)

            # Make prediction using the loaded american model
            predicted_price = lgbm.predict([input_data])
           
            # Algerian prediction 
            algerian_path = os.path.normpath(settings.ALGERIAN_MODEL_FILE_PATH)
            if not os.path.exists(algerian_path):
                return Response({'message': f'Model file not found: {model_path}'}, status=status.HTTP_404_NOT_FOUND)
            
            with open(settings.ALGERIAN_MODEL_FILE_PATH, 'rb') as k:
             algerian_model = joblib.load(k)

            # Make prediction using the loaded algerian model
            predicted_algerian_price = algerian_model.predict([input_dataDZ])


            return Response({ 'predicted_american_price': predicted_price[0], 'predicted_algerian_price': predicted_algerian_price[0]}, status=status.HTTP_200_OK)

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




def preprocess_inputDZ(data):
    """
    Preprocess the input data. The data is expected to be a dictionary with the following keys:
    year
    kilometer
    nb_of_doors (not used)
    horsepower
    fuel (one of 'diesel', 'gasoline', 'petrol')
    transmission (one of 'automatic', 'manual', 'dual clutch')
    Returns:
    A list of preprocessed features.
    """


    # Define default values
    defaults = {
        'year': 2000,
        'kilometer': 0,
        'nb_of_doors': 4,  # Not needed but kept for completeness
        'horsepower': 100,
        'fuel': 'gasoline',
        'transmission': 'manual',
        'engine' : 1.2
    }

    # Extract and preprocess numerical features
    year = float(data.get('year', defaults['year']))
    kilometer = np.log1p(float(data.get('kilometer', defaults['kilometer'])))
    horsepower = np.log1p(float(data.get('horsepower', defaults['horsepower'])))
    engine = float(data.get('engine', defaults['engine']))

    # Label encode the 'fuel' feature
    fuel_mapping = {'diesel': 0, 'gasoline': 1, 'petrol': 2}
    fuel = data.get('fuel', defaults['fuel'])
    fuel_encoded = fuel_mapping.get(fuel, fuel_mapping['gasoline'])

    # Label encode the 'transmission' feature
    transmission_mapping = {'automatic': 0, 'manual': 1, 'dual clutch': 2}
    transmission = data.get('transmission', defaults['transmission'])
    transmission_encoded = transmission_mapping.get(transmission, transmission_mapping['manual'])

    # Combine all features into a single array
    processed_dataDZ = [year, kilometer,fuel_encoded, transmission_encoded, engine, horsepower ]

    return processed_dataDZ