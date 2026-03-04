"use client";

import { Card, CardHeader, CardBody, Typography } from "@/components/MTCustom";

type WeatherCardProps = {
	temp: number;
	humidity: number;
	uvi: number;
    description: string;
    time: string;
};


export function HourlyWeatherCard({ temp, humidity, uvi, description, time }: WeatherCardProps) {
    return (
		<Card className="text-slate-900 bg-white rounded-lg shadow-md p-2 w-full max-w-xs text-center flex flex-col items-center shadow-lg">
			<CardHeader className="m-2 shadow-none">
				<Typography variant="h3" className="text-slate-900">
					{time}
				</Typography>
			</CardHeader>

			<CardBody className="mb-4">
				<Typography variant="h5">Temp: {temp}°F</Typography>
				<Typography variant="h5">Humidity: {humidity}%</Typography>
				<Typography variant="h5">UV Index: {uvi}</Typography>
				<Typography variant="h5">{description}</Typography>
			</CardBody>
		</Card>
	);
}