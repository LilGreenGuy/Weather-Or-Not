"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

async function fetchWeather(lat: number = 40.7128, lon: number = 74.0060) {
	const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
	if (!response.ok) {
		throw new Error("Failed to fetch weather data");
	}
	return response.json();
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      Soup
    </div>
  );
}
