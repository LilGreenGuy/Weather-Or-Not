"use client";
import { Card, CardHeader, CardBody, Typography } from "@/components/MTCustom";
import MiscWeatherCard from "@/components/ui/MiscWeatherCard"
type WeatherCardProps = {
    current?: {
        uvi?: number;
        humidity?: number;
        pressure?: number;
        wind_speed?: number;
        wind_deg?: number;
        sunrise?: number;
        sunset?: number;
    }
}

export  function MiscWeatherCardContainer({ current }: WeatherCardProps) {
    return (
				<div className="bg-blue-300/40 mt-6 grid grid-cols-1 2xl:grid-cols-7 mx-auto rounded-lg p-4 gap-4">

            <MiscWeatherCard uvi={current.uvi}/>
            <MiscWeatherCard humidity={current.humidity}/>
            <MiscWeatherCard pressure={current.pressure}/>
            <MiscWeatherCard wind_speed={current.wind_speed}/>
            <MiscWeatherCard wind_deg={current.wind_deg} />
            
        </div>
    );
}