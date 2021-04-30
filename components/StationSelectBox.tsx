import React, { useCallback, useRef } from 'react'
import { RecoilState, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { StyleSheet, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { TouchableHighlight } from 'react-native-gesture-handler'
import Fuse from 'fuse.js'

import { TextArea } from 'native-base'

import { stationsListAtom } from '../atoms'
import type { StationPair, ThemeProps } from '../types'
import { Text, useThemeColor } from './Themed'
import { Headline } from './Typography'
import useKeyboardState from '../hooks/useKeyboardState'
import FakeSelectDropdown from './FakeSelectDropdown'

interface Props {
  selectionAtom: RecoilState<StationPair | null>
  filterAtom: RecoilState<string>
  disabled: boolean
}

interface ItemProps {
  stationName: string
  crsCode: string
  selectionAtom: Props['selectionAtom']
}

const StationSelectBox: React.FC<Props & ThemeProps> = ({ lightColor, darkColor, selectionAtom, filterAtom, disabled = false }) => {
  const stationsList = useRecoilValue(stationsListAtom)
  const stationFilter = useRecoilValue(filterAtom)
  const stationSelection = useRecoilValue(selectionAtom)

  const modalRef = useRef<Modalize>(null)

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'raisedBackground')

  const onOpen = () => {
    modalRef.current?.open()
  }

  if (disabled) {
    modalRef.current?.close()
  }

  const keyboardState = useKeyboardState()
  if (keyboardState) modalRef.current?.open('top')

  const fuse = new Fuse(stationsList.data || [], {
    minMatchCharLength: 2,
    location: 0,
    threshold: 0.4,
    distance: 10,
    keys: ['stationName', 'crsCode'],
  })

  const data = fuse.search(stationFilter).map(result => result.item)

  const Item: React.FC<ItemProps & ThemeProps> = ({ stationName, crsCode, lightColor, darkColor, selectionAtom }) => {
    const borderStyle = { borderTopColor: useThemeColor({ light: lightColor, dark: darkColor }, 'border') }
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

    const setStationSelection = useSetRecoilState(selectionAtom)

    const onPress = useCallback(() => {
      modalRef.current?.close()

      if (stationSelection?.crsCode !== crsCode) {
        setStationSelection({ stationName, crsCode })
      }
    }, [setStationSelection])

    return (
      <TouchableHighlight underlayColor={backgroundColor} onPress={onPress}>
        <View style={[styles.item, borderStyle]}>
          <Text style={styles.title}>{stationName}</Text>
          <Text style={styles.subtitle}>{crsCode}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  const MemoisedItem = React.memo(Item)

  const customModalStyle = [styles.root, { backgroundColor: backgroundColor }]
  const headerComponent = <Header filterAtom={filterAtom} />

  const firstTen = data?.slice(0, 10)

  return (
    <>
      <FakeSelectDropdown disabled={disabled} value={stationSelection?.stationName} placeholder="Select station" onPress={onOpen} />
      <Portal>
        <Modalize
          modalStyle={customModalStyle}
          HeaderComponent={headerComponent}
          ref={modalRef}
          handlePosition="inside"
          handleStyle={styles.handle}
        >
          <View>
            {firstTen?.map(item => (
              <MemoisedItem selectionAtom={selectionAtom} key={item.crsCode} stationName={item.stationName} crsCode={item.crsCode} />
            ))}
          </View>
        </Modalize>
      </Portal>
    </>
  )
}

const Header: React.FC<{ filterAtom: Props['filterAtom'] }> = ({ filterAtom }) => {
  const [stationSelectFilter, setStationSelectFilter] = useRecoilState(filterAtom)

  const onChange = (e: any) => {
    if (stationSelectFilter !== e.nativeEvent.text) {
      setStationSelectFilter(e.nativeEvent.text)
    }
  }

  return (
    <View style={[styles.header]}>
      <Headline>Choose station</Headline>
      <TextArea style={styles.textField} placeholder="Search..." value={stationSelectFilter} onChange={onChange} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    zIndex: 5,

    marginTop: 'auto',

    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 12,

    padding: 24,
    paddingTop: 32,
  },
  header: {
    marginBottom: 16,
  },
  item: {
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderTopWidth: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
  },
  textField: {
    marginTop: 16,
  },
  handle: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
})

export default StationSelectBox
