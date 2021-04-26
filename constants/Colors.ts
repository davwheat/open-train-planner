const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'
export const primaryColor = '#008dde'

export default {
  light: {
    primary: primaryColor,
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    raisedBackground: '#efefef',
    border: tintColorLight,
  },
  dark: {
    primary: primaryColor,
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    raisedBackground: '#111',
    border: tintColorDark,
  },
}
