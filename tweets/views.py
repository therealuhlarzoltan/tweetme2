from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from .models import Tweet
from .forms import TweetForm
from django.utils.http import is_safe_url
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .serializers import TweetSerializer, TweetActionSerializer, TweetCreateSerializer
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated

ALLOWED_HOSTS = settings.ALLOWED_HOSTS
# Create your views here.

def home_view(request):
    return render(request, "pages/home.html", context={}, status=200)

def tweet_detail_view_pure_django(request, tweet_id):
    data = {
        "id": tweet_id,
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not found"
        status = 404
    return JsonResponse(data, status=status)

def tweet_list_view_pure_django(request):
    qs = Tweet.objects.all()
    tweets_list = [x.serialize() for x in qs]
    data = {
        "response": tweets_list
    }
    return JsonResponse(data)

@login_required
def tweet_create_form_pure_django(request):
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = request.user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201) # 201 = created items

        if next_url != None and is_safe_url(next_url, allowed_hosts=ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)


    return render(request, "components/form.html", context={"form": form})

@permission_classes(IsAuthenticated)
# @authentication_classes(SessionAuthentication)
@api_view(['POST']) # http method of the client = POST
def tweet_create_form(request):
    serializer = TweetCreateSerializer(data=request.POST)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(status=400)

@api_view(['GET']) # http method of the client = GET
def tweet_list_view(request):
    qs = Tweet.objects.all()
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data, status=200)

@api_view(['GET']) # http method of the client = GET
def tweet_detail_view(request, tweet_id):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response(status=404)
    obj = qs.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data, status=200)

@permission_classes(IsAuthenticated)
@api_view(['DELETE', 'POST']) # http method of the client = DELETE/POST
def tweet_delete_view(request, tweet_id):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response(status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message": "You cannot delete this tweet"}, status=401)
    obj = qs.first()
    obj.delete()
    return Response({"message": "Tweet removed"}, status=200)

@permission_classes(IsAuthenticated)
@api_view(['POST']) # http method of the client = DELETE/POST
def tweet_action_view(request):
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get('id')
        action = data.get('action')
        content = data.get('content')

        qs = Tweet.objects.filter(id=tweet_id)
        if not qs.exists():
            return Response(status=404)
        obj = qs.first()
        if action == 'like':
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == 'unlike':
            obj.likes.remove(request.user)
        elif action == 'retweet':
            parent_obj = obj
            new_tweet = Tweet.objects.create(user=request.user, parent=parent_obj, content=content)
            serializer = TweetSerializer(new_tweet)
            return Response(serializer.data, status=200)
            
    return Response({}, status=200)