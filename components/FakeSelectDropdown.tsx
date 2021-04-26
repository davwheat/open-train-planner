import React from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { ThemeProps } from "../types";
import { Text, useThemeColor } from "./Themed";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  value?: string;
  placeholder: string;
  onPress: ((event: GestureResponderEvent) => void) & (() => void);
}

const FakeSelectDropdown: React.FC<Props & ThemeProps> = ({
  value,
  placeholder,
  onPress,
  darkColor,
  lightColor,
}) => {
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "border"
  );
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "raisedBackground"
  );
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <TouchableHighlight
      onPress={onPress}
      containerStyle={styles.containerRoot}
      style={[styles.root, { borderColor, backgroundColor }]}
    >
      <View style={styles.select}>
        <Text style={styles.text}>{value ? value : placeholder}</Text>
        <Ionicons name="ios-chevron-down-outline" size={18} color={color} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  containerRoot: {
    width: "100%",
    maxWidth: 300,
  },
  root: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 12,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  select: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
});

export default FakeSelectDropdown;
