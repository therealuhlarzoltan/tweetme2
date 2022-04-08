from unicodedata import name
from django.urls import path
from unicodedata import name
from . import views

urlpatterns = [
    path('', views.tweet_list_view, name='tweetlist'),
    path('<int:tweet_id>/', views.tweet_detail_view, name='tweetview'),
    path('create-tweet/', views.tweet_create_form, name='create'),
    path('<int:tweet_id>/delete/', views.tweet_delete_view, name='delete'),
    path('action', views.tweet_action_view, name='actions')
]
