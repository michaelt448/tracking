import { useState, useEffect } from 'react'
import * as Permissions from 'expo-location'
import { LocationCallback } from 'expo-location'

export default (shouldTrack: boolean, cb: LocationCallback) => {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let subscriber: any
    const startWatching = async () => {
      try {
        const response = await Permissions.requestPermissionsAsync()
        if (response && !response.granted) {
          setError(new Error(`User did not grant permission!`))
        }
        setError(null)
  
        subscriber = await Permissions.watchPositionAsync({
          accuracy: Permissions.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        }, cb
        )
        // setSubscriber(subscriber)
      } catch(err) {
        setError(new Error(`User did not grant permission!`))
      }
    }

    if (shouldTrack) {
      startWatching()
    } else {
      subscriber && subscriber.remove()
      subscriber = null
    }
    return () => {
      subscriber && subscriber.remove()
    }
  }, [shouldTrack, cb])

  return [error]
}
