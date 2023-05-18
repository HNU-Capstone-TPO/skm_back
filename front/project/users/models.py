from django.contrib.postgres.fields import ArrayField
from django.db import models

# user -> id(IntegerField), name(CharField), gender(CharField)
# Create your models here.


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, blank=True)
    rink = models.URLField(max_length=1024, blank=True)
    image = models.CharField(max_length=1024, blank=True)
    modelimage = models.CharField(max_length=1024, blank=True)
    gender = ArrayField(models.CharField(max_length=20), blank=True)
    color = ArrayField(models.CharField(max_length=20), blank=True)
    part = models.CharField(max_length=20, blank=True)
    season = ArrayField(models.CharField(max_length=20), blank=True)
    brand = ArrayField(models.CharField(max_length=20), blank=True)
    price = models.IntegerField(default=0, blank=True)
    tag = ArrayField(models.CharField(max_length=100), blank=True)
    youtube = models.URLField(max_length=1024, blank=True)
    blog = models.URLField(max_length=1024, blank=True)
    y_name = models.CharField(max_length=255, blank=True)
    b_name = models.CharField(max_length=255, blank=True)
    score = models.IntegerField(default=0)