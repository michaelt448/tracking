import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthenticationCredentials } from '../contexts/AuthContext'
import { AuthenticationResponseType } from '../models/types'
import { getAccessToken } from './PhoneStorage'

// Currently just this service uses api, leave it here.
const ROUTES = {
  signIn: '/signin',
  signUp: '/signUp'
}

const instance = axios.create({
  baseURL: 'http://2f1866210300.ngrok.io'
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

export { login, signup }

