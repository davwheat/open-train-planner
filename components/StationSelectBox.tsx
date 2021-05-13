import React, { useRef } from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import { Modalize } from 'react-native-modalize'

import type { StationPair } from '../types'
import FakeSelectDropdown from './FakeSelectDropdown'
import StationSelectModal from './StationSelectModal'

interface Props {
  selectionAtom: RecoilState<StationPair | null>
  filterAtom: RecoilState<string>
  disabled: boolean
}

const StationSelectBox: React.FC<Props> = ({ selectionAtom, filterAtom, disabled = false }) => {
  const [stationSelection, setStationSelection] = useRecoilState(selectionAtom)

  const modalRef = useRef<Modalize>(null)

  const open = () => {
    modalRef.current?.open()
  }

  if (disabled) {
    modalRef.current?.close()
  }

  function onSelectStation(station: StationPair) {
    if (stationSelection?.crsCode !== station.crsCode) {
      setStationSelection(station)
    }

    modalRef?.current?.close()
    setTimeout(() => modalRef?.current?.close(), 250)
  }

  return (
    <>
      <FakeSelectDropdown disabled={disabled} value={stationSelection?.stationName} placeholder="Select station" onPress={open} />
      <StationSelectModal filterAtom={filterAtom} disabled={disabled} modalRef={modalRef} onSelectStation={onSelectStation} />
    </>
  )
}

export default StationSelectBox
