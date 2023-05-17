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
    path('privileges/<str:id>/', views.get_privilages, name="get_privilages"),
    path('evidence/create/', views.add_evidence, name="add_evidence"),
    path('victim/create/', views.add_victim, name="add_victim"),
    path('victims/', views.get_victims, name="get_victims"),
    path('suspect/create/', views.add_suspect, name="add_suspect"),
    path('suspects/', views.get_suspects, name="get_suspects"),
    path('case/create/', views.add_case, name="add_case"),
    path('cases/', views.get_cases, name="get_cases"),
    path('witness/create/', views.get_witness, name='get_witness'),
    path('witness/', views.add_witness, name='add_witness'),
]
