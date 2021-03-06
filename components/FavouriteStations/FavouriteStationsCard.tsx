import { VStack } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useRecoilValue } from 'recoil'

import { favouriteStationsAtom } from '../../atoms'
import Card from '../Card'
import Headline from '../Typography/Headline'
import FavouriteStationExampleItem from './FavouriteStationExampleItem'
import FavouriteStationItem from './FavouriteStationItem'
import FavouriteStationMaximumReachedItem from './FavouriteStationMaximumReachedItem'

const FavouriteStationsCard: React.FC = () => {
  const favouriteStations = useRecoilValue(favouriteStationsAtom)

  return (
    <Card>
      <Headline>Favourite stations</Headline>

      <View style={styles.faves}>
        <VStack>
          {favouriteStations.slice(0, 5).map(station => (
            <FavouriteStationItem station={station} key={station.crsCode} />
          ))}
          {favouriteStations.length >= 5 ? <FavouriteStationMaximumReachedItem /> : <FavouriteStationExampleItem />}
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
