# views.py
from django.shortcuts import render , redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .forms import CarPricePredictionForm
from .models import Car
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.shortcuts import render
from django.http import HttpResponse
import csv

class MyAPIView(APIView):
   @swagger_auto_schema(
        operation_summary="Estimate car price",
        operation_description="Estimate the price of a car based on its brand, model, year, mileage, transmission, engine_type, fuel_type.",
        responses={200: "Success", 400: "Bad request", 404: "Not found"},
    )
   
   def get(self, request):
        return Response({'message': 'Send a POST request with car details to estimate the price.'})

   @swagger_auto_schema(
        operation_summary="Estimate car price",
        operation_description="Estimate the price of a car based on its brand, model, year, mileage, transmission, engine_type, fuel_type.",
        responses={200: "Success", 400: "Bad request", 404: "Not found"},
    )
   
   def post(self, request):
        try:
            # Validation of the form data
            form = CarPricePredictionForm(request.data)
            if not form.is_valid():
                return Response({'message': 'Invalid form data.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Cleaned form data
            brand = form.cleaned_data['brand']
            model = form.cleaned_data['model'] 
            engine_type = form.cleaned_data['engine_type']
            nb_of_doors = form.cleaned_data['nb_of_doors']
            year = form.cleaned_data['year']
            transmission = form.cleaned_data['transmission'] 
            fuel_type = form.cleaned_data['fuel_type']
            driven_kilometer = form.cleaned_data['driven_kilometer']

            # Read data from CSV file
            csv_file_path = 'public/newdata.csv '  
            car_data = []

            with open(csv_file_path, mode='r', encoding='utf-8-sig') as file:
                csv_reader = csv.DictReader(file, fieldnames=['brand', 'model', 'engine', 'nb of doors', 'year', 'transmission', 'price', 'fuel', 'kilometer'])
                for row in csv_reader:
                    car_data.append(row) 
                
            matching_car = None
           
            for car in car_data:
               if(
                   car['brand'].lower() == brand.lower() and  # Case-insensitive comparison
                   car['model'].lower() == model.lower() and
                   car['engine'].lower() == engine_type.lower() and
                   car['nb of doors'] == nb_of_doors.lower() and
                   int(car['year']) == year and
                   car['transmission'].lower() == transmission.lower() and
                   car['fuel'].lower() == fuel_type.lower() and
                   car['kilometer'] == driven_kilometer.lower() 
                ):
                matching_car = car   
                break
               
               
            if matching_car:
                # Perform machine learning prediction using the car data
                # Example predicted price
                predicted_price = matching_car['price']  
                return Response({'predicted_price': predicted_price}, status=status.HTTP_200_OK)
            else:
                # Case when car is not found in the database
                return Response({'message': 'Car not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            # Handle any exceptions and return an error response
            return Response({'message': f'Error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

'''
#THIS FUNCTION IS USELESS, CREATED FOR TESTING ONLY !!! 
def predict_car_price(brand, model, year, mileage, transmission, engine_type, fuel_type):
    # Simulate machine learning model prediction 
    return 20000  # Example estimated price
'''


