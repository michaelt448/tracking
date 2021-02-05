import createDataContext from './createDataContext'

import { login, signup } from '../service/tracker'
import { getAccessToken, setAccessToken, removeAccessToken } from '../service/PhoneStorage'
import { AxiosResponse } from 'axios'
import { ActionType, AuthenticationResponseType } from '../models/types'
import { GenericState } from '../models/interfaces'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_ERROR = 'LOGIN_ERROR'
const LOGOUT = 'LOGOUT'
const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR'
const LOGIN_FAIL = 'LOGIN_FAIL'

export type AuthenticationCredentials = {
  email: string,
  password: string
}

export type AuthContextType = {
  state: AuthenticationState
  signOut: () => Promise<void>
  signIn: (creds: AuthenticationCredentials) => Promise<void>
  signUp: (creds: AuthenticationCredentials) => Promise<void>
  clearErrorMessage: () => void
  tryLocalSignIn: () => Promise<void>
}

type AuthenticationOpts = { accessToken?: string, error?: string, loading?: boolean }

export class AuthenticationState implements GenericState {
  private accessToken: string
  private error: string
  private loading: boolean
  constructor(opts?: AuthenticationOpts) {
    if (opts) {
    this.accessToken = opts.accessToken || ''
    this.error = opts.error || ''
    this.loading = false
    } else {
      this.accessToken = ''
      this.error = ''
      this.loading = true
    }
  }

  getState() {
    return { accessToken: this.accessToken, error: this.error, loading: this.loading }
  }
}

const authReducer = (state: AuthenticationState, action: ActionType<any>) => {
  switch(action.type) {
    case LOGIN_SUCCESS: {
      console.log('hello there')
      const newToken : string = action.payload
      const { error } = state.getState()
      console.log('hello from other side')
      return new AuthenticationState({ accessToken: newToken, error })
    }
    case LOGIN_ERROR: {
      const newError: string = action.payload
      const { accessToken } = state.getState()
      return new AuthenticationState({ accessToken, error: newError })
    }
    case LOGOUT: {
      const { error } = state.getState()
      return new AuthenticationState({ error })
    }
    case CLEAR_LOGIN_ERROR: {
      const { accessToken } = state.getState()
      return new AuthenticationState({ accessToken })
    }
    case LOGIN_FAIL: {
      return new AuthenticationState({ loading: false })
    }
    default: return state
  }
}

const tryLocalSignIn = (dispatch: React.Dispatch<ActionType<string>>) => {
  return async () => {
    try {
      const accessToken = await getAccessToken()
      console.log('this is the accesstoken', accessToken)
      if (accessToken) {
        dispatch({ type: LOGIN_SUCCESS, payload: accessToken})
      } else {
        dispatch({ type: LOGIN_FAIL })
      }
    } catch (err) {
      dispatch({ type: LOGIN_ERROR, payload: err })
    }
  }
}

const clearErrorMessage = (dispatch: React.Dispatch<ActionType<null>>) => {
  return () => {
    dispatch({ type: CLEAR_LOGIN_ERROR })
  }
}

const signOut = (dispatch: React.Dispatch<ActionType<null>>) => {
  return async () => {
    await removeAccessToken()
    dispatch({ type: LOGOUT })
  }
}

const signIn = (dispatch: React.Dispatch<ActionType<string>>) => {
  return async ({ email, password }: AuthenticationCredentials) => {
    const signIn = () => login({ email, password })
    await handleAuthentication(signIn, dispatch)
  }
}

const signUp= (dispatch: React.Dispatch<ActionType<string>>) => {
  return async ({ email, password }: AuthenticationCredentials) => {
    const signUp = () => signup({ email, password })
    await handleAuthentication(signUp, dispatch)
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signOut, signIn, signUp, clearErrorMessage, tryLocalSignIn },
  new AuthenticationState()
)

// Helpers

const handleAuthentication = async (authenticationCall: () => Promise<AxiosResponse<AuthenticationResponseType>>, dispatch:React.Dispatch<ActionType<string>> ): Promise<void> => {
  try {
    const response = await authenticationCall()
    const accessToken = response.data.token
    await setAccessToken(accessToken)
    dispatch({ type: LOGIN_SUCCESS, payload: accessToken })
  } catch (err) {
    dispatch({ type: LOGIN_ERROR, payload: err.response.data })
  }
}