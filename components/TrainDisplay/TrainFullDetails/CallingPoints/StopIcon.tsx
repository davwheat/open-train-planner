import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ZStack } from 'native-base'

import { useThemeColor } from '../../../Themed'
import type { ThemeProps } from '../../../../types'
import { cancelledColor, delayedColor } from '../../../../constants/Colors'

interface IProps {
  /**
   * Is this the last station?
   */
  isLast: boolean
  status: 'normal' | 'cancelled' | 'delayed'
}

const StopIcon: React.FC<IProps & ThemeProps> = ({ darkColor, lightColor, isLast, status }) => {
  const mainColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary')
  const mutedColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint')

  return (
    <ZStack style={styles.root}>
      <View
        style={[
          styles.joiner,
          { backgroundColor: mutedColor },
          isLast && { height: '50%', top: 0 },
          status === 'cancelled' && styles.cancelledBlob,
          status === 'delayed' && styles.delayedBlob,
        ]}
      />
      <View
        style={[
          styles.blob,
          { backgroundColor: mainColor },
          status === 'cancelled' && styles.cancelledBlob,
          status === 'delayed' && styles.delayedBlob,
        ]}
      />
      {/* <View style={[styles.joiner, { backgroundColor: mutedColor }]} /> */}
    </ZStack>
  )
}

const BLOB_SIZE = 20
const JOINER_WIDTH = 4

const styles = StyleSheet.create({
  root: {
    marginLeft: 8,
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
  cancelledBlob: {
    backgroundColor: cancelledColor,
  },
  delayedBlob: {
    backgroundColor: delayedColor,
  },
})

export default StopIcon
