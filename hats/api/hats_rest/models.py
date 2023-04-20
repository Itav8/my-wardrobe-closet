from django.db import models
from django.urls import reverse


# Create your models here.
class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100, default="")
    section_number = models.PositiveSmallIntegerField(null=True, default=None)
    shelf_number = models.PositiveSmallIntegerField(null=True, default=None)

    def get_api_url(self):
        return reverse("api_location", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.closet_name} - {self.section_number}/{self.shelf_number}"

    class Meta:
        ordering = ("closet_name", "section_number", "shelf_number")


class Hat(models.Model):
    fabric = models.CharField(max_length=200)
    style = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(max_length=2000, default="")
    location = models.ForeignKey(
        LocationVO, related_name="locations", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.style
