import createDataContext from './createDataContext'
import { getTracks, saveTrack } from '../service/tracker'
import { ActionType, GetTracksResponse, RawLocation, RawTrack } from '../models/types'
import { Track } from '../models/classes'
import { GenericState } from '../models/interfaces'

const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS'

export type TrackContextType = {
  state: TrackState
  fetchTrecks: () => Promise<void>
  createTrack: (name: string, locations: RawLocation[]) => Promise<void>
}

class TrackState implements GenericState {
  private tracks: Track[]
  constructor(opts?: GetTracksResponse) {
    if (opts) {
      this.tracks = opts.tracks.map(rawTrack => new Track(rawTrack))
    } else {
      this.tracks = []
    }
  }

  getCopyTracks(): RawTrack[] {
    return this.tracks.map(track => track.getRawTrack())
  }
  getState(): Track[] {
    return this.tracks
  }
}

const trackReducer = (state: TrackState, action: ActionType<any>) => {
  switch(action.type) {
    case FETCH_TRACKS_SUCCESS: { 
      const rawTracks = action.payload as GetTracksResponse
      return new TrackState(rawTracks)
    }
    default: return state
  }
}

const fetchTrecks = (dispatch: React.Dispatch<ActionType<GetTracksResponse>>) => async () => {
 const response = await getTracks()
 dispatch({ type: FETCH_TRACKS_SUCCESS, payload: response.data })
}

const createTrack = () => async (name: string, locations: RawLocation[]) => {
  await saveTrack({ name, locations })
}

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTrecks, createTrack },
  new TrackState()
)