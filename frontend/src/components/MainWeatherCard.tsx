"use client";

import { WiHumidity } from "react-icons/wi";
import { Card, CardHeader, CardBody, Typography } from "@/components/MTCustom";
import { CiLocationOn } from "react-icons/ci";

type WeatherCardProps = {
	location: string;
	temp: number;
	humidity: number;
	description: string;
	feels_like: number;
};

export function WeatherCard({ location, temp, humidity, description, feels_like }: WeatherCardProps) {
	return (
		<Card className="bg-blue-300/40 rounded-lg shadow-md p-2 w-full m-auto text-center flex flex-col items-center">
			<CardHeader className="mt-3 bg-transparent shadow-none">
				<Typography variant="h2" className="font-bold">
					<CiLocationOn className="inline"/> {location}
				</Typography>
			</CardHeader>

			<CardBody className="mb-4">
				<Typography variant="h4">{temp}°F</Typography>
				<Typography variant="h4"className="text-gray-300">{humidity} <WiHumidity className="inline" /></Typography>
				<Typography variant="h4">{description}</Typography>
			</CardBody>
		</Card>
	);
}
