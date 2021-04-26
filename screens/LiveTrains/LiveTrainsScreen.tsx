import * as React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button } from 'native-base'

import { Text, View } from '../../components/Themed'

import StationSelectBox from '../../components/StationSelectBox'
import { liveTrainsStationSelectAtom } from '../../atoms'
import Card from '../../components/Card'
import FadeInView from '../../components/FadeInView'

export default function LiveTrainsScreen() {
  const [searchState, setSearchState] = React.useState({ loading: false, trains: null })

  return (
    <ScrollView>
      <FadeInView>
        <View style={styles.container}>
          <Card>
            <Text>Departure station</Text>
            <StationSelectBox disabled={searchState.loading} atom={liveTrainsStationSelectAtom} />

            <Button
              isLoading={searchState.loading}
              isLoadingText="Searching..."
              style={styles.searchButton}
              onPress={() => {
                setSearchState({ loading: true, trains: null })
              }}
            >
              To the trains!
            </Button>
          </Card>
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
    marginTop: 16,
  },
})
