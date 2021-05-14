import React from 'react'

import { VStack } from 'native-base'

import StopItem from './StopItem'

import { TrainService } from '../../../../models/TrainService'
import { Text } from '../../../Themed'

interface Props {
  train: TrainService
}

const CallingPoints: React.FC<Props> = ({ train }) => {
  const data = train.data.subsequentCallingPoints
  const callingPoints = data ? data[0].callingPoint : null

  return (
    <VStack space={0} mt={4}>
      <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>Calling at...</Text>
      {Array.isArray(callingPoints) &&
        callingPoints.map((callingPoint, i) => (
          <StopItem key={`${callingPoint.crs}__${callingPoint.st}`} callingPoint={callingPoint} isLast={i === callingPoints?.length - 1} />
        ))}
    </VStack>
  )
}

export default CallingPoints
