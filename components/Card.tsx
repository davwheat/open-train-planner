import { useToken } from 'native-base'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { ThemeProps } from '../types'
import { useThemeColor } from './Themed'

interface CardProps {
  style?: StyleProp<ViewStyle>
}

const Card: React.FC<CardProps & ThemeProps> = ({ style, children, lightColor, darkColor }) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'raisedBackground')
  const shadow = useToken('shadow', [3])

  const customStyle = { backgroundColor, ...shadow }

  return <View style={[styles.cardRoot, customStyle, style]}>{children}</View>
}

const styles = StyleSheet.create({
  cardRoot: {
    borderRadius: 8,
    width: '100%',
    display: 'flex',
    padding: 16,
    margin: 8,
  },
})

export default Card
