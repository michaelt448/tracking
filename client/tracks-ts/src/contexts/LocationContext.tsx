import createDataContext from './createDataContext'
import { GenericState } from '../models/interfaces'
import { LocationPoint } from '../models/classes'
import { ActionType, RawLocation } from '../models/types'

const START_RECORDING = 'START_RECORDING'
const STOP_RECORDING = 'STOP_RECORDING'
const ADD_CURRENT_LOCATION = 'ADD_CURRENT_LOCATION'
const ADD_LOCATION = 'ADD_LOCATION'
const CHANGE_NAME = 'ADD_LOCATION'
const RESET = 'RESET'

type LocationOpts = { recording: boolean, currentLocation: LocationPoint | null, locations: LocationPoint[], currentRouteName: string }

export type LocationContextType = {
  state: LocationState,
  changeName: (name: string) => void
  startRecording: () => void
  stopRecording: () => void
  addLocation: (location: RawLocation, isRecording: boolean) => void
  reset: () => void
}
class LocationState implements GenericState {
  private recording: boolean
  private currentLocation: LocationPoint | null
  private locations: LocationPoint[]
  private currentRouteName: string

  constructor(opts?: LocationOpts) {
    if (opts) {
      this.recording = opts.recording || false
      this.currentLocation = opts.currentLocation || null
      this.locations = opts.locations || []
      this.currentRouteName = opts.currentRouteName || ''
    } else {
      this.recording = false
      this.currentLocation = null
      this.locations = []
      this.currentRouteName = ''
    }
  }

  /**
   * Returns deep copy of locations
   */
  public getAllLocations(): RawLocation[] {
    return this.locations.map(location => location.getLocation())
  }

  /**
   * Returns a deep copy of currentLocation
   */
  public getCurrentLocationCopy(): RawLocation | null {
    return this.currentLocation && this.currentLocation.getLocation()
  }

  /**
   * Returns a shallow copy of the fields
   */
  getState() {
    return { 
      recording: this.recording, 
      currentLocation: this.currentLocation, 
      locations: this.locations,
      currentRouteName: this.currentRouteName
    }
  }
}

const locationReducer = (state: LocationState, action: ActionType<any>) => {
  switch (action.type) {
    case START_RECORDING: {
      const oldState = state.getState()
      return new LocationState({ ...oldState, recording: true })
    }
    case STOP_RECORDING: {
      const oldState = state.getState()
      return new LocationState({ ...oldState, recording: false })
    }
    case ADD_CURRENT_LOCATION: {
      const newRawLocation = action.payload as RawLocation
      const oldState = state.getState()
      const newLocation = new LocationPoint(newRawLocation)
      return new LocationState({ ...oldState, currentLocation: newLocation })
    }
    case ADD_LOCATION: {
      const newRawLocation = action.payload as RawLocation
      const newLocation = new LocationPoint(newRawLocation)
      const oldState = state.getState()
      const allLocationsCopy = state.getAllLocations()
      const updatedLocations = allLocationsCopy.map(location => new LocationPoint(location))
      updatedLocations.push(newLocation)
      return new LocationState({ ...oldState, locations: updatedLocations})
    }
    case CHANGE_NAME: {
      const newRouteName = action.payload as string
      const oldState = state.getState()
      return new LocationState({ ...oldState, currentRouteName: newRouteName })
    }
    case RESET: {
      return new LocationState()
    }
    default: return state
  }
}

const changeName = (dispatch: React.Dispatch<ActionType<string>>) => (name: string) => {
  dispatch({ type: CHANGE_NAME, payload: name })
}
const startRecording = (dispatch: React.Dispatch<ActionType<null>>) => () => {
  dispatch({ type: START_RECORDING })
}
const stopRecording = (dispatch: React.Dispatch<ActionType<null>>) => () => {
  dispatch({ type: STOP_RECORDING })
}

const addLocation = (dispatch: React.Dispatch<ActionType<RawLocation>>) => {
  return (location: RawLocation, isRecording: boolean) => {
  dispatch({ type: ADD_CURRENT_LOCATION, payload: location})
  if (isRecording) {
    dispatch({ type: ADD_LOCATION, payload: location })
  }
}}

const reset = (dispatch: React.Dispatch<ActionType<null>>) => () => {
  dispatch({ type: RESET } )
}

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName, reset },
  new LocationState()
)