const tintColorLight = '#2f95dc'
const tintColorDark = '#eee'

const mutedColorLight = '#999'
const mutedColorDark = '#999'

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
    muted: mutedColorLight,
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
    muted: mutedColorDark,
  },
}
