import json
from django.http import JsonResponse

# from django.shortcuts import render

from common.json import ModelEncoder
from .models import Hat, LocationVO
from django.views.decorators.http import require_http_methods


# Create your views here.
class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "section_number", "shelf_number"]


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = ["fabric", "style", "color", "picture_url", "location"]
    encoders = {"location": LocationVOEncoder()}


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["id", "style", "fabric", "color", "picture_url", "location"]
    encoders = {"location": LocationVOEncoder()}


@require_http_methods(["GET", "POST"])
def api_list_hats(request):
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse({"hats": hats}, encoder=HatListEncoder)
    else:
        content = json.loads(request.body)
        try:
            location = LocationVO.objects.get(id=content["location"])
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse({"message": "Invalid location id"}, status=400)

        hat = Hat.objects.create(**content)
        return JsonResponse(hat, encoder=HatListEncoder, safe=False)


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_hat(request, id):
    if request.method == "GET":
        hat = Hat.objects.get(id=id)
        return JsonResponse(hat, encoder=HatDetailEncoder, safe=False)
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Hat.objects.filter(id=id).update(**content)
        hat = Hat.objects.get(id=id)
        return JsonResponse({"hat": hat}, encoder=HatDetailEncoder, safe=False)
