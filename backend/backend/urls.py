from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('officers/create/', views.add_officer, name='add_officer'),
    path('officers/', views.get_officers, name='get_officers'),

]
