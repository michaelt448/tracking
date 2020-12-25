import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationEvents } from 'react-navigation'

import AuthenticationForm from '../components/AuthenticationForm'
import NavigationButton from '../components/NavigationButton'

import { Context as AuthContext } from  '../context/AuthContext'

const SignInScreen = ({ navigation }) => {
  const { state, signIn, clearErrorMessage } = useContext(AuthContext)

  const { error } = state

  return <View style={styles.container}>
    <NavigationEvents 
    onWillFocus={() => { clearErrorMessage()}}/>
    <AuthenticationForm 
    title='Sign In to Tracker'
    buttonName='Sign In'
    error= {error}
    onSubmit={(input) => signIn(input)}/>
    <NavigationButton 
    text='Dont have an account? Signup in instead'
    destination='Signup'/>
  </View>
}

SignInScreen.navigationOptions = () => {
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

export default SignInScreen