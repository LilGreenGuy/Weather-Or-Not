import { WeatherData } from "../types/weather";
import { backgroundImages } from "@/libs/backgroundData";

export type BackgroundKey = keyof typeof backgroundImages;

export function pickBackgroundKey(weather: WeatherData | null): BackgroundKey {
	if (!weather) return "clear_skies";

	// Prefer stable "main" if your API provides it; fall back to description.
	const weatherType = weather.current.weather?.[0]?.id;

	if (weatherType < 300) return "thunderstorm"; // Thunderstorm
	if (weatherType < 400 && weatherType >= 300) return "drizzle"; // Drizzle
	if (weatherType > 500 && weatherType < 600) return "rain"; // Rain
	if (weatherType < 700 && weatherType >= 600) return "snow"; // Snow
	if (weatherType > 700 && weatherType < 800) return "mist"; // Mist
	if (weatherType === 801) return "few_clouds"; // Few clouds
	if (weatherType === 802) return "scattered_clouds";
	if (weatherType === 803) return "broken_clouds";
	if (weatherType === 804) return "cloudy"; // Overcast clouds
	return "clear_skies"; // Default fallback
}

export function getBackgroundUrl(weather: WeatherData | null): string {
	const key = pickBackgroundKey(weather);
	return backgroundImages[key]; // Fallback
}
