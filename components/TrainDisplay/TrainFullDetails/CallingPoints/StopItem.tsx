import React from 'react'
import { HStack, VStack } from 'native-base'

import StopIcon from './StopIcon'
import { Text } from '../../../Themed'
import type { ICallingPoint } from '../../../../models/CallingPoint'
import { StyleSheet } from 'react-native'

interface IProps {
  callingPoint: ICallingPoint
  isLast: boolean
}

const StopItem: React.FC<IProps> = ({ callingPoint, isLast }) => {
  return (
    <HStack space={3}>
      <StopIcon isLast={isLast} />

      <VStack space={0.75} style={styles.info}>
        <Text style={styles.name}>{callingPoint.locationName}</Text>
        <Text style={styles.crs}>{callingPoint.et !== 'On time' ? callingPoint.et : callingPoint.st}</Text>
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
})

export default StopItem
