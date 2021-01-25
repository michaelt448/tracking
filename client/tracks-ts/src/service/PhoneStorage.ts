import AsyncStorage from '@react-native-async-storage/async-storage'
const ACCESS_TOKEN_KEY = 'accessToken'

const getAccessToken = () => {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY)
}

const setAccessToken = (accessToken: string) => {
  return AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

const removeAccessToken = () => {
  return AsyncStorage.removeItem(ACCESS_TOKEN_KEY)
}

export { getAccessToken, setAccessToken, removeAccessToken }