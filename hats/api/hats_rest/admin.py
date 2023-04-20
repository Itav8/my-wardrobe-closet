from django.contrib import admin
from .models import Hat, LocationVO

# Register your models here.
# admin.site.register(Hat)


@admin.register(Hat)
class HatAdmin(admin.ModelAdmin):
    pass


# Temp for now for testing, will delete once poller is implemented.
@admin.register(LocationVO)
class LocationVOAdmin(admin.ModelAdmin):
    pass
