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

export const liveTrains_arrivalStationAtom = atom<StationPair | null>({
  key: 'liveTrains_arrivalStation',
  default: null,
})

export const liveTrains_arrivalStationFilterAtom = atom({
  key: 'liveTrains_arrivalStationFilter',
  default: '',
})
