import { VStack } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

import type { TrainService } from '../../../models/TrainService'
import { Text } from '../../Themed'

interface Props {
  train: TrainService
}

const BasicTrainInfo: React.FC<Props> = ({ train }) => {
  let text: string[] = []

  if (train.operatingCompany) text.push(`${train.operatingCompany} service`)
  text.push(train.getCoachesText({ addFullStop: true, capitaliseStart: true }))

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
