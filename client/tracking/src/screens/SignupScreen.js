import React, { useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationEvents } from 'react-navigation'

import AuthenticationForm from '../components/AuthenticationForm'
import NavigationButton from '../components/NavigationButton'

import { Context as AuthContext } from  '../context/AuthContext'

const SignupScreen = ({ navigation }) => {
  const { state, signUp, clearErrorMessage } = useContext(AuthContext)


  const { error } = state

  return <View style={styles.container}>
    <NavigationEvents 
    onWillFocus={() => {clearErrorMessage()}}/>
    <AuthenticationForm 
    title='Sign up for Tracker'
    buttonName='Sign Up'
    error= {error}
    onSubmit={(input) => signUp(input)}/>
    <NavigationButton 
    text='Already have an account? Sign in instead'
    destination='Signin'/>
  </View>
}

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  }
})

export default SignupScreen