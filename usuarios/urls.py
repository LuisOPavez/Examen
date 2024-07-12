from django.urls import path
from django.contrib.auth import views as auth_views
from .views import CustomLoginView, register

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='/'), name='logout'),
]