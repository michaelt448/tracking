import axios from 'axios'
import { AuthenticationCredentials } from '../contexts/AuthContext'
import { AuthenticationResponseType, RawTrack, SaveTrackResponse, GetTracksResponse } from '../models/types'
import { getAccessToken } from './PhoneStorage'

// Currently just this service uses api, leave it here.
const ROUTES = {
  signIn: '/signin',
  signUp: '/signUp',
  track: '/tracks'
}

const instance = axios.create({
  baseURL: 'http://65d44d60b0c2.ngrok.io'
})

instance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

const login = (credentials: AuthenticationCredentials) => {
  return instance.post<AuthenticationResponseType>(ROUTES.signIn, credentials)
}

const signup = (credentials: AuthenticationCredentials) => {
  return instance.post<AuthenticationResponseType>(ROUTES.signUp, credentials)
}

const saveTrack = (track: RawTrack) => {
  return instance.post<SaveTrackResponse>(ROUTES.track, track)
}

const getTracks = () => {
  return instance.post<GetTracksResponse>(ROUTES.track)
}

export { login, signup, saveTrack, getTracks }

