from django.contrib import admin
from . import models


admin.site.register(models.CarModel)
admin.site.register(models.CarModelModification)
admin.site.register(models.CarModelInstance)
admin.site.register(models.CarBody)
admin.site.register(models.CarGeneration)
admin.site.register(models.CarMake)
admin.site.register(models.Rating)
admin.site.register(models.Recommendation)
admin.site.register(models.ParameterGroup)
admin.site.register(models.Parameter)
admin.site.register(models.ParameterValue)
