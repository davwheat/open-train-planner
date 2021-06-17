import type { ILocation } from './Location'
import type { ICallingPoint, ICallingPointData } from './CallingPoint'
import type { ITrainFormation } from './TrainFormation'
import { default as applyStringifyOptions, StringifyFunctionOptions } from '../helpers/applyStringifyOptions'
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
  previousCallingPoints?: ICallingPointData[] | null

  /**
   * Only present if on Departures or Arrivals & Departures **and** `?expand=true` is set when calling the endpoint.
   *
   * `null` if there are no previous stops.
   */
  subsequentCallingPoints?: ICallingPointData[] | null

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
   */
  get activeOrigins(): ILocation[] {
    return this.data.currentOrigins || this.data.origin
  }

  /**
   * Retrieves either the `currentDestinations` or the `destination`,
   * depending on what is defined.
   */
  get activeDestinations(): ILocation[] {
    return this.data.currentDestinations || this.data.destination
  }

  /**
   * Retrieves either the scheduled origins if the service is cancelled,
   * or the active origins is not available.
   */
  get applicableOrigins(): ILocation[] {
    if (this.isCancelled) return this.data.origin

    return this.activeOrigins
  }

  /**
   * Retrieves either the scheduled destinations if the service is cancelled,
   * or the active destinations is not available.
   */
  get applicableDestinations(): ILocation[] {
    if (this.isCancelled) return this.data.destination

    return this.activeDestinations
  }

  /**
   * Retrieves the train's scheduled origin(s).
   *
   * @readonly
   * @memberof TrainService
   */
  get scheduledOrigins(): ILocation[] {
    return this.data.origin
  }

  /**
   * Retrieves the train's scheduled destination(s).
   *
   * @readonly
   * @memberof TrainService
   */
  get scheduledDestinations(): ILocation[] {
    return this.data.destination
  }

  /**
   * If cancelled, returns the scheduled destination, otherwise (if available) returns the active (changed) destination,
   * otherwise returns the scheduled destination.
   */
  get destinationText(): string {
    return getOriginsOrDestinationsAsText(this.applicableDestinations)
  }

  /**
   * If cancelled, returns the scheduled origin, otherwise (if available) returns the active (changed) origin,
   * otherwise returns the scheduled origin.
   */
  get originsText(): string {
    return getOriginsOrDestinationsAsText(this.applicableOrigins)
  }

  /**
   * Returns the via text of the applicable destination, if only one destination is specified.
   *
   * If none, returns `null`.
   */
  get viaText(): string | null {
    if (this.applicableDestinations.length === 1) {
      const via = this.applicableDestinations[0].via

      if (via?.toLowerCase()?.startsWith('via ')) return `via ${via.substr(4)}`
      else if (via) return `via ${via}`
    }

    return null
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

  /**
   * Gets a string that states when this train will depart.
   *
   * @example "in 5 mins"
   * @example "now"
   */
  getTimeDifferenceString(): string {
    return getTimeDifferenceText(this.getTimeDifference())
  }

  /**
   * Creates a string that combines the scheduled origins for this train.
   */
  getScheduledOriginsText(): string {
    return getOriginsOrDestinationsAsText(this.scheduledOrigins)
  }

  /**
   * Creates a string that combines the scheduled destinations for this train.
   */
  getScheduledDestinationsText(): string {
    return getOriginsOrDestinationsAsText(this.scheduledDestinations)
  }

  /**
   * Creates a string that combines the active origins, if defined, otherwise the scheduled origins for this train.
   */
  getActiveOriginsText(): string {
    return getOriginsOrDestinationsAsText(this.activeOrigins)
  }

  /**
   * Creates a string that combines the active destinations, if defined, otherwise the scheduled destinations for this train.
   */
  getActiveDestinationsText(): string {
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
    return this.data.std || ''
  }

  get isCancelledOrDelayed(): boolean {
    return this.data.isCancelled || this.data.isCancelled
  }

  get isCancelled(): boolean {
    return this.data.isCancelled
  }

  get isDelayed(): boolean {
    return !['On time', 'Cancelled'].includes(this.estimatedTimeOfDeparture) && this.data.etd !== this.data.std
  }

  /**
   * Gets which platform the train is in.
   *
   * Either a number (e.g. `'1'`), number/letter combo (e.g. `'3b'`), or `'unknown'`.
   */
  get platform(): string {
    return this.data.isPlatformAvailable ? (this.data.platform as string) : 'unknown'
  }

  get operatingCompany(): string {
    return this.data.operator || ''
  }

  /**
   * Get the number of coaches in this service.
   *
   * @example '12 coaches'
   * @example '1 coach'
   * @example '' // unknown length
   */
  getCoachesText(options: Partial<StringifyFunctionOptions>): string {
    let text = ''

    if (this.data.length === 1) {
      text = '1 coach'
    } else if (this.data.length ?? 0 > 1) {
      text = `${this.data.length} coaches`
    } else {
      return ''
    }

    return applyStringifyOptions(text, options)
  }

  /**
   * Get the number of coaches in this service.
   *
   * @example 'Formed of 12 coaches'
   * @example 'Formed of 1 coach'
   * @example '' // unknown length
   */
  getFormedOfCoachesText(options: Partial<StringifyFunctionOptions>): string {
    const coaches = this.getCoachesText({ addFullStop: false, capitaliseStart: false })

    const out = coaches ? `formed of ${coaches}` : ''

    if (out) {
      return applyStringifyOptions(out, options)
    } else return ''
  }

  /**
   * Returns the delay reason, or an empty string.
   */
  getDelayReason(options: Partial<StringifyFunctionOptions> = {}): string {
    const reason = this.data.delayReason

    if (!reason) return ''

    return applyStringifyOptions(reason, options)
  }

  /**
   * Returns the cancel reason, or an empty string.
   */
  getCancelReason(options: Partial<StringifyFunctionOptions> = {}): string {
    const reason = this.data.cancelReason

    if (!reason) return ''

    return applyStringifyOptions(reason, options)
  }
}
