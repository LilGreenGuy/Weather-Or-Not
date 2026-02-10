from rest_framework import routers
from apps.weather.viewsets import WeatherViewSet

router = routers.DefaultRouter()
router.register(r"weather", WeatherViewSet, basename="weather")
urlpatterns = router.urls