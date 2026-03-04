import {
	setKey,
	setDefaults,
	setLanguage,
	setRegion,
	fromAddress,
	fromLatLng,
	fromPlaceId,
	setLocationType,
	geocode,
	RequestType,
} from "react-geocode";

setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string);

export default function geocodeAddress(address: string) {
    return fromAddress(address);
}