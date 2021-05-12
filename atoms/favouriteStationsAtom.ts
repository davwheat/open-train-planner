import { atom } from 'recoil'
import { persistentAtom } from 'recoil-persistence/react-native'
import type { StationPair } from '../types'

export const favouriteStationsAtom = persistentAtom<StationPair[]>({
  key: 'favouriteStations',
  default: [],
})

export const favouriteStationsFilterAtom = atom({
  key: 'favouriteStations__filter',
  default: '',
})
