import React from 'react'
import { HStack, VStack } from 'native-base'

import StopIcon from './StopIcon'
import { Text } from '../../../Themed'
import type { ICallingPoint } from '../../../../models/CallingPoint'
import { StyleSheet } from 'react-native'
import { cancelledColor, delayedColor } from '../../../../constants/Colors'

interface IProps {
  callingPoint: ICallingPoint
  isLast: boolean
}

const StopItem: React.FC<IProps> = ({ callingPoint, isLast }) => {
  const onTime = callingPoint.et === 'On time'
  const cancelled = callingPoint.isCancelled || callingPoint.et === 'Cancelled'

  const status = cancelled ? 'cancelled' : onTime ? 'normal' : 'delayed'

  return (
    <HStack space={3}>
      <StopIcon status={status} isLast={isLast} />

      <VStack space={0.75} style={styles.info}>
        <Text style={styles.name}>{callingPoint.locationName}</Text>
        <HStack space={2}>
          <Text style={[styles.crs, !onTime && styles.strikeThrough]}>{callingPoint.st}</Text>
          {!onTime && <Text style={[styles.crs, styles.bold, styles.delayed, cancelled && styles.cancelled]}>{callingPoint.et}</Text>}
        </HStack>
      </VStack>
    </HStack>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 8,
    borderBottomWidth: 1,
  },
  info: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 18,
    margin: 0,
  },
  crs: {
    fontSize: 14,
    lineHeight: 16,
    margin: 0,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
  },
  cancelled: {
    color: cancelledColor,
  },
  delayed: {
    color: delayedColor,
  },
  bold: {
    fontWeight: 'bold',
  },
})

export default StopItem
