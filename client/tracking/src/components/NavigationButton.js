import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import Spacer from './Spacer'


const NavigationButton = ({ navigation, text, destination }) => {
  return <>
    <Spacer>
      <TouchableOpacity onPress={() => navigation.navigate(destination)} style={styles.signInButton}>
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

export default withNavigation(NavigationButton)