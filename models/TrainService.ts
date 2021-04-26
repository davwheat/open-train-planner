export interface ITrainService {
  formation: ITrainFormation
  /**
   * The original origin of the service as per the working timetable.
   */
  origin: ILocation[]

  /**
   * The original destination of the service as per the working timetable.
   */
  destination: ILocation[]

  /**
   * The current origin(s) of the service, provided if the service started at a location other than the original origin.
   *
   * E.g. service cancelled between origin and en-route station(s), this will provided the en-route station the service started at.
   */
  currentOrigins: ILocation[] | null

  /**
   * The current destination(s) of the service, provided if the service started at a location other than the original origin.
   *
   * E.g. service cancelled between origin and en-route station(s), this will provided the en-route station the service started at.
   */
  currentDestinations: ILocation[] | null

  /**
   * Optional scheduled time of arrival.
   *
   * Only present on Arrival or Arrival & Departure boards.
   *
   * @example "15:48"
   */
  sta: string | null

  /**
   * Optional estimated time of arrival, taking into account any delays.
   *
   * Only present on Arrival or Arrival & Departure boards.
   *
   * @example "On time"
   * @example "15:48"
   * @example "Delayed"
   */
  eta: string | null

  /**
   * Optional scheduled time of departure.
   *
   * Only present on Departure or Arrival & Departure boards.
   *
   * @example "15:48"
   */
  std: string | null

  /**
   * Optional estimated time of departure, taking into account any delays.
   *
   * Only present on Departure or Arrival & Departure boards.
   *
   * @example "On time"
   * @example "15:48"
   * @example "Delayed"
   */
  etd: string | null

  /**
   * Platform number that the train is scheduled to arrive to or depart from.
   *
   * @example "1"
   * @example "2"
   */
  platform: string | null

  /**
   * Is the `platform` available?
   *
   * @example true
   */
  isPlatformAvailable: boolean

  /**
   * TOC name
   *
   * @example "Southern"
   * @example "Thameslink"
   */
  operator: string

  /**
   * TOC code
   *
   * @example "SN"
   * @example "TL"
   */
  operatorCode: string

  /**
   * If this value is present and has the value `true` then the service is operating on a circular route through the network
   * and will call again at this location later on its journey. The user interface should indicate this fact to the user, to
   * help them choose the correct service from a set of similar alternatives.
   */
  isCircularRoute: boolean

  /**
   * A flag to indicate that this service is cancelled at this location.
   */
  isCancelled: boolean

  /**
   * A flag to indicate that this service is no longer stopping at the requested from/to filter location.
   */
  filterLocationCancelled: boolean

  /**
   * Will only be `0`.
   *
   * - `0` - train
   * - `1` - bus
   * - `2` - ferry
   */
  serviceType: 0

  /**
   * Number of coaches in the train.
   *
   * `0` or `null` means unknown.
   */
  length: number | null

  /**
   * Retail service ID.
   *
   * First 2 chars are usually the TOC's ID.
   */
  rsid: string

  /**
   * Does the service detaches units from the front at this location.
   *
   * In my experience, it's never `true`.
   */
  detachFront: boolean

  /**
   * Is the train operating in reverse compared to its usual formation.
   */
  isReverseFormation: boolean

  /**
   * Only present if on Arrivals or Arrivals & Departures **and** `?expand=true` is set when calling the endpoint.
   *
   * `null` if there are no previous stops.
   */
  previousCallingPoints?: ICallingPoint[] | null

  /**
   * Only present if on Departures or Arrivals & Departures **and** `?expand=true` is set when calling the endpoint.
   *
   * `null` if there are no previous stops.
   */
  subsequentCallingPoints?: ICallingPoint[] | null

  serviceId: string

  serviceIdPercentEncoded: string

  serviceIdGuid: string

  serviceIdUrlSafe: string

  /**
   * Textual reason for this service being cancelled
   *
   * @example "This train has been cancelled due to a fault on this train"
   */
  cancelReason: string | null

  /**
   * Textual reason for this service being delayed
   *
   * @example "This train has been delayed by a late running train being in front of this one"
   */
  delayReason: string | null
}

export interface ITrainFormation {
  /**
   * Average percentage load across train.
   *
   * `0` if unknown
   */
  avgLoading: number

  avgLoadingSpecified: boolean

  coaches: ITrainFormationCoach[]
}

export interface ITrainFormationCoach {
  coachClass: string
  /**
   * Percentage load.
   *
   * `0` if unknown
   */
  loading: number

  loadingSpecified: boolean

  number: string

  toilet: {
    status: 0 | 1 | 2

    value: 'None' | 'Standard' | 'Accessible' | 'Unknown'
  }
}

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

/**
 * Adhoc Alerts. May contain HTML elements.
 */
export type AdhocAlerts = string[]
