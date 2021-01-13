import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'

const trackReducer = (state, action) => {
  switch(action.type) {

    default: return state
  }
}

const fetchTrecks = dispatch => () => {

}

const createTrack = dispatch => async (name, locations) => {
  console.log(name, locations.length)
  const result = await trackerApi.post('/api/tracks', { name, locations }).catch(err => {
    console.log('this is thhe error', err)
  })
}

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTrecks, createTrack },
  []
)