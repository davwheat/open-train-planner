import React, { useRef } from "react";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { TouchableHighlight } from "react-native-gesture-handler";
import Fuse from "fuse.js";

import { TextArea } from "native-base";

import { stationsListAtom } from "../atoms";
import type { StationPair, ThemeProps } from "../types";
import { Text, useThemeColor } from "./Themed";
import { Headline } from "./Typography";
import useKeyboardState from "../hooks/useKeyboardState";
import FakeSelectDropdown from "./FakeSelectDropdown";

interface Props {
  onSelect: (items: StationPair) => void;
  visible: boolean;
  atom: RecoilState<{
    filter: string;
    selected: StationPair | null;
  }>;
}

interface ItemProps {
  stationName: string;
  crsCode: string;
  atom: Props["atom"];
}

const StationSelectBox: React.FC<Props & ThemeProps> = ({
  onSelect,
  visible,
  lightColor,
  darkColor,
  atom,
}) => {
  const stationsList = useRecoilValue(stationsListAtom);
  const stationSelectFilter = useRecoilValue(atom);
  const previousSelection = useRef(stationSelectFilter.selected);

  const modalRef = useRef<Modalize>(null);

  if (
    stationSelectFilter.selected &&
    stationSelectFilter.selected !== previousSelection.current
  ) {
    onSelect && onSelect(stationSelectFilter.selected);
    previousSelection.current = stationSelectFilter.selected;
    modalRef.current?.close();
  }

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "raisedBackground"
  );

  const onOpen = () => {
    modalRef.current?.open();
  };

  const keyboardState = useKeyboardState();
  if (keyboardState) modalRef.current?.open("top");

  if (!visible) {
    return null;
  }

  const fuse = new Fuse(stationsList.data || [], {
    keys: ["stationName", "crsCode"],
  });

  const data =
    stationSelectFilter.filter.length > 0
      ? fuse.search(stationSelectFilter.filter).map((result) => result.item)
      : stationsList.data;

  const Item: React.FC<ItemProps & ThemeProps> = ({
    stationName,
    crsCode,
    lightColor,
    darkColor,
    atom,
  }) => {
    const borderColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "border"
    );
    const [stationSelectFilter, setStationSelectFilter] = useRecoilState(atom);

    return (
      <TouchableHighlight
        onPress={() =>
          setStationSelectFilter({
            selected: { stationName, crsCode },
            filter: stationSelectFilter.filter,
          })
        }
      >
        <View style={[styles.item, { borderTopColor: borderColor }]}>
          <Text style={styles.title}>{stationName}</Text>
          <Text style={styles.subtitle}>{crsCode}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const MemoisedItem = React.memo(Item);

  return (
    <>
      <FakeSelectDropdown
        value={stationSelectFilter.selected?.stationName}
        placeholder="Select station"
        onPress={onOpen}
      />
      <Portal>
        <Modalize
          modalStyle={[styles.root, { backgroundColor: backgroundColor }]}
          HeaderComponent={<Header atom={atom} />}
          snapPoint={300}
          ref={modalRef}
          flatListProps={{
            removeClippedSubviews: true,
            maxToRenderPerBatch: 30,
            initialNumToRender: 25,
            windowSize: 21,
            data,
            renderItem: ({ item }) => {
              return (
                <MemoisedItem
                  atom={atom}
                  stationName={item.stationName}
                  crsCode={item.crsCode}
                />
              );
            },
            keyExtractor: (item) => item.crsCode,
          }}
        />
      </Portal>
    </>
  );
};

const Header: React.FC<{ atom: Props["atom"] }> = ({ atom }) => {
  const [stationSelectFilter, setStationSelectFilter] = useRecoilState(atom);

  return (
    <View style={[styles.header]}>
      <Headline>Choose station</Headline>
      <TextArea
        style={styles.textField}
        placeholder="Search..."
        value={stationSelectFilter.filter}
        onChange={(e) => {
          setStationSelectFilter({
            filter: e.nativeEvent.text,
            selected: stationSelectFilter.selected,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    zIndex: 5,

    marginTop: "auto",

    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 12,

    elevation: 4,
    padding: 16,
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
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
  },
  textField: {
    marginTop: 8,
  },
});

export default StationSelectBox;
