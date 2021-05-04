import React from 'react'

import { StyleSheet, View } from 'react-native'

import { Headline } from '../../Typography'
import getOriginsOrDestinationsAsText from '../../../helpers/getOriginsOrDestinationsAsText'
import { ITrainService } from '../../../models/TrainService'

interface HeaderProps {
  estimatedDepartureTime: ITrainService['etd']
  standardDepartureTime: ITrainService['std']
  destinations: ITrainService['destination'] | ITrainService['origin']
}

export const Header: React.FC<HeaderProps> = ({ destinations, estimatedDepartureTime, standardDepartureTime }) => {
  const departureTime = (estimatedDepartureTime === 'On time' ? standardDepartureTime : estimatedDepartureTime) || 'XX:XX'

  return (
    <View style={styles.header}>
      <Headline>
        {departureTime} • {getOriginsOrDestinationsAsText(destinations)}
      </Headline>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
  },
})
