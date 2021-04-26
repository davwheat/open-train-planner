import { useFocusEffect, useIsFocused } from "@react-navigation/core";
import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Text, View } from "../../components/Themed";
import { Headline } from "../../components/Typography";
import useFadeIn from "../../hooks/useFadeIn";

import StationSelectBox from "../../components/StationSelectBox";
import { liveTrainsStationSelectAtom } from "../../atoms";

export default function LiveTrainsScreen() {
  const [opacity, restartAnimation] = useFadeIn();
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      restartAnimation();
    }, [restartAnimation])
  );

  return (
    <ScrollView>
      <View style={styles.container} fadeInOpacity={opacity}>
        <Headline>Select station</Headline>
        <StationSelectBox
          visible={isFocused}
          onSelect={(e) => console.log(e)}
          atom={liveTrainsStationSelectAtom}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: "75%",
  },
});
