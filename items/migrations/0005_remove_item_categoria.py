# Generated by Django 5.0.7 on 2024-07-13 03:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0004_alter_item_categoria_alter_item_tipo_articulo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='categoria',
        ),
    ]
