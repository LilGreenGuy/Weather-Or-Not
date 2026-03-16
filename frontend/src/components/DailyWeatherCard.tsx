"use client";

import { Card, CardHeader, CardBody, Typography } from "@/components/MTCustom";
import { WiHumidity } from "react-icons/wi";

type WeatherCardProps = {
    temp: {
        day: number;
        min: number;
        max: number;
    };
    humidity: number;
    summary: string;
    time: string;
    weather: number;
}

export function DailyWeatherCard({ temp, humidity, summary, time, weather }: WeatherCardProps) {
    return (
		<Card className="mx-auto bg-blue-300/40 rounded-lg shadow-md p-2 w-full text-center flex flex-col items-center shadow-lg">
			<CardHeader className="m-3 bg-transparent shadow-none">
				<Typography variant="h3" className="mb-2 font-bold">
					{time}
                </Typography>
            
                <Typography variant="h4">
                    {summary}
                </Typography>
			</CardHeader>

			<CardBody className="m-2 w-full md:w-auto justify-around mb-4 flex flex-row md:flex-col gap-2">
				{/* <Typography variant="h5">{temp.day}°F</Typography> */}
				<Typography variant="h5" className="text-gray-300">{humidity} <WiHumidity className="inline" /></Typography>

                <Typography variant="h5">{temp.max}°F</Typography>
                <Typography variant="h5">{temp.min}°F</Typography>
			</CardBody>
		</Card>
    );
}