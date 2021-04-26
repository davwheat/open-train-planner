const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";
const primary = "#008dde";

export default {
  light: {
    primary,
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    raisedBackground: "#efefef",
    border: tintColorLight,
  },
  dark: {
    primary,
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    raisedBackground: "#111",
    border: tintColorDark,
  },
};
