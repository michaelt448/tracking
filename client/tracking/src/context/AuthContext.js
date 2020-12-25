import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'

// import  { AsyncStorage } from '@react-native-async-storage/async-storage'
import { AsyncStorage } from 'react-native'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS': return { ...state, accessToken: action.payload.accessToken, error: null }
    case 'LOGIN_ERROR': return { ...state, error: action.payload.error }
    case 'LOGOUT': return { ...state, accessToken: null }
    case 'CLEAR_LOGIN_ERROR': return { ...state, error: null }
    default: return state
  }
}

const tryLocalSignIn = (dispatch) => {
  return async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken')
      if (accessToken) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: { accessToken }})
        navigate('TrackList')
      } else {
        navigate('Signin')
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_ERROR' })
    }
  }
}

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: 'CLEAR_LOGIN_ERROR'})
  }
}

const signOut = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem('accessToken')
    navigate('Blank')
    dispatch({ type: 'LOGOUT' })
  }
}

const signIn = (dispatch) => {
  return async ({ email, password }) => {
    const signIn = async () => await trackerApi.post('/signin', { email, password })
    await handleAuthentication(signIn, dispatch)
  }
}

const signUp= (dispatch) => {
  return async ({ email, password }) => {
    const signUp = async () => await trackerApi.post('/signup', { email, password })
    await handleAuthentication(signUp, dispatch)
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signOut, signIn, signUp, clearErrorMessage, tryLocalSignIn },
  { accessToken: null, error: null }
)

// Helpers

const handleAuthentication = async (authenticationCall, dispatch) => {
  try {
    const response = await authenticationCall()
    const accessToken = response.data.token
    await AsyncStorage.setItem('accessToken', accessToken)
    dispatch({ type: 'LOGIN_SUCCESS', payload: { accessToken } })
    navigate('TrackList')
  } catch (err) {
    console.log('this is the error message', JSON.stringify(err))
    dispatch({ type: 'LOGIN_ERROR', payload: { error: err.response.data } })
  }
}