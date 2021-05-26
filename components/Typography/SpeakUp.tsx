import * as React from 'react'
import { StyleSheet } from 'react-native'

import { Text, TextProps } from '../Themed'

const SpeakUp: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text {...props} style={[styles.root, style]} />
}

const styles = StyleSheet.create({
  root: {
    fontSize: 19,
    fontWeight: 'bold',
  },
})

export default SpeakUp
