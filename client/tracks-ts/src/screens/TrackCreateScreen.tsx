import { useIsFocused } from '@react-navigation/native'
import React, { useCallback, useContext } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Map from '../components/Map'
import { Context as LocationContext, LocationContextType } from '../contexts/LocationContext'
import useLocation from '../hooks/useLocation'
import { RawLocation } from '../models/types'

const TrackCreateScreen = () => {
  const { state, addLocation } = useContext(LocationContext) as LocationContextType
  const isFocused = useIsFocused()
  const { recording } = state.getState()
  const callback = useCallback((location: RawLocation) => addLocation(location, recording), [recording])
  const [error] = useLocation(isFocused || recording, callback)
  return <SafeAreaView>
    <Text style={{fontSize: 48}}> TrackCreate Screen </Text>
    <Map />
    { error ? <Text> please enable location services </Text>: null }
  </SafeAreaView>
}

export default TrackCreateScreen