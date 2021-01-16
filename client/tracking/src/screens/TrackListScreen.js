import React, { useContext } from 'react'
import { StyleSheet, Text, Button, FlatList, TouchableOpacity } from 'react-native'
import { Context as TrackContext } from '../context/TrackContext'
import { NavigationEvents } from 'react-navigation'
import { ListItem } from 'react-native-elements'


const TrackListScreen = ({ navigation }) => {

  const { state: { tracks }, fetchTrecks } = useContext(TrackContext)
  return <>
  <NavigationEvents onWillFocus={fetchTrecks} />
  <Text style={{fontSize: 48}}> TrackList Screen </Text>
  <Button title="Go to detail track" onPress={() => navigation.navigate('TrackDetail')} />
  <FlatList 
    data={tracks}
    keyExtractor={item => item._id}
    renderItem={({ item }) => {
      return <TouchableOpacity onPress={() => {
        navigation.navigate('TrackDetail', { id: item._id })
        }}>
        <ListItem chevron title={item.name}/>
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