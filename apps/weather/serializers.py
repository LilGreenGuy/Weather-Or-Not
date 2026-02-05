# apps/weather/serializers.py
from rest_framework import serializers
from .models import WeatherResponse

class WeatherResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherResponse
        fields = ["data", "fetched_at"]
