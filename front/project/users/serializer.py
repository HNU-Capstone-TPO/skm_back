from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'rink', 'gender', 'color', 'part',
                  'season', 'brand', 'image', 'price', 'youtube', 'tag', 'modelimage', 'b_name', 'y_name', 'blog')


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'rink', 'gender', 'color', 'part',
                  'season', 'brand', 'image', 'price', 'youtube', 'tag', 'modelimage', 'b_name', 'y_name', 'blog')


# 모자는 1~100 / 상의는 201~400 / 하의는 401~600 / 신발은 601~800 / 아우터는 801~1000
