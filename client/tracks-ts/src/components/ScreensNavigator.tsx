import React, { useContext, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Context as AuthContext, AuthContextType } from '../contexts/AuthContext'
import { 
  SigninScreen, 
  SignupScreen, 
  TrackListScreen, 
  TrackDetailScreen, 
  TrackCreateScreen,
  AccountScreen } from '../screens'
import { SCREEN_NAMES } from '../models/enums'
import BlankScreen from '../screens/BlankScreen'

const ScreenNavigator: React.FC = (): JSX.Element =>  {
  const { state, tryLocalSignIn } = useContext(AuthContext) as AuthContextType
  const { accessToken, loading } = state.getState()

  useEffect(() => {
    tryLocalSignIn()
  }, [])

  const loginFlow = () => {
    const Stack = createStackNavigator()
    return (
      <Stack.Navigator>
        <Stack.Screen name={SCREEN_NAMES.SIGN_IN_SCREEN} component={SigninScreen} options={{headerShown: false}}/>
        <Stack.Screen name={SCREEN_NAMES.SIGN_UP_SCREEN} component={SignupScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    )
  }

  const trackListFlow = () => {
    const Stack = createStackNavigator()
    return (
      <Stack.Navigator>
        <Stack.Screen name={SCREEN_NAMES.TRACK_LIST_SCREEN} component={TrackListScreen}/>
        <Stack.Screen name={SCREEN_NAMES.TRACK_DETAIL_SCREEN} component={TrackDetailScreen}/>
      </Stack.Navigator>
    )
  }

  const mainFlow = () => {
    const Tabs = createBottomTabNavigator()
    return (
      <Tabs.Navigator>
        <Tabs.Screen name={SCREEN_NAMES.TRACK_LIST_FLOW} component={trackListFlow}/>
        <Tabs.Screen name={SCREEN_NAMES.TRACK_CREATE_SCREEN} component={TrackCreateScreen} />
        <Tabs.Screen name={SCREEN_NAMES.ACCOUNT_SCREEN} component={AccountScreen} />
      </Tabs.Navigator>
    )
  }

  const onAppLoad = () => {
    if (loading) {
      return <BlankScreen />
    } else {
      return accessToken ?  mainFlow() : loginFlow()
    }
  }

  // Main App flow
  return(
    <>
    { onAppLoad() }
    </>
  )
}

export default ScreenNavigator

