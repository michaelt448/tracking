import React, { useContext, useCallback } from 'react'
import { StyleSheet, Text } from 'react-native'
import Map from '../components/Map'
import { SafeAreaView, withNavigationFocus } from 'react-navigation'
import { Context as LocationContext } from '../context/LocationContext'
import '../_mockLocation'
import useLocation from '../hooks/useLocation'
import TrackForm from '../components/TrackForm'
import { FontAwesome } from '@expo/vector-icons'

const TrackCreateScreen = ({ isFocused }) => {
  const { state: { recording }, addLocation } = useContext(LocationContext)
  const callback = useCallback((location) => addLocation(location, recording), [recording])
  const [error] = useLocation(isFocused || recording, callback)
  return <SafeAreaView>
    <Text style={{fontSize: 48}}> TrackCreate Screen </Text>
    <Map />
    { error ? <Text> please enable location services </Text>: null }
    <TrackForm />
    </SafeAreaView>
}

TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  tabBarIcon: <FontAwesome name="plus" size={20} />
}

const styles = StyleSheet.create({})

export default withNavigationFocus(TrackCreateScreen)