import React from 'react'

import { StyleSheet } from 'react-native'
import { VStack, HStack } from 'native-base'

import { Headline, Whisper } from '../../Typography'
import { TrainService } from '../../../models/TrainService'

interface HeaderProps {
  trainService: TrainService
}

export const Header: React.FC<HeaderProps> = ({ trainService }) => {
  const via = trainService.viaText

  return (
    <HStack space={2} style={styles.header}>
      <Headline>{trainService.departureTime}</Headline>
      <Headline>•</Headline>
      <VStack>
        <Headline>{trainService.destinationText}</Headline>
        {via && <Whisper>{via}</Whisper>}
      </VStack>
    </HStack>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})
