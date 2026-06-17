import { Platform } from "react-native";

const fallbackApiUrl = Platform.OS === "web" ? "http://localhost:3001" : "http://localhost:3001";

export const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL ?? fallbackApiUrl;

type ApiResponse<T> = {
  data: T;
};

export type Series = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
};

export type Track = {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  country: string;
  latitude: string | null;
  longitude: string | null;
  imageUrl: string | null;
  description: string | null;
};

export type Event = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  startDate: string;
  endDate: string;
  seriesId: string;
  trackId: string;
  ticketUrl: string | null;
  officialUrl: string | null;
  imageUrl: string | null;
  series: Series;
  track: Track;
};

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const body = (await response.json()) as ApiResponse<T>;
  return body.data;
}

export function getEvents() {
  return get<Event[]>("/events");
}

export function getTracks() {
  return get<Track[]>("/tracks");
}
