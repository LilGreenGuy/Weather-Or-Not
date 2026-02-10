from django.db import models

class WeatherResponse(models.Model):
    lat = models.FloatField()
    lon = models.FloatField()
    data = models.JSONField(default=dict)  # raw OpenWeather response
    fetched_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["lat", "lon", "fetched_at"]),
        ]

    def __str__(self):
        return f"Weather @ ({self.lat}, {self.lon}) {self.fetched_at}"