import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Map from '../components/Map'
import { SafeAreaView } from 'react-navigation'

const TrackCreateScreen = () => {
  return <SafeAreaView>
    <Text style={{fontSize: 48}}> TrackCreate Screen </Text>
    <Map />
    </SafeAreaView>
}

const styles = StyleSheet.create({})

export default TrackCreateScreen