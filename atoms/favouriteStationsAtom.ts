import { persistentAtom } from 'recoil-persistence/react-native'
import type { StationPair } from '../types'

export const favouriteStationsAtom = persistentAtom<StationPair[]>({
  key: 'favouriteStations',
  default: [],
})
