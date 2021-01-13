import * as Location from 'expo-location'

const tenMetersWithDegress = .0001

const getLocation = incrament => {
  return {
    timestamp: 1000000,
    coords: {
      latitude: 37.33233141 + incrament * tenMetersWithDegress,
      longitude: -122.0312168 + incrament * tenMetersWithDegress,
      altitude: 5,
      accuracy: 5,
      heading: 0,
      speed: 0,
      altitudeAccuracy: 5
    }
  }
}
let counter = 0
const changeLocation = () => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter) 
  })
  counter++
}

setInterval(changeLocation, 2000)