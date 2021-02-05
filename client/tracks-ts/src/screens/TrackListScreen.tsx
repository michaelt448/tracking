import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, Button, FlatList, TouchableOpacity } from 'react-native'
import { Context as TrackContext, TrackContextType } from '../contexts/TrackContext'
import { ListItem } from 'react-native-elements'
import { NavigationProp } from '@react-navigation/native'
import { SCREEN_NAMES } from '../models/enums'


const TrackListScreen = ({ navigation }: { navigation: NavigationProp<any>}) => {

  const { state, fetchTrecks } = useContext(TrackContext) as TrackContextType
  const tracks = state.getState()

  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', fetchTrecks)
    // return unsubscribe
  }, [navigation, tracks])

  return <>
  <Text style={{fontSize: 48}}> TrackList Screen </Text>
  <FlatList 
    data={tracks}
    keyExtractor={item => item.getId()}
    renderItem={({ item }) => {
      return <TouchableOpacity onPress={() => {
        navigation.navigate(SCREEN_NAMES.TRACK_DETAIL_SCREEN, { id: item.getId() })
        }}>
        <ListItem.Content>
          <ListItem.Title>
            { item.getName() }
          </ListItem.Title>
          <ListItem.Chevron />
        </ListItem.Content>
      </TouchableOpacity>
    }}
    />
  </>
}

TrackListScreen.navigationOptions = {
  title: 'Tracks'
}

const styles = StyleSheet.create({})

export default TrackListScreen