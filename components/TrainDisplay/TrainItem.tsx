import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Center, VStack } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { Text, useThemeColor } from '../Themed'
import type { ThemeProps } from '../../types'
import { ITrainService } from '../../models/TrainService'
import getTimeDifference from '../../helpers/getTimeDifference'

const TrainItem: React.FC<ThemeProps & { service: ITrainService }> = ({ lightColor, darkColor, service }) => {
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'muted')

  const destinations = service.currentDestinations || service.destination
  const destinationText = destinations.reduce((prev, val, i) => {
    if (i === 0) {
      return val.locationName
    } else if (i === destinations.length - 1) {
      return `${prev} and ${val.locationName}`
    } else {
      return `${prev}, ${val.locationName}`
    }
  }, '')

  const diffInput = (service.etd !== 'On time' && service.etd !== 'Cancelled' && service.etd !== 'Delayed' ? service.etd : service.std) as string

  const extraInfo = `${service.operator}`
  const time = service.etd
  const timeDifference = getTimeDifference(diffInput)

  console.log(diffInput, 'diff', timeDifference)

  const isDelayed = service.etd !== 'On time' && service.etd !== 'Cancelled' && service.etd !== service.std

  return (
    <View style={[styles.root, { borderBottomColor: borderColor }]}>
      <Center>
        <Text style={[styles.ogTime, service.isCancelled && styles.badTrain]}>{service.std}</Text>
      </Center>
      <VStack space={1} style={styles.trainDetails}>
        <Text style={[styles.destination, service.isCancelled && styles.badTrain]}>{destinationText}</Text>
        <Text style={[styles.extraInfo, service.isCancelled && styles.badTrain]}>{extraInfo}</Text>
      </VStack>
      <Center style={styles.trainTimes}>
        <Text style={[styles.time, styles.onTime, service.isCancelled && styles.cancelled, isDelayed && styles.delayed]}>{time}</Text>
        {!service.isCancelled && timeDifference <= 60 && <Text style={styles.timeStatus}>in {timeDifference} mins</Text>}
      </Center>
      <Center>
        <Ionicons name="ios-chevron-forward-outline" size={24} color="white" />
      </Center>
    </View>
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
