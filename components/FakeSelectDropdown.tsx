import React, { useState } from 'react'
import { GestureResponderEvent, StyleSheet, View, Pressable } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { ThemeProps } from '../types'
import { Text, useThemeColor } from './Themed'
import { Ionicons } from '@expo/vector-icons'
import makePressableStyle from '../helpers/makePressableStyle'
import { marginTop } from 'styled-system'

interface Props {
  value?: string
  placeholder: string
  onPress: ((event: GestureResponderEvent) => void) & (() => void)
  disabled?: boolean
  showResetButton: boolean
  onReset: () => void
}

const FakeSelectDropdown: React.FC<Props & ThemeProps> = ({
  value,
  placeholder,
  onPress,
  darkColor,
  lightColor,
  disabled,
  showResetButton,
  onReset,
}) => {
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border')
  const raisedBackgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'raisedBackground')
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'muted')

  const customStyle = { borderColor, backgroundColor: raisedBackgroundColor }

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.root, customStyle, makePressableStyle(pressed, lightColor, darkColor)]}
    >
      <View style={styles.select}>
        <Text style={styles.text}>{value ? value : placeholder}</Text>
        {showResetButton && (
          <Pressable
            disabled={disabled}
            style={({ pressed }) => [
              { borderRadius: 999, padding: 4, marginTop: -4, marginBottom: -4 },
              makePressableStyle(pressed, lightColor, darkColor),
            ]}
            onPress={onReset}
          >
            <Ionicons name="ios-close-circle-outline" size={20} color={color} />
          </Pressable>
        )}
        <Ionicons name="ios-chevron-down-outline" size={18} color={color} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  containerRoot: {
    width: '100%',
    maxWidth: 300,
  },
  root: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 12,
    paddingLeft: 16,
    paddingRight: 16,
  },
  select: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
})

export default FakeSelectDropdown
