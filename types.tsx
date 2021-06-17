/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
}

export type BottomTabParamList = {
  Home: undefined
  'Live Trains': undefined
  'Train Planner': undefined
}

export type HomeParamList = {
  Home: undefined
}

export type LiveTrainsParamList = {
  'Live Trains': undefined
}

export type TrainPlannerParamList = {
  'Train Planner': undefined
}

// ------------------------------

export type StationPair = {
  /**
   * Station name.
   */
  stationName: string
  /**
   * Station CRS code.
   */
  crsCode: string
}

export type StationFullItem = {
  /**
   * Station name.
   */
  stationName: string
  /**
   * Station CRS code.
   */
  crsCode: string
  /**
   * Station latitude.
   */
  lat: number
  /**
   * Station longitude.
   */
  long: number
  iataAirportCode: string | null
}

export type ThemeProps = {
  lightColor?: string
  darkColor?: string
}
