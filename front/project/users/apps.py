import os
from django.db import models
from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    
    def ready(self):
        super().ready()
        from .views import create_nodes_from_csv
        # CSV 파일의 경로
        csv_path = "C:/Users/sin15/OneDrive/바탕 화면/n_data.csv"
        # 노드 생성 함수 호
        create_nodes_from_csv(csv_path)
