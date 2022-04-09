from http import client
from pydoc import cli
from urllib import response
from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Tweet
from rest_framework.test import APIClient

# Create your tests here.
User = get_user_model()

class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='abc', password='somepassword')
        self.userb = User.objects.create_user(username='def', password='someotherpassword')
        Tweet.objects.create(content="my first tweet", user=self.user)
        Tweet.objects.create(content="my first tweet", user=self.user)
        Tweet.objects.create(content="my first tweet", user=self.userb)
        self.currentCount = Tweet.objects.all().count()

    def test_tweet_created(self):
       tweet = Tweet.objects.create(content="my second tweet", user=self.user)
       self.assertEqual(tweet.id, 4)
       self.assertEqual(tweet.user, self.user)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')
        return client

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get("/api/tweets/")
        print(response)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_action_like(self):
        client = self.get_client()
        response = client.post("/api/tweets/action", {'id':1, 'action':'like'})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get('likes')
        self.assertEqual(like_count, 1)

    def test_action_unlike(self):
        client = self.get_client()
        response = client.post("/api/tweets/action", {'id':2, 'action':'like'})
        self.assertEqual(response.status_code, 200)
        response = client.post("/api/tweets/action", {'id':2, 'action':'unlike'})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get('likes')
        self.assertEqual(like_count, 0)

    def test_action_retweet(self):
        client = self.get_client()
        current_count = self.currentCount
        response = client.post("/api/tweets/action", {'id':2, 'action':'retweet'})
        self.assertEqual(response.status_code, 201)
        data = response.json()
        new_tweet_id = data.get('id')
        self.assertNotEqual(new_tweet_id, 2)
        self.assertEqual(current_count + 1, new_tweet_id)

    def test_tweet_create_api_view(self):
        data = {'content':"This is my test tweet"}
        current_count = self.currentCount
        client = self.get_client()
        response = client.post("/api/tweets/create-tweet/", data)
        self.assertEqual(response.status_code, 201)
        data = response.json()
        new_tweet_id = data.get('id')
        self.assertEqual(current_count + 1, new_tweet_id)

    def test_tweet_detail_api_view(self):
        client = self.get_client()
        response = client.get("/api/tweets/1/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        id = data.get('id')
        self.assertEqual(id, 1)

    def test_tweet_delete_api_view(self):
        client = self.get_client()
        response = client.delete("/api/tweets/1/delete/")
        self.assertEqual(response.status_code, 200)
        response = client.delete("/api/tweets/1/delete/")
        self.assertEqual(response.status_code, 404)
        response = client.delete("/api/tweets/3/delete/")
        self.assertEqual(response.status_code, 401)