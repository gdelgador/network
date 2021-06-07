from datetime import datetime
from django.contrib.auth import authenticate, login, logout
from django.core import paginator
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, response
from django.shortcuts import render
from django.urls import reverse
from django.core.paginator import Paginator

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required


from .models import User, Profile, Post, Like

import json

def index(request):
    # 1. load all posts

    posts = Post.objects.all()
    posts = posts.order_by('-date').all()
    paginator = Paginator(posts, 2)
    
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, "network/index.html", {'page_obj': page_obj})

def section(request,num):
    page_number = request.GET.get('page')


@csrf_exempt
@login_required
def compose(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    # Check recipient emails
    data = json.loads(request.body)
    post = Post(
        content = 'as',
        user = request.user,
        liked = 0
    )
    post.save()
    return JsonResponse({"message": "Tweet was post successfully."}, status=201)


def posts(request):

    posts = Post.objects.all()
    posts = posts.order_by('-date').all()
    return JsonResponse([post.serialize() for post in posts], safe=False)


@csrf_exempt
@login_required
def compose(request):

    # Composing a new post must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    
    data = json.loads(request.body)

    content = data.get('content',"")
    if not content:
        return JsonResponse({
            "error": "Content required."
        }, status=400)
    
    # Create post plus sender
    post = Post.objects.create(
        content = content,
        user = request.user
    )
    post.save()
    return JsonResponse({"message": "Post sent successfully."}, status=201)

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def profile(request):

    employee = {
        'id': 123,
        'name': 'Jhon',
        'sal': 10000
    }

    # data = User.objects.all();

    # response = {'users':list(data.values('username','email'))}

    return render(request, "network/profile.html")
    # return JsonResponse(response)

def followings(request):
    
    # data = User.objects.all();

    # response = {'users':list(data.values('username','email'))}

    # return render(request, "network/profile.html")
    return render(request,'network/followings.html')