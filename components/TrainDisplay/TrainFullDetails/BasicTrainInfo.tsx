import React from 'react'
import { StyleSheet } from 'react-native'
import { VStack } from 'native-base'

import type { TrainService } from '../../../models/TrainService'
import { Text } from '../../Themed'

interface Props {
  train: TrainService
}

const BasicTrainInfo: React.FC<Props> = ({ train }) => {
  let text: string[] = []

  if (train.operatingCompany)
    text.push(`${train.operatingCompany} service ${train.getFormedOfCoachesText({ addFullStop: true, capitaliseStart: false })}`)

  return (
    <VStack space={1}>
      {text.map(t => (
        <Text key={t} style={styles.description}>
          {t}
        </Text>
      ))}
    </VStack>
  )
}

const styles = StyleSheet.create({
  description: {
    // textTransform: 'uppercase',
    // fontWeight: 'bold',
    // fontSize: 14,
  },
})

export default BasicTrainInfo
