from django.shortcuts import render, redirect
from django.contrib.auth import views as auth_views
from .forms import CustomUserCreationForm

class CustomLoginView(auth_views.LoginView):
    template_name = 'main/login.html'

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            # Redirigir al login después de un registro exitoso
            return redirect('login')
    else:
        form = CustomUserCreationForm()
    return render(request, 'main/register.html', {'form': form})
