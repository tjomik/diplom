from recomendedSystem.models import ParameterGroup, Parameter, CarMake, CarModel, CarGeneration, CarBody, \
    CarModelInstance, CarModelModification, ParameterValue, Recommendation
from ast import literal_eval

import os


def change_images_name(data):
    for x in range(data.shape[0]):
        try:
            current_name = (data.at[x, 'Марка'] + data.at[x, 'Модель'] + data.at[x, 'Поколение'] + data.at[x, 'Тип кузова']).replace('/', '') + '.png'
            print(current_name)
            os.rename(r'../static/cars/'+current_name, r'../static/cars/'+str(x)+'.png')
            for y in data.loc[(data['Марка'] == data.at[x, 'Марка']) & (data['Модель'] == data.at[x, 'Модель']) & (data['Поколение'] == data.at[x, 'Поколение']) & (data['Тип кузова'] == data.at[x, 'Тип кузова'])].index:
                data.at[y, 'Изображение'] = str(x)+'.png'
    
        except:
            print((data.at[x, 'Марка'] + data.at[x, 'Модель'] + data.at[x, 'Поколение'] + data.at[x, 'Тип кузова']).replace('/', '') + '.png')
    
    data.to_csv('data_with_images.csv')


def create_parameters():
    col_dict1 = {
        "Цена": "Общая информация",
        "Класс автомобиля": "Общая информация",
        "Количество дверей": "Общая информация",
        "Количество мест": "Общая информация",
        "Длина": "Размеры",
        "Ширина": "Размеры",
        "Высота": "Размеры",
        "Колёсная база": "Размеры",
        "Ширина передней колеи": "Размеры",
        "Ширина задней колеи": "Размеры",
        "Размер колёс": "Размеры",
        "Объём топливного бака, л": "Объём и масса",
        "Снаряженная масса, кг": "Объём и масса",
        "Полная масса, кг": "Объём и масса",
        "Коробка передач": "Трансмиссия",
        "Количество передач": "Трансмиссия",
        "Тип привода": "Трансмиссия",
        "Тип передней подвески": "Подвеска и тормоза",
        "Тип задней подвески": "Подвеска и тормоза",
        "Передние тормоза": "Подвеска и тормоза",
        "Задние тормоза": "Подвеска и тормоза",
        "Максимальная скорость, км/ч": "Эксплуатационные показатели",
        "Разгон до 100 км/ч, с": "Эксплуатационные показатели",
        "Марка топлива": "Эксплуатационные показатели",
        "Экологический класс": "Эксплуатационные показатели",
        "Выбросы CO2, г/км": "Эксплуатационные показатели",
        "Тип двигателя": "Двигатель",
        "Расположение двигателя": "Двигатель",
        "Объем двигателя, см³": "Двигатель",
        "Тип наддува": "Двигатель",
        "Максимальная мощность, л.с./кВт при об/мин": "Двигатель",
        "Максимальный крутящий момент, Н*м при об/мин": "Двигатель",
        "Расположение цилиндров": "Двигатель",
        "Количество цилиндров": "Двигатель",
        "Число клапанов на цилиндр": "Двигатель",
        "Степень сжатия": "Двигатель",
        "Диаметр цилиндра и ход поршня, мм": "Двигатель",
        "Клиренс": "Размеры",
        "Система питания двигателя": "Двигатель",
        "Расход топлива, л смешанный": "Эксплуатационные показатели",
        "Оценка безопасности": "Безопасность",
        "Название рейтинга": "Безопасность",
        "Расход топлива, л трасса": "Эксплуатационные показатели",
        "Расход топлива, л город": "Эксплуатационные показатели",
        "Объем багажника мин, л": "Объём и масса",
        "Объем багажника макс, л": "Объём и масса"
    }

    for key in col_dict1.keys():
        group = ParameterGroup.objects.get(parameter_group_name=col_dict1[key])
        parameter = Parameter.objects.create(parameter_name=key, parameter_group=group)


def dataset_to_database(data):
    for index in range(data.shape[0]):
        make, created = CarMake.objects.get_or_create(make_name=data.at[index, 'Марка'], country=data.at[index, 'Страна марки'])
        model, created = CarModel.objects.get_or_create(model_name=data.at[index, 'Модель'], make=make)
        generation, created = CarGeneration.objects.get_or_create(generation_name=data.at[index, 'Поколение'], model=model)
        car_body, created = CarBody.objects.get_or_create(type=data.at[index, 'Тип кузова'])
        car_model_instance, created = CarModelInstance.objects.get_or_create(image=data.at[index, 'Изображение'], link=data.at[index, 'Ссылка'], generation=generation, car_body=car_body)
        car_model_modification = CarModelModification.objects.create(id=index, car_model_instance=car_model_instance)

        parameters = Parameter.objects.all()

        for parameter in parameters:
            if data.at[index, parameter.__dict__['parameter_name']]:
                parameter_value = ParameterValue.objects.create(value=data.at[index, parameter.__dict__['parameter_name']], parameter=parameter, car_model_modification=car_model_modification)


def add_recommendations(data):
    for index in range(data.shape[0]):
        make = CarMake.objects.get(make_name=data.at[index, 'Марка'],
                                                      country=data.at[index, 'Страна марки'])
        model = CarModel.objects.get(model_name=data.at[index, 'Модель'], make=make)
        generation = CarGeneration.objects.get(generation_name=data.at[index, 'Поколение'],
                                                                  model=model)
        car_body = CarBody.objects.get(type=data.at[index, 'Тип кузова'])
        car_model_instance = CarModelInstance.objects.get(generation=generation, car_body=car_body)
        car_model_instance.image = data.at[index, 'Изображение']
        car_model_instance.save()

        for recommendation in literal_eval(data.at[index, 'Рекомендации']):
            recommend = Recommendation.objects.create(model1_id=index, model2_id=recommendation)


def delete_nan_from_parameters(data):
    for index in range(data.shape[0]):
        make = CarMake.objects.get(make_name=data.at[index, 'Марка'],
                                                      country=data.at[index, 'Страна марки'])
        model = CarModel.objects.get(model_name=data.at[index, 'Модель'], make=make)
        generation = CarGeneration.objects.get(generation_name=data.at[index, 'Поколение'],
                                                                  model=model)
        car_body = CarBody.objects.get(type=data.at[index, 'Тип кузова'])
        car_model_instance = CarModelInstance.objects.get(generation=generation, car_body=car_body)
        car_model_instance.auto_class = data.at[index, 'Класс автомобиля']
        car_model_instance.door_quantity = data.at[index, 'Количество дверей']
        car_model_instance.number_of_seats = data.at[index, 'Количество мест']
        car_model_instance.save()
        car_model_modification = CarModelModification.objects.get(id=index)
        if data.at[index, 'Цена'] != 'nan':
            parameter = Parameter.objects.get(parameter_name='Цена')
            ParameterValue.objects.create(car_model_modification=car_model_modification, value=data.at[index, 'Цена'], parameter=parameter)



