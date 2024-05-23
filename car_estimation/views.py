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

            # Preprocess the input data for algerian model lgbm
            input_dataDZ = preprocess_inputDZ(form.cleaned_data)
            
            # American prediction with lgbm
            model_path = os.path.normpath(settings.MODEL_FILE_PATH)
            if not os.path.exists(model_path):
                return Response({'message': f'Model file not found: {model_path}'}, status=status.HTTP_404_NOT_FOUND)

            with open(settings.MODEL_FILE_PATH, 'rb') as f:
             lgbm = joblib.load(f)

            # Make prediction using the loaded american model
            predicted_price = lgbm.predict([input_data])
           
            # Algerian prediction with lgbm
            algerian_path = os.path.normpath(settings.ALGERIAN_MODEL_FILE_PATH)
            if not os.path.exists(algerian_path):
                return Response({'message': f'Model file not found: {algerian_path}'}, status=status.HTTP_404_NOT_FOUND)
            
            with open(settings.ALGERIAN_MODEL_FILE_PATH, 'rb') as k:
             algerian_model = joblib.load(k)

            # Make prediction using the loaded algerian model lgbm
            predicted_algerian_price = algerian_model.predict([input_dataDZ])


            #----------------------------------------------HISTBOOST----------------------------------------------------------
            bm_path = os.path.normpath(settings.BRAND_MAPPING_FILE_PATH)
            if not os.path.exists(bm_path):
                return Response({'message': f'Model file not found: {bm_path}'}, status=status.HTTP_404_NOT_FOUND)
            
            with open(settings.BRAND_MAPPING_FILE_PATH, 'rb') as bm:
             brand_mapping_smoothed = joblib.load(bm)
            
            fm_path = os.path.normpath(settings.FUEL_MAPPING_FILE_PATH)
            if not os.path.exists(fm_path):
                return Response({'message': f'Model file not found: {fm_path}'}, status=status.HTTP_404_NOT_FOUND)
            
            with open(settings.FUEL_MAPPING_FILE_PATH, 'rb') as fm:
             fuel_mapping_smoothed = joblib.load(fm)
            
            tm_path = os.path.normpath(settings.TRANSMISSION_MAPPING_FILE_PATH)
            if not os.path.exists(tm_path):
                return Response({'message': f'Model file not found: {tm_path}'}, status=status.HTTP_404_NOT_FOUND)
            
            with open(settings.TRANSMISSION_MAPPING_FILE_PATH, 'rb') as tm:
             transmission_mapping_smoothed = joblib.load(tm)
            

            # Preprocess the input data for algerian model histboost
            input_dataDZ_hist = preprocess_inputDZ_hist(form.cleaned_data,brand_mapping_smoothed,fuel_mapping_smoothed,transmission_mapping_smoothed)

            # Algerian prediction with histboost
            algerian_hist_path = os.path.normpath(settings.ALGERIAN_MODEL_HIST_FILE_PATH)
            if not os.path.exists(algerian_hist_path):
                return Response({'message': f'Model file not found: {algerian_hist_path}'}, status=status.HTTP_404_NOT_FOUND)
            
            with open(settings.ALGERIAN_MODEL_HIST_FILE_PATH, 'rb') as p:
             algerian_model_hist = joblib.load(p)

            # Make prediction using the loaded algerian model hist
            predicted_algerian_price_hist = algerian_model_hist.predict([input_dataDZ_hist])


            return Response({ 'predicted_american_price': predicted_price[0], 'predicted_algerian_price_lgbm': predicted_algerian_price[0],'predicted_algerian_price_hist': predicted_algerian_price_hist[0]}, status=status.HTTP_200_OK)

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




def preprocess_inputDZ_hist(data, brand_mapping, fuel_mapping, transmission_mapping):
    """
    Preprocess the input data. The data is expected to be a dictionary with the following keys:

    brand (target encoded)
    year
    kilometer
    horsepower
    fuel (target encoded)
    transmission (target encoded)

    The mappings for 'brand', 'fuel', and 'transmission' are expected to be dictionaries
    where keys are categories and values are the target encoded values.

    Returns:
    A list of preprocessed features.
    """


    # Define default values
    defaults = {
        'brand': 'audi',  # Assuming 'generic' is the default category for unknown brands
        'year': 2000,
        'kilometer': 0,
        'horsepower': 100,
        'fuel': 'essence',  # Assuming the default mapping for 'gasoline' is the mean target value
        'transmission': 'manuelle',  # Assuming the default mapping for 'manual' is the mean target value
        'engine' : 1.2
    }

    
    

    data['fuel'] = translate_fuel_type(data.get('fuel', defaults['fuel']))
    data['transmission'] = translate_transmission_type(data.get('transmission', defaults['transmission']))
    
    brand_encoded_smooth = brand_mapping.get(data.get('brand', defaults['brand']), brand_mapping[defaults['brand']])
    fuel_encoded_smooth = fuel_mapping.get(data.get('fuel', defaults['fuel']), fuel_mapping[defaults['fuel']])
    transmission_encoded_smooth = transmission_mapping.get(data.get('transmission', defaults['transmission']), transmission_mapping[defaults['transmission']])

    # Process numerical features as before
    year = float(data.get('year', defaults['year']))
    kilometer_log = np.log1p(float(data.get('kilometer', defaults['kilometer'])))
    engine = float(data.get('engine', defaults['engine']))
    horsepower_log = np.log1p(float(data.get('horsepower', defaults['horsepower'])))



    processed_data = [year, kilometer_log, engine, horsepower_log, fuel_encoded_smooth, transmission_encoded_smooth, brand_encoded_smooth]

    return processed_data



def translate_fuel_type(french_term):
    if french_term == 'diesel':
        return 'diesel'
    elif french_term == 'essence':
        return 'gasoline'
    elif french_term == 'gpl':
        return 'petrol'
    else:
        return 'unknown'
    


def translate_transmission_type(french_term):
    if french_term == 'manuelle':
        return 'manual'
    elif french_term == 'automatique':
        return 'automatic'
    elif french_term == 'semi automatique':
        return 'dual clutch'
    else:
        return 'unknown'
    
