import React from 'react'

import { TouchableHighlight } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from './Themed'
import type { ThemeProps } from '../types'
import { StyleSheet } from 'react-native'

interface IRefreshButtonProps {
  onPress: () => void
  size?: number
}

export default function RefreshButton({ onPress, size = 24, lightColor, darkColor }: IRefreshButtonProps & ThemeProps) {
  const mutedColor = useThemeColor({ light: lightColor, dark: darkColor }, 'muted')
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'controlPressed')

  return (
    <TouchableHighlight style={styles.root} underlayColor={backgroundColor} onPress={onPress}>
      <Ionicons color={mutedColor} size={24} name="ios-refresh" />
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 4,
    borderRadius: 4,
  },
})
