import type { ILocation } from './Location'
import type { ICallingPoint } from './CallingPoint'
import type { ITrainFormation } from './TrainFormation'
import getOriginsOrDestinationsAsText from '../helpers/getOriginsOrDestinationsAsText'
import { getTimeDifference, getTimeDifferenceText } from '../helpers/getTimeDifference'

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

/**
 * Adhoc Alerts. May contain HTML elements?
 *
 * Unsure about this type.
 */
export type AdhocAlerts = string[]
export class TrainService {
  data: ITrainService

  constructor(data: ITrainService) {
    this.data = data
  }

  /**
   * Retrieves either the `currentOrigins` or the `origin`, depending
   * on what is defined.
   *
   * @readonly
   * @memberof TrainService
   */
  get activeOrigins(): ILocation[] {
    return this.data.currentOrigins || this.data.origin
  }

  /**
   * Retrieves either the `currentDestinations` or the `destination`,
   * depending on what is defined.
   *
   * @readonly
   * @memberof TrainService
   */
  get activeDestinations(): ILocation[] {
    return this.data.currentDestinations || this.data.destination
  }

  /**
   * Gets a string that represents the departure time for this service
   * in HH:MM form.
   *
   * @readonly
   * @memberof TrainService
   */
  get departureTime(): string {
    const etd = this.data.etd

    return (!['on time', 'delayed', 'cancelled', ''].includes(this.data.etd?.toLowerCase() || '') ? etd : this.data.std) as string
  }

  getTimeDifference(): number {
    return getTimeDifference(this.departureTime)
  }

  getTimeDifferenceString(): string {
    return getTimeDifferenceText(this.getTimeDifference())
  }

  getOriginsText(): string {
    return getOriginsOrDestinationsAsText(this.activeOrigins)
  }

  getDestinationsText(): string {
    return getOriginsOrDestinationsAsText(this.activeDestinations)
  }

  /**
   * Returns the service's ETD.
   *
   * Usually either `'On time'`, `'Delayed'`, `'Cancelled'` or a time.
   */
  get estimatedTimeOfDeparture(): string {
    return this.data.etd || ''
  }

  /**
   * Returns the service's ETD.
   *
   * Usually either `'On time'`, `'Delayed'`, `'Cancelled'` or a time.
   */
  get timetabledTimeOfDeparture(): string {
    return this.data.etd || ''
  }

  get isCancelledOrDelayed(): boolean {
    return this.data.isCancelled || this.data.isCancelled
  }

  get isCancelled(): boolean {
    return this.data.isCancelled
  }

  get isDelayed(): boolean {
    return ['On time', 'Cancelled'].includes(this.estimatedTimeOfDeparture) && this.data.etd !== this.data.std
  }

  /**
   * Gets which platform the train is in.
   *
   * Either a number (e.g. `'1'`), number/letter combo (e.g. `'3b'`), or `'unknown'`.
   */
  get platform(): string {
    return this.data.isPlatformAvailable ? (this.data.platform as string) : 'unknown'
  }
}
