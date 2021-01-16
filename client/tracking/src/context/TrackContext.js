import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'

const trackReducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_TRACKS_SUCCESS': return action.payload
    default: return state
  }
}

const fetchTrecks = dispatch => async () => {
 const response = await trackerApi.get('/api/tracks')
 dispatch({ type: 'FETCH_TRACKS_SUCCESS', payload: response.data })
}

const createTrack = dispatch => async (name, locations) => {
  await trackerApi.post('/api/tracks', { name, locations }).catch(err => {
  })
}

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTrecks, createTrack },
  []
)