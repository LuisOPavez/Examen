# Generated by Django 5.0.7 on 2024-07-13 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0005_remove_item_categoria'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='sensitive_data',
            field=models.CharField(default='', max_length=500),
        ),
    ]
