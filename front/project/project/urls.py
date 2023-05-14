from django.contrib import admin
from django.urls import path, include
from users.views import home1
from users.views import UserListsCreate, createform
from users.views import createform1

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home1),
    path('users/', include('users.urls', namespace="111")),
    path('createform/', createform, name='createform'),
    path('search/', createform1, name='search'),
]
