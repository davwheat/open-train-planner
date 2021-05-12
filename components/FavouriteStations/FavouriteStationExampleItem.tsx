import { Ionicons } from '@expo/vector-icons'
import { Center, VStack } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { ThemeProps } from '../../types'
import { Text, useThemeColor } from '../Themed'
import SelectStationModal from '../StationSelectModal'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { favouriteStationsAtom, favouriteStationsFilterAtom } from '../../atoms'

const FavouriteStationExampleItem: React.FC<ThemeProps> = ({ lightColor, darkColor }) => {
  const mutedColor = useThemeColor({ light: lightColor, dark: darkColor }, 'muted')
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

  const setFavouriteStation = useSetRecoilState(favouriteStationsAtom)
  const setFilter = useSetRecoilState(favouriteStationsFilterAtom)

  const [stationActiveCardOpen, setStationActiveCardOpen] = useState(false)

  function onPress() {
    setStationActiveCardOpen(true)
  }

  function onClose() {
    setStationActiveCardOpen(false)
  }

  return (
    <TouchableHighlight underlayColor={backgroundColor} onPress={onPress}>
      <View style={[styles.root, { borderBottomColor: mutedColor }]}>
        <VStack space={0.25} style={styles.info}>
          <Text style={styles.name}>Add to favourites</Text>
          <Text style={styles.crs}>Tap to add stations to favourites</Text>
        </VStack>
        <Center>
          <Ionicons name="ios-chevron-forward-outline" size={24} color={mutedColor} />
        </Center>
        <SelectStationModal
          open={stationActiveCardOpen}
          filterAtom={favouriteStationsFilterAtom}
          onSelectStation={station => {
            setFavouriteStation(stns => [...stns, station])
            setStationActiveCardOpen(false)
            setFilter('')
          }}
        />
      </View>
    </TouchableHighlight>
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
