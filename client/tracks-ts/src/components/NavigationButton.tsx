import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'

import Spacer from './Spacer'


const NavigationButton = ({ text, destination }: any) => {
  const navigation = useNavigation()
  return <>
    <Spacer>
      <TouchableOpacity onPress={() => navigation.navigate(destination)} >
        <Text style={styles.signInButton}>{text}</Text>
      </TouchableOpacity>
    </Spacer>
  </>
}

const styles = StyleSheet.create({
  signInButton: {
    fontSize: 14,
    color: 'blue'
  }
})

export default NavigationButton