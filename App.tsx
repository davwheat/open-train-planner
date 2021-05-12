import './wdyr'

import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNetInfo } from '@react-native-community/netinfo'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { NativeBaseProvider, extendTheme, Spinner, VStack } from 'native-base'

import GenerateHuxley2Url from './api/GenerateHuxley2Url'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import { stationsListAtom } from './atoms'
import { StationPair, StationsListInStorage } from './types'
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

  const stationsList = useRecoilValue(stationsListAtom)
  // const [apiStatus, setApiStatus] = useRecoilState(apiStatusAtom);

  if (!isLoadingComplete || !stationsList.loaded) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingSplash}>
          <VStack space={2} alignItems="center">
            <Spinner size="lg" />
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
  const [stationsList, setStationsList] = useRecoilState(stationsListAtom)
  const netInfo = useNetInfo()

  /**
   * Fetch the full stations list from the API.
   */
  async function fetchStationsList(abortController: AbortController) {
    try {
      const list = (await (
        await fetch(GenerateHuxley2Url('crs'), {
          signal: abortController.signal,
        })
      ).json()) as StationPair[]

      const diskData = { lastUpdated: Date.now(), data: list }

      await Promise.all([
        new Promise(() => {
          if (!abortController.signal.aborted) setStationsList({ data: list, loaded: true, offlineCopy: false })
        }),
        AsyncStorage.setItem('stationsList', JSON.stringify(diskData)),
      ])
    } catch (e) {
      // Errored while fetching or saving -- load from offline
      loadStationsList(abortController, true)
    }
  }

  const loadStationsList = useCallback(
    async (abortController, forceOffline = false) => {
      if (!forceOffline && netInfo.isInternetReachable) {
        await fetchStationsList(abortController)
      } else {
        const allKeys = await AsyncStorage.getAllKeys()

        if (allKeys.includes('stationsList')) {
          // We have a list cached
          const data = JSON.parse((await AsyncStorage.getItem('stationsList')) || 'null') as StationsListInStorage | null

          if (data === null) {
            await fetchStationsList(abortController)
          } else {
            setStationsList({
              data: data.data,
              loaded: true,
              offlineCopy: true,
            })
          }
        }
      }
    },
    [stationsList],
  )

  useEffect(() => {
    const abortController = new AbortController()

    if (!stationsList.loaded) {
      loadStationsList(abortController)
    }

    return () => abortController.abort()
  })

  useEffect(() => {
    const abortController = new AbortController()

    if (netInfo.isInternetReachable && stationsList.offlineCopy) {
      fetchStationsList(abortController)
    }

    return () => abortController.abort()
  }, [netInfo])

  return null
}
