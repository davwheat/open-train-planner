import type { IDepartureBoardResponse } from '../models/DepartureBoardResponse'
import NetInfo from '@react-native-community/netinfo'

import GenerateHuxley2Url from './GenerateHuxley2Url'
import openMainSettingsApp from '../helpers/openMainSettingsApp'

import FakeDepartureData from './fakeDeparturesData_ECR.json'

const apiRequestOptions = {
  expand: 'true',
  timeOffset: '0',
  timeWindow: '120',
}

const USE_DEBUG_DATA = false

interface DepartureBoardOptions {
  crsCode: string
  filterType?: 'from' | 'to'
  filterCrsCode?: string
}

export default async function FetchDepartureBoard({
  crsCode,
  filterType = 'to',
  filterCrsCode = undefined,
}: DepartureBoardOptions): Promise<IDepartureBoardResponse> {
  let url = filterCrsCode
    ? GenerateHuxley2Url('all', [crsCode, filterType, filterCrsCode], apiRequestOptions)
    : GenerateHuxley2Url('all', [crsCode], apiRequestOptions)

  if (USE_DEBUG_DATA) return filterServicesToDepartingTrainsOnly(FakeDepartureData as unknown as IDepartureBoardResponse)

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
    return filterServicesToDepartingTrainsOnly((await response.json()) as IDepartureBoardResponse)
  }
}

function filterServicesToDepartingTrainsOnly(data: IDepartureBoardResponse): IDepartureBoardResponse {
  const newServices = data.trainServices?.filter(s => s.etd)
  data.trainServices = newServices ?? null

  return data
}
