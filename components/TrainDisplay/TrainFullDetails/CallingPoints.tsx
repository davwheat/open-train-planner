import React from 'react'

import { VStack } from 'native-base'
import { View } from 'react-native'

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
