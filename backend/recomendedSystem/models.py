from django.contrib.auth.models import User
from django.db import models


class CarMake(models.Model):
    make_name = models.CharField(max_length=50, verbose_name='Марка')
    country = models.CharField(max_length=40, verbose_name='Страна марки', null=True, blank=True)


class CarModel(models.Model):
    model_name = models.CharField(max_length=100, verbose_name='Модель')
    make = models.ForeignKey(CarMake, on_delete=models.CASCADE)


class CarGeneration(models.Model):
    generation_name = models.CharField(max_length=100, verbose_name='Поколение')
    model = models.ForeignKey(CarModel, on_delete=models.CASCADE)


class CarBody(models.Model):
    type = models.CharField(max_length=30, verbose_name='Тип кузова')


class CarModelInstance(models.Model):
    image = models.CharField(max_length=200, verbose_name='Изображение', null=True, blank=True)
    link = models.CharField(max_length=150, verbose_name='Ссылка', null=True, blank=True)
    generation = models.ForeignKey(CarGeneration, on_delete=models.CASCADE)
    car_body = models.ForeignKey(CarBody, on_delete=models.CASCADE)
    auto_class = models.CharField(max_length=1, verbose_name='Класс автомобиля', null=True, blank=True)
    door_quantity = models.IntegerField(verbose_name='Количество дверей', null=True, blank=True)
    number_of_seats = models.IntegerField(verbose_name='Количество мест', null=True, blank=True)


class CarModelModification(models.Model):
    id = models.IntegerField(primary_key=True)
    car_model_instance = models.ForeignKey(CarModelInstance, on_delete=models.CASCADE, related_name='car_model_modifications')


class Recommendation(models.Model):
    model1 = models.ForeignKey(CarModelModification, on_delete=models.CASCADE, related_name='model')
    model2 = models.ForeignKey(CarModelModification, on_delete=models.CASCADE, related_name='recommendation_model')


class ParameterGroup(models.Model):
    parameter_group_name = models.CharField(max_length=50, verbose_name='Название', null=True, blank=True)

    def __str__(self):
        return self.parameter_group_name


class Parameter(models.Model):
    parameter_name = models.CharField(max_length=70, verbose_name='Название', null=True, blank=True)
    parameter_group = models.ForeignKey(ParameterGroup, on_delete=models.CASCADE)

    def __str__(self):
        return self.parameter_name


class ParameterValue(models.Model):
    value = models.CharField(max_length=100, verbose_name='Значение', null=True, blank=True)
    parameter = models.ForeignKey(Parameter, on_delete=models.CASCADE)
    car_model_modification = models.ForeignKey(CarModelModification, on_delete=models.CASCADE, related_name='parameters')


class Rating(models.Model):
    car_model_modification = models.ForeignKey(to=CarModelModification, on_delete=models.CASCADE)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    value = models.IntegerField(verbose_name='Значение', blank=True, null=True)
