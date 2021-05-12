import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Center, VStack } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { Text, useThemeColor } from '../Themed'
import type { ThemeProps } from '../../types'
import TrainFullDetailsCard from './TrainFullDetails'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { TrainService } from '../../models/TrainService'

const TrainItem: React.FC<ThemeProps & { service: TrainService }> = ({ lightColor, darkColor, service }) => {
  const mutedColor = useThemeColor({ light: lightColor, dark: darkColor }, 'muted')
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

  const [isDetailsModalShown, setIsDetailsModalShown] = useState(false)

  const extraInfo = `${service.data.operator}`
  const departureTimeString = service.estimatedTimeOfDeparture
  const timeDifference = service.getTimeDifference()

  const [timeDifferenceText, setTimeDifferenceText] = useState(service.getTimeDifferenceString())

  const destinationText = service.getDestinationsText()

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

  return (
    <TouchableHighlight underlayColor={backgroundColor} onPress={onPress}>
      <View style={[styles.root, { borderBottomColor: mutedColor }]}>
        <Center>
          <Text style={[styles.ogTime, service.isCancelled && styles.badTrain]}>{service.timetabledTimeOfDeparture}</Text>
        </Center>
        <VStack space={1} style={styles.trainDetails}>
          <Text style={[styles.destination, service.isCancelled && styles.badTrain]}>{destinationText}</Text>
          <Text style={[styles.extraInfo, service.isCancelled && styles.badTrain]}>{extraInfo}</Text>
        </VStack>
        <Center style={styles.trainTimes}>
          <Text style={[styles.time, styles.onTime, service.isCancelled && styles.cancelled, service.isDelayed && styles.delayed]}>
            {departureTimeString}
          </Text>
          {!service.isCancelled && timeDifference <= 60 && <Text style={styles.timeStatus}>{timeDifferenceText}</Text>}
        </Center>
        <Center>
          <Ionicons name="ios-chevron-forward-outline" size={24} color={mutedColor} />
        </Center>
        <TrainFullDetailsCard onClose={() => setIsDetailsModalShown(false)} trainData={service.data} open={isDetailsModalShown} />
      </View>
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
    marginRight: 8,
  },
  trainTimes: {
    minWidth: 48,
    marginRight: 8,
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
    opacity: 0.75,
  },
  ogTime: {
    fontSize: 16,
    marginLeft: -2,
    marginRight: 12,
  },
  cancelled: {
    color: '#d22',
  },
  delayed: {
    color: '#d60',
  },
  onTime: {
    color: '#2d2',
  },
  badTrain: {
    fontWeight: 'normal',
    opacity: 0.65,
  },
})

export default TrainItem
