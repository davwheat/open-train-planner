import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Center, VStack, HStack } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { Text, useThemeColor } from '../Themed'
import type { ThemeProps } from '../../types'
import TrainFullDetailsCard from './TrainFullDetails'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { TrainService } from '../../models/TrainService'
import { cancelledColor, delayedColor } from '../../constants/Colors'

const TrainItem: React.FC<ThemeProps & { service: TrainService }> = ({ lightColor, darkColor, service }) => {
  const mutedColor = useThemeColor({ light: lightColor, dark: darkColor }, 'muted')
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'controlPressed')

  const [isDetailsModalShown, setIsDetailsModalShown] = useState(false)

  const extraInfo = `${service.data.operator}`
  // const timeDifference = service.getTimeDifference()

  const [timeDifferenceText, setTimeDifferenceText] = useState(service.getTimeDifferenceString())

  const destinationText = service.getScheduledDestinationsText()

  useEffect(() => {
    const intervalKey = setInterval(() => {
      if (service.getTimeDifferenceString() !== timeDifferenceText) {
        setTimeDifferenceText(service.getTimeDifferenceString())
      }
    }, 10 * 1000)

    return () => {
      clearInterval(intervalKey)
    }
  })

  function onPress() {
    setIsDetailsModalShown(true)
  }

  const timeChanged = service.estimatedTimeOfDeparture !== 'On time'

  return (
    <TouchableHighlight underlayColor={backgroundColor} onPress={onPress}>
      <HStack space={2} style={[styles.root, { borderBottomColor: mutedColor }]}>
        <Center style={styles.trainTimes}>
          <Text style={[styles.ogTime, timeChanged && styles.strikeThrough, !timeChanged && styles.bold]}>
            {service.timetabledTimeOfDeparture}
          </Text>
          {timeChanged && (
            <Text style={[styles.timeStatus, styles.bold, service.isCancelled && styles.cancelled, service.isDelayed && styles.delayed]}>
              {service.estimatedTimeOfDeparture}
            </Text>
          )}
        </Center>
        <VStack space={1} style={styles.trainDetails}>
          <Text style={[styles.destination, service.isCancelled && styles.badTrain]}>{destinationText}</Text>
          <Text style={[styles.extraInfo, service.isCancelled && styles.badTrain]}>{extraInfo}</Text>
        </VStack>
        <Center>
          <Ionicons name="ios-chevron-forward-outline" size={24} color={mutedColor} />
        </Center>
        <TrainFullDetailsCard onClose={() => setIsDetailsModalShown(false)} trainService={service} open={isDetailsModalShown} />
      </HStack>
    </TouchableHighlight>
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
  trainDetails: {
    flex: 1,
  },
  trainTimes: {
    alignContent: 'center',
    display: 'flex',
    minWidth: 52,
    justifyContent: 'center',
  },
  skeleton: {
    margin: 0,
  },
  destination: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 18,
    margin: 0,
  },
  extraInfo: {
    fontSize: 14,
    lineHeight: 16,
    margin: 0,
  },
  time: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 18,
    margin: 0,
  },
  timeStatus: {
    letterSpacing: -0.25,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 14,
    margin: 0,
    // opacity: 0.75,
  },
  ogTime: {
    fontSize: 16,
    // marginLeft: -2,
    // marginRight: 12,
  },
  cancelled: {
    color: cancelledColor,
  },
  delayed: {
    color: delayedColor,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
  },
  bold: {
    fontWeight: 'bold',
  },
})

export default TrainItem
