# apps/weather/viewsets.py
import os
import requests
from datetime import timedelta

from django.utils import timezone
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import WeatherResponse
from .serializers import WeatherResponseSerializer


CACHE_TTL = timedelta(minutes=10)  # adjust as needed


class WeatherViewSet(ViewSet):
    permission_classes = [AllowAny]

    def list(self, request):
        try:
            lat = round(float(request.query_params.get("lat", 35.6895)), 3)
            lon = round(float(request.query_params.get("lon", 139.6917)), 3)
        except (TypeError, ValueError):
            return Response({"error": "Invalid lat/lon"}, status=400)
        units = request.query_params.get("units", "standard")
        if units not in {"standard", "metric", "imperial"}:
            units = "imperial"

        # 1️⃣ Try cache
        cached = (
            WeatherResponse.objects
            .filter(lat=lat, lon=lon)
            .order_by("-fetched_at")
            .first()
        )

        if cached and timezone.now() - cached.fetched_at < CACHE_TTL:
            serializer = WeatherResponseSerializer(cached)
            return Response(serializer.data["data"])

        # 2️⃣ Fetch from OpenWeather
        api_key = os.getenv("OPENWEATHER_API_KEY")
        if not api_key:
            return Response({"error": "Missing API key"}, status=500)

        url = "https://api.openweathermap.org/data/3.0/onecall"
        params = {
            "lat": lat,
            "lon": lon,
            "exclude": "minutely",
            "appid": api_key,
            "units": units,
        }
        
        r = requests.get(url, params=params, timeout=10)
        r.raise_for_status()
        data = r.json()

        # 3️⃣ Save to DB
        record = WeatherResponse.objects.create(
            lat=lat,
            lon=lon,
            data=data,
        )

        return Response(record.data)
