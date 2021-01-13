import createDataContext from './createDataContext'

const locationReducer = (state, action) => {
  switch(action.type) {
    case 'START_RECORDING': {
      return { ...state, recording: true }
    }
    case 'STOP_RECORDING': {
      return { ...state, recording: false }
    }
    case 'ADD_CURRENT_LOCATION': {
      return { ...state, currentLocation: action.payload }
    }
    case 'ADD_LOCATION': {
      return { ...state, locations: [...state.locations, action.payload]}
    }
    case 'CHANGE_NAME': {
      return { ...state, currentRouteName: action.payload }
    }
    case 'RESET': {
      return { ...state, currentRouteName: '', locations: [] }
    }
    default: {
      return state
    }
  }
}

const changeName = dispatch => (name) => {
  dispatch({ type: 'CHANGE_NAME', payload: name })
}
const startRecording = dispatch => () => {
  dispatch({ type: 'START_RECORDING' })
}
const stopRecording = dispatch => () => {
  dispatch({ type: 'STOP_RECORDING' })
}

const addLocation = (dispatch) => {
  return (location, isRecording) => {
  dispatch({ type: 'ADD_CURRENT_LOCATION', payload: location})
  if (isRecording) {
    dispatch({ type: 'ADD_LOCATION', payload: location })
  }
}}

const reset = dispatch => () => {
  console.log('inside the reset')
  dispatch({ type: 'RESET'} )
}


export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName, reset },
  { recording:false, locations: [], currentLocation: null, currentRouteName: '' }
)