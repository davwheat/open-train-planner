export interface ILocation {
  locationName: string
  crs: string
  /**
   * Via text
   *
   * @example "via Gatwick Airport"
   */
  via: string | null
  futureChangeTo: string | null
  assocIsCancelled: boolean
}
