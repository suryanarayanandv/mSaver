from django.urls import path

from . import views

urlpatterns = [
    path("config", views.configure, name="config"),
    path("search", views.search, name="search")
]