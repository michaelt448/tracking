import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { Provider as AuthProvider } from './src/contexts/AuthContext'
import ScreenNavigator from './src/components/ScreensNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'


const App: React.FC = (): JSX.Element => {
  return (
    <SafeAreaProvider >
      <AuthProvider>
        <NavigationContainer>
          <ScreenNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App