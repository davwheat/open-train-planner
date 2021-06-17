import getStationsList from './getStationsList'
import { getDistance } from 'geolib'

import type { StationFullItem } from '../types'
import type { LocationObject } from 'expo-location'

export type FullStationItemWithDistance = { distance: number } & StationFullItem

/**
 * Fetches a list of max. 10 stations within 10km of a given location.
 *
 * @param location LocationObject to base search around
 * @returns List of stations within 10km of `location`
 */
export default function getNearbyStations(location: LocationObject): FullStationItemWithDistance[] {
  const stationsList = getStationsList.withLocation()

  // Add location to stations, filter to within 10km
  let nearbyStations: FullStationItemWithDistance[] = stationsList.reduce((acc, stn) => {
    const distanceInMetres = getDistance({ lat: location.coords.latitude, lon: location.coords.longitude }, { lat: stn.lat, lon: stn.long })

    if (distanceInMetres < 10_000) {
      const newStn: FullStationItemWithDistance = { ...stn, distance: distanceInMetres }

      return [...acc, newStn]
    } else {
      return acc
    }
  }, [] as FullStationItemWithDistance[])

  // Sort by distance, low to high
  nearbyStations.sort((a, b) => a.distance - b.distance)

  // Limit to first 10
  return nearbyStations.slice(0, 10)
}
