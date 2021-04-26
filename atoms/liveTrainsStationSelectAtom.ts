import { atom } from 'recoil'
import { StationPair } from '../types'

export const liveTrainsStationSelectAtom = atom<{
  filter: string
  selected: StationPair | null
}>({
  key: 'liveTrainsStationSelect',
  default: {
    filter: '',
    selected: null,
  },
})
