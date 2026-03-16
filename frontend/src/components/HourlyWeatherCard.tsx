"use client";

import { Card, CardHeader, CardBody, Typography } from "@/components/MTCustom";
import { WiHumidity } from "react-icons/wi";

type WeatherCardProps = {
	temp: number;
	humidity: number;
    description: string;
    time: string;
};


export function HourlyWeatherCard({ temp, humidity, description, time }: WeatherCardProps) {
    return (
		<Card className="mx-auto bg-transparent rounded-lg shadow-md p-2 w-full text-center flex flex-col items-center shadow-lg">
			<CardHeader className="m-3 bg-transparent shadow-none">
				<Typography variant="h3" className="font-bold">
					{time}
				</Typography>
			</CardHeader>

			<CardBody className="w-full md:w-auto p-2 md:p-6 mb-4 flex flex-row lg:flex-col gap-2">
				<Typography variant="h5 mx-2">{temp}°F</Typography>
				<Typography variant="h5 mx-2" className="text-gray-300 mx-auto">{humidity} <WiHumidity className="inline" /></Typography>
				<Typography variant="h5 mx-2">{description}</Typography>
			</CardBody>
		</Card>
	);
}