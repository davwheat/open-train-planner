import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'

import type { ThemeProps } from '../../types'
import { useThemeColor } from '../Themed'

import { StationPair } from '../../types'
import { Headline } from '../Typography'
import { useNavigation } from '@react-navigation/core'
import { Button, VStack } from 'native-base'
import { useSetRecoilState } from 'recoil'
import { liveTrains_departureStationAtom } from '../../atoms/liveTrainsStationSelectAtom'
import { favouriteStationsAtom } from '../../atoms'

interface IStationActivateCardProps {
  station: StationPair
  /**
   * Is the details card open?
   */
  open: boolean
  onClose: () => void
}

const FavouriteStationActiveCard: React.FC<IStationActivateCardProps & ThemeProps> = ({ open, station, lightColor, darkColor, onClose }) => {
  const modalRef = React.useRef<Modalize>(null)
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'raisedBackground')

  function close() {
    modalRef?.current?.close()
  }

  if (!open) {
    close()
  } else {
    modalRef?.current?.open()
  }

  const customModalStyle = [styles.root, { backgroundColor: backgroundColor }]

  const navigation = useNavigation()

  const setLiveTrainsDepartureStnState = useSetRecoilState(liveTrains_departureStationAtom)
  const setFavouriteStations = useSetRecoilState(favouriteStationsAtom)

  return (
    <Portal>
      <Modalize
        onClose={onClose}
        modalStyle={customModalStyle}
        ref={modalRef}
        handlePosition="outside"
        handleStyle={styles.handle}
        HeaderComponent={
          <View style={styles.header}>
            <Headline>Select action for {station.stationName}</Headline>
          </View>
        }
      >
        <View>
          <VStack space={2}>
            <Button
              onPress={() => {
                setLiveTrainsDepartureStnState(station)
                close()
                navigation.navigate('Live Trains')
              }}
            >
              Live trains
            </Button>
            <Button
              onPress={() => {
                // setLiveTrainsDepartureStnState(station)
                close()
                navigation.navigate('Journey Planner')
              }}
            >
              Plan a journey
            </Button>
          </VStack>
        </View>
      </Modalize>
    </Portal>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
  },
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

export default FavouriteStationActiveCard
