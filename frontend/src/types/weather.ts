export type WeatherData = {
	alerts?: {
		description: string;
		end: number;
		event: string;
		sender_name: string;
		start: number;
		tags: string[];
	}[];
	current: {
		feels_like: number;
		humidity: number;
		temp: number;
		uvi: number;
		pressure: number;
		wind_speed: number;
		wind_deg: number;
		sunrise: number;
		sunset: number;
		dt: number;
		weather: {
			id: number;
			description: string;
		}[];
	};
	hourly: {
		dt: number;
		humidity: number;
		temp: number;
		uvi: number;
		weather: {
			id: number;
			description: string;
		}[];
	}[];
	daily: {
		humidity: number;
		summary: string;
		temp: {
			day: number;
			min: number;
			max: number;
		};
		weather: {
			id: number;
		}
	};
};
