import json
from django.http import JsonResponse

# from django.shortcuts import render

from common.json import ModelEncoder
from .models import Hat, LocationVO
from django.views.decorators.http import require_http_methods


# Create your views here.
class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = ["name", "import_href"]


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = ["fabric", "style", "color", "location"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["style"]


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
        return JsonResponse(hat, encoder=HatDetailEncoder)
