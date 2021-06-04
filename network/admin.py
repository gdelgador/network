from network.views import register
from django.contrib import admin

# Register your models here.
from .models import Post, Like, Profile, User


admin.site.register(Post)
admin.site.register(Like)
admin.site.register(Profile)
admin.site.register(User)