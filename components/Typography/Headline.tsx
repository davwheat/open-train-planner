import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, TextProps } from "../Themed";

const Headline: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text {...props} style={[styles.root, style]} />;
};

const styles = StyleSheet.create({
  root: {
    fontSize: 22,
    fontWeight: "bold",
    // textAlign: "left",
    // width: "100%",
  },
});

export default Headline;
