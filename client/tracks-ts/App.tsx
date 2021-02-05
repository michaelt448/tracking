import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { Provider as AuthProvider } from './src/contexts/AuthContext'
import { Provider as LocationProvider } from './src/contexts/LocationContext'
import { Provider as TrackProvider } from './src/contexts/TrackContext'
import ScreenNavigator from './src/components/ScreensNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'


const App: React.FC = (): JSX.Element => {
  return (
    <SafeAreaProvider >
      <TrackProvider>
      <LocationProvider>
      <AuthProvider>
        <NavigationContainer>
          <ScreenNavigator />
        </NavigationContainer>
      </AuthProvider>
      </LocationProvider>
      </TrackProvider>
    </SafeAreaProvider>
  );
}

export default App