from django.contrib import admin
from django.urls import path, include
from .views import User, UserListsCreate, UserRetrieveUpdateDelete
# search
from . import api

app_name = "111"

urlpatterns = [
    path('', UserListsCreate.as_view()),
]
