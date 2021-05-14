import React from 'react'

import { VStack } from 'native-base'

import type { TrainService } from '../../../models/TrainService'
import { Text } from '../../Themed'

interface Props {
  train: TrainService
}

const TrainDescription: React.FC<Props> = ({ train }) => {
  const timeDifference = train.getTimeDifferenceString()
  const unknownDeparture = train.isCancelledOrDelayed

  const departingIn = (unknownDeparture ? 'Was departing ' : 'Departing ') + `${timeDifference} (${train.departureTime})`

  const platformText = train.platform !== 'unknown' ? ` from platform ${train.platform}` : ''

  const detailsText = `${departingIn}${platformText}.`

  const cancelReason = train.getDelayReason()
  const delayReason = train.getDelayReason()

  return (
    <VStack space={1}>
      <Text>{detailsText}</Text>
      {train.isCancelled && cancelReason ? <Text>{train.getCancelReason()}</Text> : null}
      {train.isDelayed && delayReason ? <Text>{train.getDelayReason()}</Text> : null}
    </VStack>
  )
}

export default TrainDescription
