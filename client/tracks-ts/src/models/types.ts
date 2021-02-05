import { LocationObject } from "expo-location"

export type AuthenticationResponseType = { token: string }

export type GeographicLocation = {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export type ActionType<T> = {
  type: string
  payload?: T
}

export type RawLocation = LocationObject

export type RawTrack = {
  _id: string
  name: string
  locations: RawLocation[]
  author?: number
}

export type GetTracksResponse = {
  tracks: RawTrack[]
}

export type SaveTrackResponse = { 
  track: RawTrack 
}