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


class MyAPIView(APIView):
    @swagger_auto_schema(
        operation_summary="Summary of the MyAPIView GET operation",
        operation_description="Description of the MyAPIView GET operation",
        responses={200: "Success"},
    )
    def get(self, request):
        # Handle GET request
        data = {'messagenaila': 'This is a GET request'}
        return Response(data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Summary of the MyAPIView POST operation",
        operation_description="Description of the MyAPIView POST operation",
        responses={201: "Created"},
    )
    def post(self, request):
        # Handle POST request
        data = {'message': 'This is a POST request'}
        return Response(data, status=status.HTTP_201_CREATED)

#THIS FUNCTION IS USELESS, CREATED FOR TESTING ONLY !!! 
def predict_car_price(brand, model, year, mileage, transmission, engine_type, fuel_type):
    # Simulate machine learning model prediction 
    return 20000  # Example estimated price

def index(request):
    if request.method == 'POST':
        form = CarPricePredictionForm(request.POST)
        if form.is_valid():
            # Process the form data
            brand = form.cleaned_data['brand']
            model = form.cleaned_data['model']
            year = form.cleaned_data['year']
            mileage = form.cleaned_data['mileage']
            transmission = form.cleaned_data['transmission']
            engine_type = form.cleaned_data['engine_type']
            fuel_type = form.cleaned_data['fuel_type']

            # (save to database)

             # Simulate prediction using a the function simulating a trained machine learning model
            estimated_price = predict_car_price(brand, model, year, mileage, transmission, engine_type, fuel_type)
            
             # Render the success page with the form data and estimated price
            return render(request, 'success.html', {'form_data': form.cleaned_data, 'estimated_price': estimated_price})        
    else:
        form = CarPricePredictionForm()
  
    return render(request, 'index.html', {'form': form})



