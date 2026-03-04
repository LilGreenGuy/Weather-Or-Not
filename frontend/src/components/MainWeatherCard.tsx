"use client";
import { Card, CardHeader, CardBody, Typography } from "@/components/MTCustom";

type WeatherCardProps = {
	location: string;
	temp: number;
	humidity: number;
	uvi: number;
	description: string;
};

export function WeatherCard({ location, temp, humidity, uvi, description }: WeatherCardProps) {
	return (
		<Card className="text-slate-900 bg-white rounded-lg shadow-md p-2 w-full max-w-sm m-auto text-center flex flex-col items-center">
			<CardHeader className="m-2">
				<Typography variant="h2" className="text-slate-900">
					{location}
				</Typography>
			</CardHeader>

			<CardBody className="mb-4">
				<Typography variant="h4">Temperature: {temp}°F</Typography>
				<Typography variant="h4">Humidity: {humidity}%</Typography>
				<Typography variant="h4">UV Index: {uvi}</Typography>
				<Typography variant="h4">{description}</Typography>
			</CardBody>
		</Card>
	);
}
