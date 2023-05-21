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
    path('evidence/<str:case_id>/', views.get_evidence_by_case,
         name="get_evidence_by_case"),
    path('case/create/', views.add_case, name="add_case"),
    path('case/<str:case_id>/', views.get_case, name="get_case"),
    path('case/', views.get_all_cases, name="get_all_cases"),
    path('case/update/<str:case_id>/', views.update_case, name="update_case"),
    path('fir/create/', views.add_fir, name="add_fir"),
    path('complaint/create/', views.add_complaint, name="add_complaint"),
    path('civilian/create/', views.add_civilian, name="add_civilian")
]
