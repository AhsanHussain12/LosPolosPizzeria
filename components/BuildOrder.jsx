import { View, Text } from 'react-native'
import React from 'react'

const BuildOrder = ({route}) => {
    const {Item, category } = route.params
  return (
    <View>
      <Text>{Item}</Text>
      <Text>{category}</Text>
    </View>
  )
}

export default BuildOrder