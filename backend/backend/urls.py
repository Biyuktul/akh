from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path('auth/login/', views.login_view, name='login_view'),
    path('admin/', admin.site.urls),
    path('officers/create/', views.add_officer, name='add_officer'),
    path('officers/', views.get_officers, name='get_officers'),
    path('officers/officers-per-month/',
         views.officers_per_month, name='officers-per-month'),
    path('officers/<str:id>/', views.update_officer),
    path('update-officer-privileges/', views.update_officer_privileges,
         name='update_officer_privileges'),
    path('privileges/<str:id>/', views.get_privilages, name="get_privilages")
]
