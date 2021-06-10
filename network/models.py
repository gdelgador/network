# from network.views import profile
from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime

class User(AbstractUser):
    pass

class Profile(models.Model):
    target = models.ForeignKey('User', on_delete=models.CASCADE, related_name='folowers')
    follower = models.ForeignKey('User', on_delete=models.CASCADE, related_name='targets')

class Post(models.Model):
    content = models.CharField(max_length=255)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='author')
    date = models.DateTimeField(auto_now_add=True)
    liked = models.ManyToManyField('User', default=None, blank=True, related_name='post_likes')

    @property
    def num_likes(self):
        return self.liked.all().count()

    def serialize(self):

        return {
            'id': self.id,
            'content': self.content,
            'username': self.user.username,
            'date': self.date,
            'likes': self.num_likes
        }
    
    def __str__(self):
        return {
            'id': self.id,
            'content': self.content,
            'username': self.user.username,
            'date': self.date,
            'likes': self.num_likes
        }


class Like(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)


    def __str__(self):
        return str(self.post)