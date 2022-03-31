from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from .models import Tweet
from .forms import TweetForm
from django.utils.http import is_safe_url
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt


ALLOWED_HOSTS = settings.ALLOWED_HOSTS
# Create your views here.

def home_view(request):
    return render(request, "pages/home.html", context={}, status=200)

def tweet_detail_view(request, tweet_id):
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

def tweet_list_view(request):
    qs = Tweet.objects.all()
    tweets_list = [{"id": x.id, "content": x.content, 'likes':12} for x in qs]
    data = {
        "response": tweets_list
    }
    return JsonResponse(data)

def tweet_create_form(request):
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        if request.is_ajax():
            return JsonResponse({}, status=201) # 201 = created items

        if next_url != None and is_safe_url(next_url, allowed_hosts=ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()


    return render(request, "components/form.html", context={"form": form})