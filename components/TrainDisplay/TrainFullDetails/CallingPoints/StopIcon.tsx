import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ZStack } from 'native-base'

import { useThemeColor } from '../../../Themed'
import type { ThemeProps } from '../../../../types'

interface IProps {
  /**
   * Is this the last station?
   */
  isLast: boolean
}

const StopIcon: React.FC<IProps & ThemeProps> = ({ darkColor, lightColor, isLast }) => {
  const mainColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary')
  const mutedColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint')

  return (
    <ZStack style={styles.root}>
      <View style={[styles.joiner, { backgroundColor: mutedColor }, isLast ? { height: '50%', top: 0 } : {}]} />
      <View style={[styles.blob, { backgroundColor: mainColor }]} />
      {/* <View style={[styles.joiner, { backgroundColor: mutedColor }]} /> */}
    </ZStack>
  )
}

const BLOB_SIZE = 20
const JOINER_WIDTH = 4

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: BLOB_SIZE,
  },
  joiner: {
    // position: 'absolute',
    width: JOINER_WIDTH,
    height: '100%',
    zIndex: 1,
    display: 'flex',
    // left: '50%',
  },
  blob: {
    // position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: BLOB_SIZE / 2,
    zIndex: 2,
    // left: -BLOB_SIZE / 2,
    // top: 0,
    // transform: [{ translateY: '-100%' }],
  },
})

export default StopIcon
