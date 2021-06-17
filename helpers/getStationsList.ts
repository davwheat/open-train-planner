import type { StationFullItem, StationPair } from '../types'
import stations from 'uk-railway-stations'

const stationPairList = stations.reduce((acc, stn) => [...acc, { stationName: stn.stationName, crsCode: stn.crsCode }], [] as StationPair[])

export default function getStationsList(): StationPair[] {
  return stationPairList
}

getStationsList.withLocation = function withLocation(): StationFullItem[] {
  return stations
}
