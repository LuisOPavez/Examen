# category/models.py
from django.db import models

class Category(models.Model):
    nombre = models.CharField(max_length=100, default='sin_categoria')  # Proporciona un valor predeterminado
    descripcion = models.TextField(default='sin_descripcion')  # Proporciona un valor predeterminado
    
    def __str__(self):
        return self.nombre

