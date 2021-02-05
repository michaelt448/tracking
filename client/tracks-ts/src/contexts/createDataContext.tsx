import React, { useReducer } from 'react'
import { AuthContextType } from './AuthContext'
import { LocationContextType } from './LocationContext'
import { TrackContextType } from './TrackContext'

type ActionType<T> = {
  type: string
  payload?: T
}

interface GenericState {
  getState(): {}
}
type GenericReducer = (state: any, action: ActionType<any>) => GenericState
type ContextType = AuthContextType | LocationContextType | TrackContextType

export default (reducer: GenericReducer, actions: any, defaultValue: GenericState) => {
  const Context = React.createContext<Partial<ContextType>>({})

  const Provider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, defaultValue)
    const boundActions: any = {}
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch)
    }

    return (
      <Context.Provider value={{state, ...boundActions}}>
        {children}
      </Context.Provider>
    )
  }

  return { Context, Provider }
}