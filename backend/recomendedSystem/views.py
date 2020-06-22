import operator
from functools import reduce

import jwt
from django.contrib.auth.models import User
from django.db.models import Q
from django.http.response import HttpResponse, JsonResponse

from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenViewBase

from recomendedSystem.models import Rating, CarModelModification, CarModelInstance, ParameterValue, Recommendation
from recomendedSystem.serializers import CarModelInstanceSerializer, MyTokenObtainPairSerializer


class SignUpView(APIView):

    def post(self, request):
        response_dict = {}
        if User.objects.filter(username=request.data['username']).exists():
            response_dict['message'] = 'Пользователь с таким логином уже существует'
        else:
            try:
                new_user = User.objects.create_user(
                    username=request.data['username'],
                    password=request.data['password']
                )
                new_user.save()
                response_dict['message'] = 'Успешно создан'
            except:
                response_dict['message'] = 'Что-то пошло не так'
        return JsonResponse(response_dict, safe=False)


class ChangePasswordView(APIView):
    def post(self, request):
        decoded_jwt = jwt.decode(request.headers['Authorization'][7:], verify=False)
        user = User.objects.get(id=decoded_jwt['user_id'])
        if user.check_password(request.data['old_password']):
            user.set_password(request.data['new_password'])
            user.save()
            return JsonResponse({'message': 'Новый пароль успешно установлен'})
        else:
            return JsonResponse({'message': 'Введен неправильный пароль'})


class GetCarsView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = CarModelInstance.objects.all()
    serializer_class = CarModelInstanceSerializer


class ModelView(APIView):

    permission_classes = [AllowAny]

    def get(self, request, model_id):
        decoded_jwt = jwt.decode(request.headers['Authorization'][7:], verify=False)

        model_instance = CarModelInstance.objects.get(id=model_id)
        response_dict = {'make': model_instance.generation.model.make.make_name,
                         'model': model_instance.generation.model.model_name,
                         'generation': model_instance.generation.generation_name,
                         'car_body': model_instance.car_body.type,
                         'image': model_instance.image,
                         'country': model_instance.generation.model.make.country,
                         'link': model_instance.link,
                         'auto_class': model_instance.auto_class,
                         'door_quantity': model_instance.door_quantity,
                         'number_of_seats': model_instance.number_of_seats,
                         'modifications': {},
                         'recommendations': {}
                         }

        model_modifications = CarModelModification.objects.filter(car_model_instance=model_instance)

        for model_modification in model_modifications:
            parameters = ParameterValue.objects.filter(Q(car_model_modification=model_modification) & ~Q(parameter__parameter_name='Цена'))
            response_dict['modifications'][model_modification.id] = {}

            for parameter in parameters:
                if parameter.parameter.parameter_group.parameter_group_name not in response_dict['modifications'][model_modification.id]:
                    response_dict['modifications'][model_modification.id][parameter.parameter.parameter_group.parameter_group_name] = {}
                if parameter.value.__contains__('.') and not parameter.value.__contains__(' ') and not parameter.parameter.parameter_name.__contains__('Расход') and not parameter.parameter.parameter_name.__contains__('Разгон'):
                    response_dict['modifications'][model_modification.id][parameter.parameter.parameter_group.parameter_group_name][parameter.parameter.parameter_name] = int(float(parameter.value))
                else:
                    response_dict['modifications'][model_modification.id][parameter.parameter.parameter_group.parameter_group_name][parameter.parameter.parameter_name] = parameter.value
            recommendations = Recommendation.objects.filter(model1=model_modification)
            recommendation_dict = {}
            response_dict['recommendations'][model_modification.id] = []
            for recommendation in recommendations:
                recommendation_model = CarModelInstance.objects.get(car_model_modifications__id=recommendation.model2_id)
                recommendation_dict = {
                         'id': recommendation_model.id,
                         'make': recommendation_model.generation.model.make.make_name,
                         'model': recommendation_model.generation.model.model_name,
                         'generation': recommendation_model.generation.generation_name,
                         'car_body': recommendation_model.car_body.type,
                         'image': recommendation_model.image}
                response_dict['recommendations'][model_modification.id].append(recommendation_dict)
        ratings = Rating.objects.filter(user_id=decoded_jwt['user_id'], car_model_modification__car_model_instance=model_id)
        ratings_dict = {}
        for rating in ratings:
            ratings_dict[rating.car_model_modification.id] = rating.value
        response_dict['ratings'] = ratings_dict

        prices = ParameterValue.objects.filter(parameter__parameter_name='Цена', car_model_modification__car_model_instance_id=model_id)
        prices_dict = {}
        for price in prices:
            prices_dict[price.car_model_modification.id] = price.value
        response_dict['prices'] = prices_dict

        return JsonResponse(response_dict, safe=False)


class RatingsForCarModel(APIView):
    permission_classes = [AllowAny]

    def get(self, request, car_id):
        decoded_jwt = jwt.decode(request.headers['Authorization'][7:], verify=False)
        ratings = {}

        for x in Rating.objects.values().filter(user_id=decoded_jwt['user_id'], car__car_model_id=car_id):
            ratings[x['car_id']] = x

        return JsonResponse(ratings, safe=False)


class SetRatingView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        decoded_jwt = jwt.decode(request.headers['Authorization'][7:], verify=False)

        rating, created = Rating.objects.get_or_create(car_model_modification_id=request.data['id'], user_id=decoded_jwt['user_id'])
        rating.value = request.data['value']
        rating.save()

        return HttpResponse(status=200)


class UsersRatedCarView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        decoded_jwt = jwt.decode(request.headers['Authorization'][7:], verify=False)
        ratings = Rating.objects.filter(user_id=decoded_jwt['user_id'])
        response_dict = {}
        for rating in ratings:
            if rating.car_model_modification.car_model_instance.id not  in response_dict.keys():
                ratings_dict = {'id': rating.car_model_modification.car_model_instance.id,
                                 'make': rating.car_model_modification.car_model_instance.generation.model.make.make_name,
                                 'model': rating.car_model_modification.car_model_instance.generation.model.model_name,
                                 'generation': rating.car_model_modification.car_model_instance.generation.generation_name,
                                 'car_body': rating.car_model_modification.car_model_instance.car_body.type,
                                 'image': rating.car_model_modification.car_model_instance.image}
                response_dict[rating.car_model_modification.car_model_instance.id] = ratings_dict

        return JsonResponse(response_dict, safe=False)


class MyTokenObtainPairView(TokenViewBase):
    serializer_class = MyTokenObtainPairSerializer


class LiveSearch(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CarModelInstanceSerializer

    def get_queryset(self):
        search_text = self.kwargs['search_text']
        search_text_list = search_text.split(' ')
        search_text_list = [x for x in search_text_list if x != '']
        querysets = []
        querysets.append(CarModelInstance.objects.filter(reduce(operator.or_, (Q(generation__model__make__make_name__contains=item) for item in search_text_list))))
        querysets.append(CarModelInstance.objects.filter(reduce(operator.or_, (Q(generation__model__model_name=item) for item in search_text_list))))
        querysets.append(CarModelInstance.objects.filter(reduce(operator.or_, (Q(generation__generation_name=item) for item in search_text_list))))
        querysets.append(CarModelInstance.objects.filter(reduce(operator.or_, (Q(car_body__type=item) for item in search_text_list))))

        querysets = [x for x in querysets if len(x) != 0]
        if querysets:
            queryset = querysets.pop()

            queryset = queryset.intersection(*querysets)
            return queryset
        return []


