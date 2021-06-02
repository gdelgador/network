from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

# class Tweet(models.Model):
#     id = models.IntegerField(primary_key=False)
#     pass