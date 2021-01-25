import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import { SCREEN_NAMES } from '../models/enums'
import { Context as AuthenticationContext, AuthContextType } from '../contexts/AuthContext'
import AuthenticationForm from '../components/AuthenticationForm'
import NavigationButton from '../components/NavigationButton'
import { NavigationProp } from '@react-navigation/native'

const SignupScreen = ({ navigation }: { navigation: NavigationProp<any>}) => {
  const { state, signUp, clearErrorMessage } = useContext(AuthenticationContext) as AuthContextType
  const { error } = state.getState()

  useEffect(() => {
    const clearMessage = navigation.addListener('focus', clearErrorMessage)
    return clearMessage
  }, [navigation, error])
  return <View>
    <AuthenticationForm buttonName='Sign Up' title='Sign up Now!' onSubmit={signUp} error={error} errorMesasge='Failed to sign up'/>
    <NavigationButton text='Navigate to signIn' destination={SCREEN_NAMES.SIGN_IN_SCREEN}/>
    </View>
}

export default SignupScreen