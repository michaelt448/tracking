import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacer from '../components/Spacer'
import { Context as AuthContext, AuthContextType } from '../contexts/AuthContext'

const AccountScreen = () => {

  const { signOut } = useContext(AuthContext) as AuthContextType

  return <SafeAreaView>
  <Text style={{fontSize: 48}}> Account Screen </Text>
  <Spacer>
    <Button title='Sign Out' onPress={() => signOut()} />
  </Spacer>
  </SafeAreaView>
}

export default AccountScreen