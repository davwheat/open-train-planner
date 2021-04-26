import type { ITrainService } from './TrainService'
import type { INRCCMessage } from './NRCCMessage'

export interface IDepartureBoardResponse {
  trainServices: ITrainService[]
  busServices: null
  ferryServices: null

  /**
   * ISO timestamp
   *
   * @example "2021-04-26T16:54:46.1156219+00:00"
   */
  generatedAt: string

  /**
   * Name of location
   *
   * @example "East Croydon"
   */
  locationName: string

  /**
   * Location CRS code
   *
   * @example "ECR"
   */
  crs: string

  /**
   * Name of filter location
   *
   * @example "Haywards Heath"
   */
  filterLocationName: string | null

  /**
   * FIlter location CRS code
   *
   * @example "HHE"
   */
  filtercrs: string | null

  /**
   * - `0` - "to" or none
   * - `1` - "from"
   */
  filterType: 0 | 1

  /**
   * An optional list of textual messages that should be displayed with the station board.
   *
   * The message may include embedded and XML encoded HTML-like hyperlinks and paragraphs. The messages are
   * typically used to display important disruption information that applies to the location that the station
   * board was for.
   *
   * Any embedded <p> tags are used to force a new-line in the output. Embedded <a> tags allow links to
   * external web pages that may provide more information. Output channels that do not support HTML should
   * strip out the <a> tags and just leave the enclosed text.
   */
  nrccMessages: INRCCMessage[] | null

  /**
   * An optional value that indicates if platform information is available.
   *
   * If this value is present with the value "true" then platform information will be returned in the service
   * lists.
   *
   * If this value is not present, or has the value "false", then the platform "heading" should be suppressed
   * in the user interface for this station board.
   */
  platformAvailable: boolean

  /**
   * An optional value that indicates if services are currently available for this station board.
   *
   * If this value is present with the value "false" then no services will be returned in the service lists.
   *
   * This value may be set, for example, if access to a station has been closed to the public at short notice,
   * even though the scheduled services are still running. It would be usual in such cases for one of the
   * `nrccMessages` to describe why the list of services has been suppressed.
   */
  areServicesAvailable: boolean
}
