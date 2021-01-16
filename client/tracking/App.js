import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

// Navigation
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation'

import {
  createStackNavigator
} from 'react-navigation-stack'

import {
  createBottomTabNavigator
} from 'react-navigation-tabs'

// Screens
import AccountScreen from './src/screens/AccountScreen'
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import TrackCreateScreen from './src/screens/TrackCreateScreen'
import TrackDetailScreen from './src/screens/TrackDetailScreen'
import TrackListScreen from './src/screens/TrackListScreen'
import BlankScreen from './src/screens/BlankScreen'

import { Provider as AuthProvider } from './src/context/AuthContext'
import { Provider as LocationProvider } from './src/context/LocationContext'
import { Provider as TrackerProvider } from './src/context/TrackContext'

import { setNavigator }  from './src/navigationRef'

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
})

trackListFlow.navigationOptions = {
  title: 'Tracks', 
  tabBarIcon: <FontAwesome name='th-list' size={20}/>
}
const switchNavigation =  createSwitchNavigator({
  Blank: BlankScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow,
    TrackCreate: TrackCreateScreen,
        Account: AccountScreen,
  })
})

const App = createAppContainer(switchNavigation)

export default () => {
  return (
    <TrackerProvider>
      <LocationProvider>
        <AuthProvider>
          <App ref={(navigator) => { setNavigator(navigator) }}/>
        </AuthProvider>
      </LocationProvider>
    </TrackerProvider>
)
}