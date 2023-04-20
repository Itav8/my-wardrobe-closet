from django.db import models
from django.urls import reverse


class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()

    def get_api_url(self):
        return reverse("api_bin", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.closet_name} - {self.bin_number}/{self.bin_size}"

    class Meta:
        ordering = ("closet_name", "bin_number", "bin_size")


class Shoe(models.Model):
    model_name = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(max_length=2000, null=True)
    bin = models.ForeignKey(
        BinVO, related_name="shoes", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.model_name
