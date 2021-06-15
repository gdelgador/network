
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("followings", views.followings, name="followings"),
    path("profile/<str:username>", views.profile, name="profile"),
    path('posts/<int:id>', views.posts, name='posts'),
    # Apis
    path('edit_posts/<int:id>', views.edit_posts, name='edit_posts'),
    path('compose', views.compose, name="compose" ),
    path('like',views.like_post, name="like")
]
