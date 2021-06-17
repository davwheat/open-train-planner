import { useEffect, useState } from 'react'
import * as Location from 'expo-location'

/**
 * State object that represents the user's current location.
 */
interface ILocationState {
  /**
   * Whether the location fetching process has been completed.
   *
   * This just says that no further changes will be made to the state object
   * unless a manual refresh is called.
   *
   * It does **not** mean that a location is present in the `location` key.
   */
  locationFetched: boolean
  /**
   * Represents the current permission state of location services (whether user
   * has granted, denied, or not selected location services permissions).
   */
  permissionStatus?: Location.PermissionStatus
  /**
   * Store's the current location of the user's device. Latitude and longitude
   * are accessible on the `coords` key of this object.
   */
  location?: Location.LocationObject
}

/**
 * Forces a location update.
 *
 * Resets location state to default, then polls GPS and other location sources
 * to get a new location, before setting the state again.
 */
type ForceLocationUpdateFunc = () => void

/**
 * Function that returns the user's current location.
 *
 * Second returned value can be used to force a refresh of location.
 */
export default function useLocation(): [ILocationState, ForceLocationUpdateFunc] {
  const [location, setLocation] = useState<ILocationState>({ locationFetched: false })

  async function updateLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync()

    const state: ILocationState = {
      locationFetched: true,
      permissionStatus: status,
      location: await Location.getCurrentPositionAsync({ mayShowUserSettingsDialog: true, accuracy: Location.LocationAccuracy.High }),
    }

    setLocation(state)
  }

  useEffect(() => {
    updateLocation()
  }, [])

  return [
    location,
    () => {
      setLocation({ locationFetched: false })
      updateLocation()
    },
  ]
}
