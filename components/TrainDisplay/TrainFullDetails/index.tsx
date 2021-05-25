import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { VStack } from 'native-base'

import type { TrainService } from '../../../models/TrainService'
import type { ThemeProps } from '../../../types'
import { useThemeColor } from '../../Themed'

import TrainDescription from './TrainDescription'
import { Header } from './Header'
import BasicTrainInfo from './BasicTrainInfo'
import CallingPoints from './CallingPoints/CallingPoints'

interface Props {
  trainService: TrainService
  /**
   * Is the details card open?
   */
  open: boolean
  onClose: () => void
}

const TrainFullDetailsCard: React.FC<Props & ThemeProps> = ({ open, trainService, lightColor, darkColor, onClose }) => {
  const modalRef = React.useRef<Modalize>(null)
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'raisedBackground')

  if (!open) {
    modalRef?.current?.close()
  } else {
    modalRef?.current?.open()
  }

  const customModalStyle = [styles.root, { backgroundColor: backgroundColor }]

  return (
    <Portal>
      <Modalize
        onClose={onClose}
        modalStyle={customModalStyle}
        ref={modalRef}
        handlePosition="outside"
        handleStyle={styles.handle}
        HeaderComponent={<Header trainService={trainService} />}
      >
        <View>
          <VStack space={1}>
            <BasicTrainInfo train={trainService} />
            <TrainDescription train={trainService} />
            <CallingPoints train={trainService} />
          </VStack>
        </View>
      </Modalize>
    </Portal>
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
