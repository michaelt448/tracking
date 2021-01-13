import { useState, useEffect } from 'react'
import * as Permissions from 'expo-location'

export default (shouldTrack, cb) => {
  const [error, setError] = useState(null)
  // const [subscriber, setSubscriber] = useState(null)

  useEffect(() => {
    let subscriber
    const startWatching = async () => {
      try {
        const response = await Permissions.requestPermissionsAsync()
        if (response && !response.grant) {
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
        console.log('there is a new error', err)
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
