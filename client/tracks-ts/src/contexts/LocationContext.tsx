import createDataContext from './createDataContext'
import { GenericState } from '../models/interfaces'
import { LocationPoint } from '../models/classes'
import { TouchableHighlightBase } from 'react-native'
import { RawLocation } from '../models/types'

const START_RECORDING = 'START_RECORDING'
const STOP_RECORDING = 'STOP_RECORDING'
const ADD_CURRENT_LOCATION = 'ADD_CURRENT_LOCATION'
const ADD_LOCATION = 'ADD_LOCATION'
const CHANGE_NAME = 'ADD_LOCATION'
const REST = 'RESET'

class LocationState implements GenericState {
  private recording: boolean
  private currentLocation: LocationPoint
  private locations: LocationPoint[]

  private getAllLocations (): RawLocation[] {
    return this.locations.map(location => location.getLocation())
  }

  getState() {
    return { 
      recording: this.recording, 
      currentLocation: this.currentLocation.getCoordinates(), 
      locations: this.getAllLocations()
    }
  }
}

const locationReducer = (state: LocationState = new LocationState(), action) => {

}