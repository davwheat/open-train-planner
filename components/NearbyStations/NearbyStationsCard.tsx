import { Button, Spinner, VStack, IconButton } from 'native-base'
import React from 'react'
import { Linking, StyleSheet, View } from 'react-native'

import Card from '../Card'
import Headline from '../Typography/Headline'
import NearbyStationItem from './NearbyStationItem'

import { PermissionStatus } from 'expo-location'
import useLocation from '../../hooks/useLocation'
import { Text } from '../Themed'
import getNearbyStations from '../../helpers/getNearbyStations'
import RefreshButton from '../RefreshButton'

const NearbyStationsCard: React.FC = () => {
  const [location, forceUpdate] = useLocation()

  const nearbyStations = location.permissionStatus === PermissionStatus.GRANTED && location.location ? getNearbyStations(location.location) : []

  return (
    <Card>
      <View style={styles.headerContainer}>
        <Headline>Nearby stations</Headline>
        <RefreshButton onPress={forceUpdate} />
      </View>

      <View style={styles.faves}>
        <VStack>
          {!location.locationFetched && (
            <VStack space={2}>
              <Spinner />
              <Text style={[styles.centerText]}>Fetching location</Text>
            </VStack>
          )}
          {nearbyStations.map(station => (
            <NearbyStationItem station={station} key={station.crsCode} />
          ))}
          {location.permissionStatus === PermissionStatus.DENIED && (
            <VStack space={2}>
              <Text>You've denied the app permission to access your location. To show you nearby stations, please enable this in settings.</Text>
              <Button onPress={() => Linking.openSettings()}>Open settings</Button>
            </VStack>
          )}
        </VStack>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  faves: {
    marginTop: 16,
  },
  centerText: {
    textAlign: 'center',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default NearbyStationsCard
