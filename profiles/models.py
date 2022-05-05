from django.conf import settings
from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL
# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=220, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)