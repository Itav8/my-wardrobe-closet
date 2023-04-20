from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Shoe, BinVO
from django.views.decorators.http import require_http_methods
import json
# Create your views here.


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "id",
        "model_name",
        "manufacturer",
        "color",
        "picture_url",
        ]


@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        shoe_data = []
        for shoe in shoes:
            shoe_data.append({
                'id': shoe.id,
                'model_name': shoe.model_name,
                'manufacturer': shoe.manufacturer,
                'color': shoe.color,
                'picture_url': shoe.picture_url
            })
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
        )
    else:           # POST
        content = json.loads(request.body)
        try:
            bin_number = content["bin"]
            bin = BinVO.objects.get(bin_number=bin_number)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin number"},
                status=400,
            )

    shoe = Shoe.objects.create(**content)
    shoes = Shoe.objects.all()
    return JsonResponse(
        {"shoes": shoes},
        encoder=ShoeListEncoder,
    )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_shoe_detail(request, pk):
    if (request.method == "DELETE"):
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        return JsonResponse({"message": "Invalid request"}, status=400)
