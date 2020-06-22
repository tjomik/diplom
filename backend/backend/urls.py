"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

from backend import settings
from recomendedSystem import views

urlpatterns = [
    path('admin', admin.site.urls),
    path('api/token', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/sign_up', views.SignUpView.as_view()),
    path('api/change_password', views.ChangePasswordView.as_view()),
    path('api/cars', views.GetCarsView.as_view()),
    path('api/car/<model_id>', views.ModelView.as_view()),
    path('api/user_ratings', views.UsersRatedCarView.as_view()),
    path('api/set_rating', views.SetRatingView.as_view()),
    path('api/search/<search_text>', views.LiveSearch.as_view()),

              ] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
