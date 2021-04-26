import { atom } from 'recoil'
import { StationPair } from '../types'

export const liveTrains_departureStationAtom = atom<StationPair | null>({
  key: 'liveTrains_departureStation',
  default: null,
})

export const liveTrains_departureStationFilterAtom = atom({
  key: 'liveTrains_departureStationFilter',
  default: '',
})
