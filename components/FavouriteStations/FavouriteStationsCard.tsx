import { VStack } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useRecoilValue } from 'recoil'

import { favouriteStationsAtom } from '../../atoms'
import Card from '../Card'
import { Text, View } from '../Themed'
import FavouriteStationExampleItem from './FavouriteStationExampleItem'
import FavouriteStationItem from './FavouriteStationItem'

const FavouriteStationsCard: React.FC = () => {
  const favouriteStations = useRecoilValue(favouriteStationsAtom)

  return (
    <Card>
      <Text>Favourite stations</Text>

      <View style={styles.faves}>
        <VStack>
          {favouriteStations.map(station => (
            <FavouriteStationItem station={station} key={station.crsCode} />
          ))}
          <FavouriteStationExampleItem />
        </VStack>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  faves: {
    marginTop: 16,
  },
})

export default FavouriteStationsCard
