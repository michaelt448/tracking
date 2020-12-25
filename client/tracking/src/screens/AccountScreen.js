import React, { useContext } from 'react'
import { StyleSheet, Text, Button } from 'react-native'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
import { SafeAreaView } from 'react-navigation'

const AccountScreen = () => {
  const { signOut } = useContext(AuthContext)

  return <SafeAreaView forceInset={{ top: 'always' }}>
  <Text style={{fontSize: 48}}> Account Screen </Text>
  <Spacer>
    <Button title='Sign Out' onPress={() => signOut()} />
  </Spacer>
  </SafeAreaView>
}

const styles = StyleSheet.create({})

export default AccountScreen