import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Badge } from 'react-native-elements'
const Button = () => {
  return (
    <TouchableHighlight onPress={() => Alert.alert('ok')}>
      <FontAwesome name='bell' size={24} color='#fff' />

    </TouchableHighlight>
  )
}

export default Button
