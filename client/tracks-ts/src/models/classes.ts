import { GeographicLocation, RawLocation } from "./types";

export class LocationPoint {
  private timestamp: number
  private coords: GeographicLocation
  constructor(opts: RawLocation) {
    this.timestamp = opts.coords
    this.coords = { ...opts.coords }
  }

  getCoordinates(): GeographicLocation {
    return { ...this.coords }
  }

  getTimeStamp(): number {
    return this.timestamp
  }

  getLocation(): RawLocation {
    return { timestamp: this.getTimeStamp(), coords: this.getCoordinates() }
  }
}