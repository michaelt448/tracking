import { GeographicLocation, RawLocation, RawTrack } from "./types";

export class LocationPoint {
  private timestamp: number
  private coords: GeographicLocation
  constructor(opts: RawLocation) {
      this.timestamp = opts.timestamp
      this.coords = opts.coords
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

export class Track {
  private id:string
  private name: string
  private locationPoints: LocationPoint[]

  constructor(opts: RawTrack) {
    this.id = opts._id
    this.name = opts.name
    this.locationPoints = opts.locations.map(location => new LocationPoint(location))
  }

  private convertToRawLocation(): RawLocation[] {
    return this.locationPoints.map(locationPoint => locationPoint.getLocation())
  }
  
  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getLocationPoints(): LocationPoint[] {
    return this.locationPoints
  }

  getRawTrack(): RawTrack {
    return { _id: this.id, name: this.getName(), locations: this.convertToRawLocation() }
  }

  getTrack() {
    return { name: this.getName(), locations: this.getLocationPoints() }
  }
}