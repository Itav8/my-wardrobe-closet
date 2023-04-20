# Generated by Django 4.0.3 on 2023-04-20 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hats_rest', '0004_remove_locationvo_import_href_remove_locationvo_name_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='locationvo',
            options={'ordering': ('closet_name', 'section_number', 'shelf_number')},
        ),
        migrations.AlterField(
            model_name='hat',
            name='picture_url',
            field=models.URLField(default='', max_length=2000),
        ),
    ]
