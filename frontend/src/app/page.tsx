"use client";

import { useEffect, useRef, useState } from "react";
import { useMemo } from "react";
import { getUserLocation } from "@/utils/useGeolocation";
import { WeatherCard } from "@/components/MainWeatherCard";
import { HourlyWeatherCard } from "@/components/HourlyWeatherCard";
import { DailyWeatherCard } from "@/components/DailyWeatherCard";
import geocodeAddress from "@/libs/reactGeocode";
import { WeatherData } from "@/types/weather";
import { getBackgroundUrl } from "@/utils/pickBackground";
import { MiscWeatherCardContainer } from "@/components/MiscWeatherCardHolder";

const FALLBACK_LOCATION = {
	name: "New York",
	lat: 40.7128,
	lon: -74.006,
};

async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
	const response = await fetch(`http://127.0.0.1:8000/api/weather?lat=${lat}&lon=${lon}&units=imperial`);

	if (!response.ok) {
		throw new Error("Weather API failed");
	}

	return response.json();
}

function extractDisplayLocation(geo: any): string {
	const components = geo?.results?.[0]?.address_components ?? [];

	const get = (type: string) => components.find((c: any) => c.types.includes(type));

	const city = get("locality")?.long_name;
	const state = get("administrative_area_level_1")?.long_name;
	const country = get("country");

	if (!country) return FALLBACK_LOCATION.name;

	if (country.short_name === "US") {
		return city && state ? `${city}, ${state}` : (state ?? FALLBACK_LOCATION.name);
	}

	return city ? `${city}, ${country.long_name}` : country.long_name;
}

export default function Home() {
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [locationName, setLocationName] = useState<string>(FALLBACK_LOCATION.name);
	const [error, setError] = useState<string | null>(null);

	const hasLoaded = useRef(false);

	useEffect(() => {
		if (hasLoaded.current) return;
		hasLoaded.current = true;

		let cancelled = false;

		async function loadData() {
			try {
				const { lat, lon } = await getUserLocation();

				const [weatherData, geo] = await Promise.all([fetchWeather(lat, lon), geocodeAddress(`${lat},${lon}`)]);

				if (cancelled) return;

				setWeather({
					...weatherData,
					current: {
						...weatherData.current,
						// temp: Math.round(((weatherData.current.temp - 273.15) * 9) / 5 + 32),
					},
				});

				const city = extractDisplayLocation(geo);
				setLocationName(city);
			} catch (err) {
				try {
					const weatherData = await fetchWeather(FALLBACK_LOCATION.lat, FALLBACK_LOCATION.lon);

					if (cancelled) return;

					setWeather({
						...weatherData,
						current: {
							...weatherData.current,
							// temp: Math.round(((weatherData.current.temp - 273.15) * 9) / 5 + 32),
						},
					});

					setLocationName(FALLBACK_LOCATION.name);
				} catch {
					if (!cancelled) {
						setError("Unable to load weather data.");
					}
				}
			}
		}

		loadData();

		return () => {
			cancelled = true;
		};
	}, []);

	const bgURL = useMemo(() => getBackgroundUrl(weather), [weather]);

	return (
		<div
			className="flex h-screen gap-4 "
			style={{
				backgroundImage: `linear-gradient(to bottom, transparent 90%, #0170EB), url(${bgURL})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}>
			<main className="[text-shadow:0_0_1px_black] mx-auto text-xl text-white-800 flex-1 p-6 2xl:max-w-8/10 max-w-9/10">
				{weather && !error ?
					<WeatherCard
						location={locationName ?? "N/A"}
						temp={Math.round(weather.current.temp) ?? "N/A"}
						humidity={weather.current.humidity ?? "N/A"}
						uvi={weather.current.uvi ?? "N/A"}
						description={weather.current.weather[0]?.description ?? "N/A"}
						feels_Like={weather.current.feels_like}
					/>
				: error ?
					<p className="text-red-500">{error}</p>
				:	<WeatherCard location={"Loading..."} temp={0} humidity={0} description={"Loading..."} />}
				<div className="mt-6 grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-12 mx-auto bg-blue-300/40 rounded-lg p-4 gap-4">
					{weather && !error ?
						weather?.hourly.slice(0, 12).map((hour, idx) => (
							<HourlyWeatherCard
								key={idx}
								time={new Date(hour.dt * 1000).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
								temp={Math.round(hour.temp)}
								humidity={hour.humidity}
								uvi={hour.uvi}
								description={hour.weather[0]?.description ?? "N/A"}
							/>
						))
					: error ?
						<p className="text-red-500">{error}</p>
					:	<HourlyWeatherCard time={"Loading..."} temp={0} humidity={0} description={"Loading..."} />}
				</div>
				<div className="mt-6 grid grid-cols-1 2xl:grid-cols-7 mx-auto bg-blue-300/40 rounded-lg p-4 gap-4">
					{weather && !error ?
						weather?.daily.slice(0, 7).map((daily, idx) => (
							<DailyWeatherCard
								key={idx}
								time={new Date(daily.dt * 1000).toLocaleDateString([], {
									weekday: "long" 
									
								})}
								temp={daily.temp}
								humidity={daily.humidity}
								summary={daily.summary}
								weather={daily.weather}
							/>
						))
						: error ?
						<p className="text-red-500">{error}</p>
					:	<HourlyWeatherCard time={"Loading..."} temp={0} humidity={0} description={"Loading..."} />}
				</div>
{weather?.current && <MiscWeatherCardContainer current={weather.current} />}
			</main>
		</div>
	);
}
