import React from 'react'

import type { TrainService } from '../../../models/TrainService'
import { Text } from '../../Themed'

interface Props {
  train: TrainService
}

const TrainDescription: React.FC<Props> = ({ train }) => {
  const timeDifference = train.getTimeDifference()
  const unknownDeparture = train.isCancelledOrDelayed

  const departingIn =
    (unknownDeparture ? 'Was departing ' : 'Departing ') +
    (timeDifference > 1 ? `in ${timeDifference} mins (${train.departureTime})` : `now (${train.departureTime})`)

  const platformText = train.platform !== 'unknown' ? ` from platform ${train.platform}` : ''

  const detailsText = `${departingIn}${platformText}.`

  return (
    <>
      <Text>{detailsText}</Text>
      {train.isCancelled && <Text>{train.data.cancelReason}</Text>}
      {train.isDelayed && <Text>{train.data.delayReason}</Text>}
    </>
  )
}

export default TrainDescription
