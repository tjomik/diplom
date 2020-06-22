# Generated by Django 3.0.5 on 2020-05-21 13:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recomendedSystem', '0010_auto_20200520_2131'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recommendation',
            name='model1',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='model', to='recomendedSystem.CarModelModification'),
        ),
        migrations.AlterField(
            model_name='recommendation',
            name='model2',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recommendation_model', to='recomendedSystem.CarModelModification'),
        ),
    ]