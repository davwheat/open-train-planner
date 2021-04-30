import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import getOriginsOrDestinationsAsText from '../../../helpers/getOriginsOrDestinationsAsText'
import { getTimeDifference } from '../../../helpers/getTimeDifference'
import { ILocation } from '../../../models/Location'

import type { ITrainService } from '../../../models/TrainService'
import type { ThemeProps } from '../../../types'
import { Text, useThemeColor } from '../../Themed'
import { Headline } from '../../Typography'

interface Props {
  trainData: ITrainService
  /**
   * Is the details card open?
   */
  open: boolean
  onClose: () => void
}

const TrainFullDetailsCard: React.FC<Props & ThemeProps> = ({ open, trainData, lightColor, darkColor, onClose }) => {
  const modalRef = React.useRef<Modalize>(null)
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'raisedBackground')

  const diffInput = (trainData.etd === 'On time' ? trainData.std : trainData.etd) as string
  const timeDifference = getTimeDifference(diffInput)

  if (!open) {
    modalRef?.current?.close()
  } else {
    modalRef?.current?.open()
  }

  const customModalStyle = [styles.root, { backgroundColor: backgroundColor }]

  const departureTime = (trainData.etd === 'On time' ? trainData.std : trainData.etd) || 'XX:XX'

  const unknownDeparture = trainData.etd !== 'Cancelled' && trainData.etd !== 'Delayed'
  const departingIn = unknownDeparture ? 'Was departing ' : 'Departing ' + (timeDifference > 1 ? `in ${timeDifference} mins` : `now`)

  const platform = trainData.isPlatformAvailable ? ` from platform ${trainData.platform}` : ''

  const detailsText = `${departingIn}${platform}.`

  return (
    <Portal>
      <Modalize
        onClose={onClose}
        modalStyle={customModalStyle}
        ref={modalRef}
        handlePosition="inside"
        handleStyle={styles.handle}
        HeaderComponent={<Header departureTime={departureTime} destinations={trainData.currentDestinations || trainData.destination} />}
      >
        <View>
          <Text>{detailsText}</Text>
        </View>
      </Modalize>
    </Portal>
  )
}

interface HeaderProps {
  destinations: ILocation[]
  departureTime: string
}

const Header: React.FC<HeaderProps> = ({ destinations, departureTime }) => {
  return (
    <View style={styles.header}>
      <Headline>
        {departureTime} - {getOriginsOrDestinationsAsText(destinations)}
      </Headline>
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
    marginBottom: 16,
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

export default TrainFullDetailsCard
