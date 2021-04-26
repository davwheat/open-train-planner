import { atom } from 'recoil'

interface APIStatus {
  /**
   * Is the API down?
   *
   * Default: `null`
   */
  isDown: boolean | null
  /**
   * Is the downtime known about?
   *
   * Default: `null`
   */
  isKnownDown: boolean | null
}

/**
 * Contains information about API downtime.
 *
 * - `huxley2`: self-hosted National Rail API proxy
 */
interface FullAPIStatus {
  huxley2: APIStatus
}

export const apiStatusAtom = atom<FullAPIStatus>({
  key: 'apiStatus',
  default: {
    huxley2: {
      isDown: null,
      isKnownDown: null,
    },
  },
})
