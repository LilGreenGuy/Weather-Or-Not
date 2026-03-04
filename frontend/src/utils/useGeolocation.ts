export function getUserLocation(): Promise<{ lat: number; lon: number }> {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(new Error("Geolocation not supported"));
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					lat: position.coords.latitude,
					lon: position.coords.longitude,
				});
			},
			(error) => reject(error),
			{
				enableHighAccuracy: true,
				timeout: 10000,
			},
		);
	});
}
