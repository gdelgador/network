
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("profile", views.profile, name="profile"),
    path("followings", views.followings, name="followings"),
    path('tweet', views.compose, name="tweet" ),
    path('posts', views.posts, name='posts')
]
