from django.urls import path
from . import views

urlpatterns = [
    path('detalle/', views.cart_detail, name='compras'),
]