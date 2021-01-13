import React, { useContext } from 'react'
import { Input, Button } from 'react-native-elements'
import Spacer from './Spacer'
import { Context as LocationContext } from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTracks'

const TrackForm = () => {
  const { state, startRecording, stopRecording, changeName } = useContext(LocationContext)
  const { name, recording, locations } = state
  const [ saveTrack ] = useSaveTrack()
  return(
    <>
    <Spacer>
    <Input value={name} onChangeText={changeName} placeholder='Enter names'/>
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