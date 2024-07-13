from django.urls import path
from . import views

urlpatterns = [
    path('', views.item_list, name='item_list'),
    path('create/', views.create_item, name='item_create'),
    path('<str:pk>/', views.item_detail, name='item_detail'),
    path('<str:pk>/edit/', views.update_item, name='item_update'),
    path('<str:pk>/delete/', views.delete_item, name='item_delete'),
]

