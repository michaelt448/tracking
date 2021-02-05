import { useContext } from 'react'
import { Context as TrackContext, TrackContextType } from '../contexts/TrackContext'
import { Context as LocationContext, LocationContextType } from '../contexts/LocationContext' 
import { useNavigation } from '@react-navigation/native'
import { SCREEN_NAMES } from '../models/enums'



export default () => {
  const navigation = useNavigation()
  const { createTrack } = useContext(TrackContext) as TrackContextType
  const { state, reset } = useContext(LocationContext) as LocationContextType
  const { locations, currentRouteName } = state.getState()
  const rawLocations = locations.map(location => location.getLocation())
  const saveTrack = async () => {
    await createTrack(currentRouteName, rawLocations)
    reset()
    navigation.navigate(SCREEN_NAMES.TRACK_LIST_FLOW)
  }

  return [saveTrack]
}