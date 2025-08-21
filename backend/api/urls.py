from django.urls import path
from django.urls import path
from . import views

urlpatterns = [
    # path("elderly/", views.list_elderly, name="list_elderly"),
    # path("elderly/add/", views.add_elderly, name="add_elderly"),
    # path("guardians/", views.list_guardians, name="list_guardians"),
    #


#p1
    path("guardian/register/", views.register_guardian, name="register_guardian"),
    path("elderly/register/", views.register_elderly, name="register_elderly"),
    path('add_elderly_by_guardian/', views.add_elderly_by_guardian, name="add_elderly_by_guardian"),
    path('add_medication/', views.add_medication, name="add_medication"),
    path('elderly/<str:elder_id>/medications/', views.get_elderly_medications, name='get_elderly_medications'),
    path('medications/status/', views.update_medication_status, name="medication_status"),
    path('guardian/<str:guardian_id>/elderly_count/', views.get_guardian_elderly_count, name='guardian_elderly_count'),
    path('guardian/login/', views.login, name='login_guardian'),
    path('elderly/login/', views.login, name='login_elderly')



#p2
    # path("medications/add/", views.add_medication, name="add_medication"),
#p3
    # path("elderly/<uuid:elderly_id>/medications/", views.list_medications, name="list_medications"),


]
