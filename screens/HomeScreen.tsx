import * as React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { View } from '../components/Themed'
import FadeInView from '../components/FadeInView'
import FavouriteStationsCard from '../components/FavouriteStations/FavouriteStationsCard'
import NearbyStationsCard from '../components/NearbyStations/NearbyStationsCard'
import PoweredByNationalRailEnquiries from '../components/PoweredByNationalRailEnquiries'

const HomeScreen: React.FC = () => {
  return (
    <ScrollView>
      <FadeInView>
        <View style={styles.container}>
          <FavouriteStationsCard />
          <NearbyStationsCard />
          <PoweredByNationalRailEnquiries />
        </View>
      </FadeInView>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: '75%',
  },
})
