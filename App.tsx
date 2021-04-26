import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { NativeBaseProvider, extendTheme } from "native-base";

import GenerateHuxley2Url from "./api/GenerateHuxley2Url";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { stationsListAtom, apiStatusAtom } from "./atoms";
import { Host } from "react-native-portalize";
import { StationPair, StationsListInStorage } from "./types";

export default function App() {
  const theme = extendTheme({
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: useColorScheme(),
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <RecoilRoot>
        <StateManager />
        <InnerApp />
      </RecoilRoot>
    </NativeBaseProvider>
  );
}

function InnerApp() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const stationsList = useRecoilValue(stationsListAtom);
  // const [apiStatus, setApiStatus] = useRecoilState(apiStatusAtom);

  if (!isLoadingComplete || !stationsList.loaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar />
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    );
  }
}

const StateManager: React.FC = () => {
  const [stationsList, setStationsList] = useRecoilState(stationsListAtom);
  const netInfo = useNetInfo();

  /**
   * Fetch the full stations list from the API.
   */
  async function fetchStationsList(abortController: AbortController) {
    const list = (await (
      await fetch(GenerateHuxley2Url("crs"), {
        signal: abortController.signal,
      })
    ).json()) as StationPair[];

    const diskData = { lastUpdated: Date.now(), data: list };

    await Promise.all([
      new Promise(() => {
        if (!abortController.signal.aborted)
          setStationsList({ data: list, loaded: true, offlineCopy: false });
      }),
      AsyncStorage.setItem("stationsList", JSON.stringify(diskData)),
    ]);
  }

  const loadStationsList = useCallback(
    async (abortController) => {
      if (netInfo.isInternetReachable) {
        await fetchStationsList(abortController);
      } else {
        const allKeys = await AsyncStorage.getAllKeys();

        if (allKeys.includes("stationsList")) {
          // We have a list cached
          const data = JSON.parse(
            (await AsyncStorage.getItem("stationsList")) || "null"
          ) as StationsListInStorage | null;

          if (data === null) {
            await fetchStationsList(abortController);
          } else {
            setStationsList({
              data: data.data,
              loaded: true,
              offlineCopy: true,
            });
          }
        }
      }
    },
    [stationsList]
  );

  useEffect(() => {
    const abortController = new AbortController();

    if (!stationsList.loaded) {
      loadStationsList(abortController);
    }

    return () => abortController.abort();
  });

  useEffect(() => {
    const abortController = new AbortController();

    if (netInfo.isInternetReachable && stationsList.offlineCopy) {
      fetchStationsList(abortController);
    }

    return () => abortController.abort();
  }, [netInfo]);

  return null;
};
