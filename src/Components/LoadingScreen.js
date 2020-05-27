import React from 'react'
import { View, Text } from 'react-native'
import { Spinner } from 'native-base'
const LoadingScreen = () => {
  return (
    <View style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
      backgroundColor: 'rgba(0,0,0,0.4)'
    }}>
      <Spinner color='white' size={40} />
    </View>
  )
}

export default LoadingScreen
