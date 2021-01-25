export type AuthenticationResponseType = { token: string }

export type GeographicLocation = {
  latitude: number,
  longitude: number,
  altitude: number,
  accuracy: number,
  heading: number,
  speed: number,
  altitudeAccuracy: number
}

export type RawLocation = {
  timestamp: number
  coords: geographicLocation
}