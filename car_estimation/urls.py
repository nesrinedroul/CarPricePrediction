# urls.py
from django.urls import path
from django.urls import re_path as url
from rest_framework import permissions
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView
from . import views



# Define URL patterns
urlpatterns = [
    path('', views.index, name='index'),  # URL pattern for the index view
    path('api/myview/', views.MyAPIView.as_view(), name='my-api-view'),  # URL pattern for MyAPIView
    # URL patterns for Swagger UI and ReDoc
    path('api_schema/', get_schema_view(title='API Schemas', description = 'Guide for REST API'), name= 'api_schema'),
    # idk about this one path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('swagger-ui/', TemplateView.as_view(  template_name='docs.html', extra_context={'schema_url':'api_schema'} ), name='swagger-ui'),
    path('success/', views.index, name='success_page'),
]
