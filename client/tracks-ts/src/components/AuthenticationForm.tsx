import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import { AuthenticationCredentials } from '../contexts/AuthContext'

import Spacer from './Spacer'

const AuthenticationForm = ({ buttonName, title, onSubmit, error, errorMesasge }: {buttonName: string, title: string, onSubmit: ({ email, password }: AuthenticationCredentials) => void, error: string, errorMesasge: string }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return <>
    <Spacer>
      <Text h3> {title} </Text>
    </Spacer>
    <Input label='Email' 
    value={email}
    onChangeText={setEmail}
    autoCapitalize='none'
    autoCorrect={false} />
    <Input label='Password' 
    value={password}
    onChangeText={setPassword}
    autoCapitalize='none'
    autoCorrect={false}
    secureTextEntry />
    { error ? <Spacer><Text style={ styles.errorMessage }> {errorMesasge} </Text></Spacer> : null }
    <Spacer>
      <Button title={buttonName} onPress={() => onSubmit({ email, password })} />
    </Spacer>
  </>
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 16
  }
})

export default AuthenticationForm