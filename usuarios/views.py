from django.shortcuts import render, redirect
from django.contrib.auth import views as auth_views, authenticate, login
from .forms import CustomUserCreationForm

class CustomLoginView(auth_views.LoginView):
    template_name = 'main/login.html'

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('index')
    else:
        form = CustomUserCreationForm()
    return render(request, 'usuarios/register.html', {'form': form})
