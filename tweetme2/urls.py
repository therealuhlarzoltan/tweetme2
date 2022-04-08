"""tweetme2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from unicodedata import name
from tweets import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home_view, name='home'),
    path('tweets', views.tweet_list_view, name='tweetlist'),
    path('tweets/<int:tweet_id>', views.tweet_detail_view, name='tweetview'),
    path('create-tweet', views.tweet_create_form, name='create'),
    path('api/tweets/', include('tweets.urls'))
]
