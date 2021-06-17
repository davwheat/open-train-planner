import React, { useCallback } from 'react'
import { RecoilState, useRecoilState, useRecoilValue } from 'recoil'
import { StyleSheet, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { TouchableHighlight } from 'react-native-gesture-handler'
import Fuse from 'fuse.js'
import { Ionicons } from '@expo/vector-icons'

import { TextField, HStack, VStack } from 'native-base'

import { favouriteStationsAtom } from '../atoms'
import type { StationPair, ThemeProps } from '../types'
import { Text, useThemeColor } from './Themed'
import { Headline, SpeakUp } from './Typography'
import getStationsList from '../helpers/getStationsList'

interface Props {
  onSelectStation: (station: StationPair) => void
  filterAtom: RecoilState<string>
  disabled?: boolean
  open?: boolean
  modalRef: React.RefObject<Modalize>
  showFavouriteStationsInList: boolean
}

interface ItemProps {
  stationName: string
  crsCode: string
}

const StationSelectModal: React.FC<Props & ThemeProps> = ({
  lightColor,
  darkColor,
  onSelectStation,
  filterAtom,
  disabled = false,
  // open = true,
  modalRef,
  showFavouriteStationsInList = false,
}) => {
  const stationsList = getStationsList()
  const stationFilter = useRecoilValue(filterAtom)
  const favouriteStations = useRecoilValue(favouriteStationsAtom)

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'raisedBackground')
  const iconColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  if (disabled) {
    modalRef?.current?.close()
  }

  const fuse = new Fuse(stationsList.data || [], {
    minMatchCharLength: 2,
    location: 0,
    threshold: 0.4,
    distance: 10,
    keys: ['stationName', 'crsCode'],
  })

  const data = fuse.search(stationFilter).map(result => result.item)

  const Item: React.FC<ItemProps & ThemeProps> = ({ stationName, crsCode, lightColor, darkColor }) => {
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'muted')
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

    const onPress = useCallback(() => {
      modalRef?.current?.close()
      onSelectStation({ stationName, crsCode })
    }, [onSelectStation, modalRef])

    return (
      <TouchableHighlight underlayColor={backgroundColor} onPress={onPress}>
        <View style={[styles.item, { borderColor }]}>
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
    <Portal>
      <Modalize
        modalStyle={customModalStyle}
        HeaderComponent={headerComponent}
        ref={modalRef}
        handlePosition="outside"
        handleStyle={styles.handle}
      >
        <View>
          {firstTen?.map(item => (
            <MemoisedItem key={item.crsCode} stationName={item.stationName} crsCode={item.crsCode} />
          ))}

          {firstTen.length === 0 && showFavouriteStationsInList && (
            <VStack>
              <HStack style={{ alignItems: 'center', marginBottom: 8 }} space={2}>
                <Ionicons name="ios-star" size={20} color={iconColor} />
                <SpeakUp>Favourites</SpeakUp>
              </HStack>

              {favouriteStations?.map(item => (
                <MemoisedItem key={`fav-${item.crsCode}`} stationName={item.stationName} crsCode={item.crsCode} />
              ))}
            </VStack>
          )}
        </View>
      </Modalize>
    </Portal>
  )
}

const Header: React.FC<{ filterAtom: Props['filterAtom'] }> = ({ filterAtom }) => {
  const [stationSelectFilter, setStationSelectFilter] = useRecoilState(filterAtom)

  const onChange = useCallback(
    function (e: any) {
      if (stationSelectFilter !== e.nativeEvent.text) {
        setStationSelectFilter(e.nativeEvent.text)
      }
    },
    [stationSelectFilter, setStationSelectFilter],
  )

  return (
    <View style={[styles.header]}>
      <Headline style={styles.headerTitle}>Choose station</Headline>
      <TextField style={styles.textField} placeholder="Search..." value={stationSelectFilter} onChange={onChange} />
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
    marginBottom: 8,
  },
  item: {
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
  },
  headerTitle: {
    marginBottom: 16,
  },
  textField: {},
  handle: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
})

export default StationSelectModal
