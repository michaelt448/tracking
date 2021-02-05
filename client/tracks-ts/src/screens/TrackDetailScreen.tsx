import React, { useContext } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Context as TrackContext, TrackContextType } from '../contexts/TrackContext'
import MapView, { Polyline } from 'react-native-maps'
import { NavigationProp, RouteProp } from '@react-navigation/native'

const TrackDetailScreen = ({ route }: { route: RouteProp<any, any>}) => {
  const trackId = route.params?.id ?? null
  const { state } = useContext(TrackContext) as TrackContextType
  const tracks = state.getState()

  const track = tracks.find(trackInstance => trackInstance.getId() === trackId)
  const initialCoords = track?.getLocationPoints()[0].getCoordinates()
  console.log(initialCoords)

  return (
    <>
  <Text style={{fontSize: 48}}> { track?.getName() } </Text>
  <MapView
  style={styles.map}
  initialRegion={{
    longitudeDelta: .01,
    latitudeDelta: .01,
    latitude: 0,
    longitude: 0,
    ...initialCoords
  }}>
    <Polyline coordinates={track ? track?.getLocationPoints().map(loc => loc.getLocation().coords): []} />
  </MapView>
  </>
  )
}

const styles = StyleSheet.create({
  map: {
    height: 300
  }
})

export default TrackDetailScreen