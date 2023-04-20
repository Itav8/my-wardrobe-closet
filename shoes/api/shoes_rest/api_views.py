from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Shoe, BinVO
from django.views.decorators.http import requre_http_methods
# Create your views here.



def api_list_shoes(request):
    pass
