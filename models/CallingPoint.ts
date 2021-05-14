import type { ITrainFormation } from './TrainFormation'
import type { AdhocAlerts } from './TrainService'

export interface ICallingPointData {
  assocIsCancelled: boolean
  callingPoint: ICallingPoint
  serviceChangeRequired: boolean

  /**
   * Will only be `0`.
   *
   * - `0` - train
   * - `1` - bus
   * - `2` - ferry
   */
  serviceType: 0
}

export interface ICallingPoint {
  locationName: string

  crs: string
  /**
   * Scheduled time.
   *
   * Arrival time if in `previousCallingPoints` or departure time if in `subsequentCallingPoints`.
   *
   * @example "17:05"
   */
  st: string

  /**
   * Estimated time.
   *
   * Arrival time if in `previousCallingPoints` or departure time if in `subsequentCallingPoints`.
   *
   * Only present if `at` is not.
   *
   * @example "17:05"
   * @example "On time"
   * @example "Delayed"
   */
  et: string

  /**
   * Actual time.
   *
   * Arrival time if in `previousCallingPoints` or departure time if in `subsequentCallingPoints`.
   *
   * Only present if `et` is not.
   *
   * @example "17:05"
   * @example "On time"
   */
  at: string

  isCancelled: boolean

  /**
   * Number of coaches in the train.
   *
   * `0` or `null` means unknown.
   */
  length: number | null

  /**
   * True if the service detaches units from the front at this location.
   *
   * In my experience, it's never `true`.
   */
  detachFront: boolean

  formation: ITrainFormation | null

  /**
   * Unsure about type.
   *
   * List of alert strings to display for this location.
   */
  adhocAlerts: AdhocAlerts
}
