"use client";

import { useEffect, useRef, useState } from "react";
import { useMemo } from "react";
import { getUserLocation } from "@/utils/useGeolocation";
import { SidebarWithSearch } from "@/components/Sidebar";
import { WeatherCard } from "@/components/MainWeatherCard";
import { HourlyWeatherCard } from "@/components/HourlyWeatherCard";
import geocodeAddress from "@/libs/reactGeocode";
import { WeatherData } from "@/types/weather";
import { getBackgroundUrl } from "@/utils/pickBackground";

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
						temp: Math.round(((weatherData.current.temp - 273.15) * 9) / 5 + 32),
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
							temp: Math.round(((weatherData.current.temp - 273.15) * 9) / 5 + 32),
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

	let bgURL = useMemo(() => getBackgroundUrl(weather), [weather]);

	return (
		<div
			className="flex h-screen gap-4"
			style={{
				backgroundImage: `url(${bgURL})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}>
			<main className="flex-1 p-6">
				{weather && !error ?
					<WeatherCard
						location={locationName ?? "N/A"}
						temp={weather.current.temp ?? "N/A"}
						humidity={weather.current.humidity ?? "N/A"}
						uvi={weather.current.uvi ?? "N/A"}
						description={weather.current.weather[0]?.description ?? "N/A"}
					/>
				: error ?
					<p className="text-red-500">{error}</p>
				:	<WeatherCard location={"Loading..."} temp={0} humidity={0} uvi={0} description={"Loading..."} />}
				<div className="mt-6 flex overflow-x-auto bg-white rounded-sm p-4 gap-4">
					{weather && !error ?
						weather?.hourly
							.slice(0, 12)
							.map((hour, idx) => (
								<HourlyWeatherCard
									key={idx}
									time={new Date(hour.dt * 1000).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
									temp={Math.round(((hour.temp - 273.15) * 9) / 5 + 32)}
									humidity={hour.humidity}
									uvi={hour.uvi}
									description={hour.weather[0]?.description ?? "N/A"}
								/>
							))
					: error ?
						<p className="text-red-500">{error}</p>
					:	<HourlyWeatherCard time={"Loading..."} temp={0} humidity={0} uvi={0} description={"Loading..."} />}
				</div>
			</main>
		</div>
	);
}
