import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import AuthenticationForm from '../components/AuthenticationForm'
import NavigationButton from '../components/NavigationButton'
import { SCREEN_NAMES } from '../models/enums'
import { AuthContextType, Context as AuthenticationContext } from '../contexts/AuthContext'
import { NavigationProp } from '@react-navigation/native'

const SigninScreen = ({ navigation }: { navigation: NavigationProp<any>}) => {
  const { state, signIn, clearErrorMessage } = useContext(AuthenticationContext) as AuthContextType
  const { error } = state.getState()

  useEffect(() => {
    const clearMessage = navigation.addListener('focus', clearErrorMessage)
    return clearMessage
  }, [navigation, error])
  return <View>
    <AuthenticationForm buttonName='Login' title='Sign in Now!' onSubmit={signIn} error={error} errorMesasge='Failed to signIn'/>
    <NavigationButton text='Navigate to signup' destination={SCREEN_NAMES.SIGN_UP_SCREEN}/>
    </View>
}

export default SigninScreen