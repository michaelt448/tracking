import React, { useContext } from 'react'
import { Input, Button } from 'react-native-elements'
import Spacer from './Spacer'
import { Context as LocationContext, LocationContextType } from '../contexts/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'

const TrackForm = () => {
  const { state, startRecording, stopRecording, changeName } = useContext(LocationContext) as LocationContextType
  const { currentRouteName, recording, locations } = state.getState()
  const [ saveTrack ] = useSaveTrack()
  return(
    <>
    <Spacer>
    <Input value={currentRouteName} onChangeText={changeName} placeholder='Enter names'/>
    </Spacer>
    <Spacer>
    {recording ? 
    <Button title='Stop Recording' onPress={stopRecording}/>: 
    <Button title='Start Recording' onPress={startRecording}/>
    }
    </Spacer>
    { !recording && locations.length ? <Button title='Save Recording' onPress={saveTrack}/>: null }
    </> 
  )
}

export default TrackForm