from django.shortcuts import render
from items.models import Item

def index(request):
    productos_destacados = Item.objects.filter(destacado=True)
    return render(request, 'main/index.html', {'productos_destacados': productos_destacados})


def home(request):
    return render(request, 'main/home.html')
