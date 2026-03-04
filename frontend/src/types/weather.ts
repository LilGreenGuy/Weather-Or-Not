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
		humidity: number;
		temp: number;
		uvi: number;
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
};
