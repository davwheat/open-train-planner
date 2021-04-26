import type { IDepartureBoardResponse } from '../models/DepartureBoardResponse'
import NetInfo from '@react-native-community/netinfo'

import GenerateHuxley2Url from './GenerateHuxley2Url'
import openMainSettingsApp from '../helpers/openMainSettingsApp'

const apiRequestOptions = {
  expand: 'true',
  timeOffset: '0',
  timeWindow: '120',
}

export default async function FetchDepartureBoard(
  crsCode: string,
  filterType: 'from' | 'to' = 'to',
  filterCrsCode?: string,
): Promise<IDepartureBoardResponse> {
  let url = filterCrsCode
    ? GenerateHuxley2Url('departures', [crsCode, filterType, filterCrsCode], apiRequestOptions)
    : GenerateHuxley2Url('departures', [crsCode], apiRequestOptions)

  console.log(url)

  const netInfo = await NetInfo.fetch()

  if (!netInfo.isConnected) {
    throw {
      message: "You're not connected to the internet. Check your WiFi settings or enable mobile data.",
      buttons: [
        {
          text: 'Open settings',
          onPress: () => {
            openMainSettingsApp()
          },
        },
        {
          text: 'Close',
          // onPress: () => {
          //   openMainSettingsApp()
          // },
        },
      ],
    }
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw {
      message: "We couldn't fetch train information from National Rail. Please try again later.",
      buttons: [
        {
          text: 'Close',
          // onPress: () => {
          //   openMainSettingsApp()
          // },
        },
      ],
    }
  } else {
    return (await response.json()) as IDepartureBoardResponse
  }
}
