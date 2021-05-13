import { Ionicons } from '@expo/vector-icons'
import { Center, VStack } from 'native-base'
import React, { useRef } from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native'
import makePressableStyle from '../../helpers/makePressableStyle'
import { StationPair, ThemeProps } from '../../types'
import { Text, useThemeColor } from '../Themed'
import SelectStationModal from '../StationSelectModal'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { favouriteStationsAtom, favouriteStationsFilterAtom } from '../../atoms'
import { Modalize } from 'react-native-modalize'

const FavouriteStationExampleItem: React.FC<ThemeProps> = ({ lightColor, darkColor }) => {
  const mutedColor = useThemeColor({ light: lightColor, dark: darkColor }, 'muted')

  const [favouriteStations, setFavouriteStation] = useRecoilState(favouriteStationsAtom)
  const setFilter = useSetRecoilState(favouriteStationsFilterAtom)

  const modalRef = useRef<Modalize>(null)

  function onPress() {
    modalRef?.current?.open()
  }

  function onPickStation(station: StationPair) {
    if (favouriteStations.find(s => s.crsCode === station.crsCode)) {
      Alert.alert('Already favourited', `${station.stationName} is already in your favourites.`, [
        {
          text: 'OK',
          onPress: () => {},
        },
      ])
      return
    }

    modalRef?.current?.close()
    setFavouriteStation(stns => [...stns, station])
    setFilter('')
  }

  return (
    <Pressable style={({ pressed }) => [makePressableStyle(pressed, lightColor, darkColor)]} onPress={onPress}>
      <View style={[styles.root, { borderBottomColor: mutedColor }]}>
        <VStack space={1} style={styles.info}>
          <Text style={styles.name}>Add to favourites</Text>
          <Text style={styles.crs}>Tap to add stations to favourites</Text>
        </VStack>
        <Center>
          <Ionicons name="ios-chevron-forward-outline" size={24} color={mutedColor} />
        </Center>
        <SelectStationModal modalRef={modalRef} filterAtom={favouriteStationsFilterAtom} onSelectStation={onPickStation} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 8,
    borderBottomWidth: 1,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 18,
    margin: 0,
  },
  crs: {
    fontSize: 14,
    lineHeight: 16,
    margin: 0,
  },
})

export default FavouriteStationExampleItem
