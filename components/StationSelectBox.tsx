import React, { useRef } from 'react'
import { RecoilState, useRecoilState, useSetRecoilState } from 'recoil'
import { Modalize } from 'react-native-modalize'

import type { StationPair } from '../types'
import FakeSelectDropdown from './FakeSelectDropdown'
import StationSelectModal from './StationSelectModal'
import { useResetRecoilState } from 'recoil'

interface Props {
  selectionAtom: RecoilState<StationPair | null>
  filterAtom: RecoilState<string>
  disabled?: boolean
  showResetButton?: boolean
}

const StationSelectBox: React.FC<Props> = ({ selectionAtom, filterAtom, disabled = false, showResetButton = false }) => {
  const [stationSelection, setStationSelection] = useRecoilState(selectionAtom)
  const resetStation = useResetRecoilState(selectionAtom)

  const setFilter = useSetRecoilState(filterAtom)
  const resetFilter = useResetRecoilState(filterAtom)

  const modalRef = useRef<Modalize>(null)

  const open = () => {
    modalRef.current?.open()
  }

  if (disabled) {
    modalRef.current?.close()
  }

  function onSelectStation(station: StationPair) {
    modalRef?.current?.close()

    if (stationSelection?.crsCode !== station.crsCode) {
      setStationSelection(station)
    }

    setFilter('')
  }

  return (
    <>
      <FakeSelectDropdown
        showResetButton={showResetButton}
        onReset={() => {
          resetStation()
          resetFilter()
        }}
        disabled={disabled}
        value={stationSelection?.stationName}
        placeholder="Select station"
        onPress={open}
      />
      <StationSelectModal filterAtom={filterAtom} disabled={disabled} modalRef={modalRef} onSelectStation={onSelectStation} />
    </>
  )
}

export default StationSelectBox
