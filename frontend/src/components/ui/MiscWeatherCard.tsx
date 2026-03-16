"use client";

import { Card, CardHeader, CardBody, Typography } from "@/components/MTCustom";

type WeatherCardProps = {
        uvi?: number;
        humidity?: number;
        pressure?: number;
        wind_speed?: number;
        wind_deg?: number;
}

export default function MiscWeatherCard({uvi, humidity, pressure, wind_speed, wind_deg}: WeatherCardProps) {
    return (
        <Card className="bg-blue-300/40 rounded-lg shadow-md p-2 w-full text-center flex flex-col items-center shadow-lg">
            {uvi &&
                
                    <CardBody>
                        {uvi}
                    </CardBody>
                
            }
                        {humidity &&
                
                    <CardBody>
                        {humidity}
                    </CardBody>
                
            }
            {pressure &&
                
                    <CardBody>
                        {pressure}
                    </CardBody>
                
            }
            {wind_deg &&
                
                    <CardBody>
                        {wind_deg}
                    </CardBody>
                
            }
            {wind_speed &&
                
                    <CardBody>
                        {wind_speed}
                    </CardBody>
                
            }
        </Card>
    )
}