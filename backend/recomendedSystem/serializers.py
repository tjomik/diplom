from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from recomendedSystem.models import CarModelModification, CarModelInstance


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class CarModelInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarModelInstance
        fields = '__all__'
        depth = 5




