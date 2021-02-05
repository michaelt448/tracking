import React, { useContext } from 'react'
import { Text, StyleSheet, ActivityIndicator } from 'react-native'
import MapView, { Polyline, Circle } from 'react-native-maps'
import { Context as LocationContext, LocationContextType } from '../contexts/LocationContext'

const Map = () => {
 
  const { state } = useContext(LocationContext) as LocationContextType
  const { currentLocation, locations } = state.getState()

  if (!currentLocation) {
    return <ActivityIndicator size='large' style={{ marginTop: 200}} />
  }
 return <MapView  
  style={ style.map }
  initialRegion={{
    ...currentLocation.getCoordinates(),
    latitudeDelta: .01,
    longitudeDelta: .01
  }}
  >
    <Circle 
    center={currentLocation.getCoordinates()}
    radius={30}
    strokeColor='rgba(158,158,255,1.0)'
    fillColor='rgba(158,158,255,0.3)'/>
    <Polyline coordinates={locations.map(loc => loc.getCoordinates())} />
    </MapView>
}

const style = StyleSheet.create({
  map: {
    height: 250
  }
})

export default Map