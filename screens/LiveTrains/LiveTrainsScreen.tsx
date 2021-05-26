import * as React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, VStack } from 'native-base'

import { Text } from '../../components/Themed'

import StationSelectBox from '../../components/StationSelectBox'
import {
  liveTrains_arrivalStationAtom,
  liveTrains_arrivalStationFilterAtom,
  liveTrains_departureStationAtom,
  liveTrains_departureStationFilterAtom,
} from '../../atoms/liveTrainsStationSelectAtom'
import Card from '../../components/Card'
import FadeInView from '../../components/FadeInView'
import TrainSkeleton from '../../components/TrainDisplay/TrainSkeleton'
import TrainItem from '../../components/TrainDisplay/TrainItem'
import PoweredByNationalRailEnquiries from '../../components/PoweredByNationalRailEnquiries'

import FetchDepartureBoard from '../../api/FetchDepartureBoard'
import { useRecoilValue } from 'recoil'
import { IDepartureBoardResponse } from '../../models/DepartureBoardResponse'
import { TrainService } from '../../models/TrainService'
import { Whisper } from '../../components/Typography'

export default function LiveTrainsScreen() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [trainData, setTrainData] = React.useState<{ results: null | IDepartureBoardResponse }>({ results: null })

  const selectedDepartureStation = useRecoilValue(liveTrains_departureStationAtom)
  const selectedArrivalStation = useRecoilValue(liveTrains_arrivalStationAtom)

  const onSearchPress = React.useCallback(() => {
    setIsLoading(true)
    setTrainData({ results: null })

    if (selectedDepartureStation === null) {
      setIsLoading(false)
      return
    }

    console.log(selectedArrivalStation)

    FetchDepartureBoard({
      crsCode: selectedDepartureStation.crsCode,
      filterType: 'to',
      filterCrsCode: selectedArrivalStation?.crsCode || undefined,
    })
      .then(data => {
        setTrainData({ results: data })
      })
      .catch(e => {
        console.error(e)
        Alert.alert('Error', e.message, e.buttons)
      })
      .then(() => {
        setIsLoading(false)
      })
  }, [FetchDepartureBoard, setIsLoading, selectedDepartureStation])

  return (
    <ScrollView>
      <FadeInView>
        <View style={styles.container}>
          <Card>
            <VStack space={2}>
              <Whisper>Departure station</Whisper>

              <StationSelectBox
                showFavouriteStationsInList
                disabled={isLoading}
                selectionAtom={liveTrains_departureStationAtom}
                filterAtom={liveTrains_departureStationFilterAtom}
              />

              <Whisper style={styles.arrivalStationLabel}>Arrival station (optional)</Whisper>

              <StationSelectBox
                showFavouriteStationsInList
                showResetButton
                disabled={isLoading}
                selectionAtom={liveTrains_arrivalStationAtom}
                filterAtom={liveTrains_arrivalStationFilterAtom}
              />

              <Button
                isLoading={isLoading}
                isLoadingText="Searching..."
                style={styles.searchButton}
                isDisabled={selectedDepartureStation === null}
                onPress={onSearchPress}
              >
                To the trains!
              </Button>
            </VStack>
          </Card>

          {(isLoading || trainData.results) && (
            <Card>
              <Text style={styles.results}>Results</Text>

              {isLoading ? (
                <View style={styles.trainList}>
                  <TrainSkeleton />
                  <TrainSkeleton />
                  <TrainSkeleton />
                  <TrainSkeleton />
                  <TrainSkeleton />
                  <TrainSkeleton />
                </View>
              ) : trainData.results && trainData.results.trainServices ? (
                <View style={styles.trainList}>
                  {trainData.results.trainServices.map(trainService => (
                    <TrainItem key={trainService.serviceIdGuid} service={new TrainService(trainService)} />
                  ))}
                </View>
              ) : (
                <View style={styles.trainList}>
                  <Text>No trains could be found from {selectedDepartureStation?.stationName} at the moment.</Text>
                </View>
              )}
            </Card>
          )}

          <PoweredByNationalRailEnquiries />
        </View>
      </FadeInView>
    </ScrollView>
  )
}

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
  arrivalStationLabel: {
    marginTop: 4,
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
  searchButton: {
    marginTop: 8,
  },
  results: {
    fontWeight: 'bold',
  },
  trainList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 16,
  },
})
