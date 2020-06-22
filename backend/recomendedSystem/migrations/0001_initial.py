# Generated by Django 3.0.5 on 2020-04-19 07:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CarModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Марка', models.CharField(max_length=50)),
                ('Модель', models.CharField(max_length=100)),
                ('Поколение', models.CharField(max_length=100)),
                ('Тип кузова', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='CarSpec',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Цена', models.FloatField()),
                ('Страна марки', models.CharField(max_length=20)),
                ('Класс автомобиля', models.CharField(max_length=1)),
                ('Количество дверей', models.IntegerField()),
                ('Количество мест', models.IntegerField()),
                ('Длина', models.IntegerField()),
                ('Ширина', models.IntegerField()),
                ('Высота', models.IntegerField()),
                ('Колёсная база', models.IntegerField()),
                ('Ширина передней колеи', models.IntegerField()),
                ('Ширина задней колеи', models.IntegerField()),
                ('Размер колёс', models.CharField(max_length=100)),
                ('Объем багажника мин, л', models.IntegerField()),
                ('Объем багажника макс, л', models.IntegerField()),
                ('Объём топливного бака, л', models.IntegerField()),
                ('Снаряженная масса, кг', models.IntegerField()),
                ('Полная масса, кг', models.IntegerField()),
                ('Количество передач', models.IntegerField()),
                ('Тип привода', models.CharField(max_length=10)),
                ('Тип передней подвески', models.CharField(max_length=50)),
                ('Тип задней подвески', models.CharField(max_length=50)),
                ('Передние тормоза', models.CharField(max_length=30)),
                ('Задние тормоза', models.CharField(max_length=30)),
                ('Максимальная скорость, км/ч', models.IntegerField()),
                ('Разгон до 100 км/ч, с', models.FloatField()),
                ('Марка топлива', models.CharField(max_length=15)),
                ('Экологический класс', models.CharField(max_length=10)),
                ('Выбросы CO2, г/км', models.IntegerField()),
                ('Тип двигателя', models.CharField(max_length=10)),
                ('Расположение двигателя', models.CharField(max_length=30)),
                ('Объем двигателя, см³', models.IntegerField()),
                ('Тип наддува', models.CharField(max_length=20)),
                ('Максимальная мощность, л.с./кВт при об/мин', models.CharField(max_length=100)),
                ('Максимальный крутящий момент, Н*м при об/мин', models.CharField(max_length=100)),
                ('Расположение цилиндров', models.CharField(max_length=30)),
                ('Количество цилиндров', models.IntegerField()),
                ('Число клапанов на цилиндр', models.IntegerField()),
                ('Степень сжатия', models.FloatField()),
                ('Диаметр цилиндра и ход поршня, мм', models.CharField(max_length=20)),
                ('Клиренс', models.IntegerField()),
                ('Система питания двигателя', models.CharField(max_length=80)),
                ('Расход топлива, л смешанный', models.FloatField()),
                ('Расход топлива, л трасса', models.FloatField()),
                ('Расход топлива, л город', models.FloatField()),
                ('Оценка безопасности', models.FloatField()),
                ('Название рейтинга', models.CharField(max_length=10)),
                ('Изображение', models.CharField(max_length=200)),
                ('Ссылка', models.CharField(max_length=150)),
                ('car_model', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recomendedSystem.CarModel')),
            ],
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Значение', models.IntegerField()),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recomendedSystem.CarSpec')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
