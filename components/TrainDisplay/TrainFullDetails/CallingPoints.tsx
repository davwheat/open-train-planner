import { VStack } from 'native-base'
import React from 'react'

import type { ICallingPoint } from '../../../models/CallingPoint'

interface Props {
  callingPoints: ICallingPoint[]
}

const CallingPoints: React.FC<Props> = ({ callingPoints }) => {
  return (
    <VStack>
      <View></View>
    </VStack>
  )
}

export default CallingPoints
