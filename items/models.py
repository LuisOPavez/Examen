from cryptography.fernet import Fernet
from django.conf import settings
from django.db import models
from django.urls import reverse
from category.models import Category

# Usa la clave de cifrado almacenada en settings
cipher_suite = Fernet(settings.FERNET_KEY)

class Item(models.Model):
    item = models.CharField(primary_key=True, max_length=8, editable=False, default='00000000')
    nombre = models.CharField(max_length=20, default='sin_nombre')
    tipo_articulo = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='tipo_articulo_items', default=1)
    marca = models.CharField(max_length=20, default='sin_marca')
    precio = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    descuento = models.DecimalField(max_digits=5, decimal_places=2, default=0, help_text="Descuento en porcentaje")
    precio_desc = models.DecimalField(max_digits=20, decimal_places=2, editable=False)
    smart = models.BooleanField(default=False)
    color = models.CharField(max_length=20, default='sin_color')
    material = models.CharField(max_length=20, default='sin_material')
    imagen = models.ImageField(upload_to='imagenes/', default='imagenes/default.jpg')
    descripcion = models.CharField(max_length=500, default='Descripción no disponible')
    destacado = models.BooleanField(default=False)
    url = models.CharField(max_length=100, default='default-url')
    sensitive_data = models.CharField(max_length=500, default='')  # Campo para datos sensibles

    def save(self, *args, **kwargs):
        if self.item == '00000000' or not self.item:
            last_item = Item.objects.all().order_by('item').last()
            if not last_item:
                self.item = '00000001'
            else:
                item_int = int(last_item.item)
                new_item_int = item_int + 1
                self.item = f'{new_item_int:08d}'
        self.precio_desc = self.precio - (self.precio * (self.descuento / 100))
        
        # Cifrar datos sensibles antes de guardar
        if self.sensitive_data:
            self.sensitive_data = cipher_suite.encrypt(self.sensitive_data.encode()).decode()
        
        super(Item, self).save(*args, **kwargs)

    def get_sensitive_data(self):
        # Descifrar datos sensibles antes de devolverlos
        if self.sensitive_data:
            return cipher_suite.decrypt(self.sensitive_data.encode()).decode()
        return ''

    def __str__(self):
        return self.nombre

    def get_absolute_url(self):
        return reverse('item_list', args=[str(self.pk)])

    def get_detail_url(self):
        return reverse('item_detail', args=[str(self.pk)])

    def formatted_precio(self):
        return "${:,.0f}".format(self.precio).replace(',', '.')

    def formatted_precio_desc(self):
        return "${:,.0f}".format(self.precio_desc).replace(',', '.')
