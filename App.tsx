import './wdyr'

import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RecoilRoot } from 'recoil'
import { NativeBaseProvider, extendTheme, Spinner, VStack } from 'native-base'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import { primaryColor } from './constants/Colors'
import { Text, View } from './components/Themed'
import { StyleSheet } from 'react-native'
import { Headline } from './components/Typography'

export default function App() {
  const theme = extendTheme({
    components: {
      Button: {
        defaultProps: {
          colorScheme: 'primary',
          _text: {
            color: 'white',
          },
        },
        baseStyle: {
          fontSize: 18,
        },
      },
    },
    config: {
      initialColorMode: useColorScheme(),
    },
    colors: {
      primary: {
        400: primaryColor,
        500: primaryColor,
      },
    },
  })

  return (
    <NativeBaseProvider theme={theme}>
      <RecoilRoot>
        <StateManager />
        <InnerApp />
      </RecoilRoot>
    </NativeBaseProvider>
  )
}

function InnerApp() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingSplash}>
          <VStack space={2} alignItems="center">
            <Spinner size={64} />
            <Headline>{!isLoadingComplete ? `Loading` : `First-time setup`}</Headline>
            <Text>
              {!isLoadingComplete ? `Fetching cached files` : `Fetching list of stations. This might take a few minutes. Please be patient.`}
            </Text>
          </VStack>
        </View>
      </SafeAreaProvider>
    )
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar />
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  loadingSplash: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
})

const StateManager: React.FC = () => {
  return null
}
