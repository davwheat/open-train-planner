import React from 'react'

import { getTimeDifference } from '../../../helpers/getTimeDifference'
import type { ITrainService } from '../../../models/TrainService'
import { Text } from '../../Themed'

interface Props {
  platform: ITrainService['platform']
  estimatedDepartureTime: ITrainService['etd']
  standardDepartureTime: ITrainService['std']
}

const CallingPoints: React.FC<Props> = ({ platform, estimatedDepartureTime, standardDepartureTime }) => {
  const diffInput = (estimatedDepartureTime === 'On time' ? standardDepartureTime : estimatedDepartureTime) as string
  const timeDifference = getTimeDifference(diffInput)

  const departureTime = (estimatedDepartureTime === 'On time' ? standardDepartureTime : estimatedDepartureTime) || 'XX:XX'

  const unknownDeparture = estimatedDepartureTime === 'Cancelled' || estimatedDepartureTime === 'Delayed'
  const departingIn =
    (unknownDeparture ? 'Was departing ' : 'Departing ') +
    (timeDifference > 1 ? `in ${timeDifference} mins (${departureTime})` : `now (${departureTime})`)

  const platformText = platform ? ` from platform ${platform}` : ''

  const detailsText = `${departingIn}${platformText}.`

  return <Text>{detailsText}</Text>
}

export default CallingPoints
