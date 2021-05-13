const tintColorLight = '#2f95dc'
const tintColorDark = '#eee'

const mutedColorLight = '#999'
const mutedColorDark = '#bbb'

export const primaryColor = '#008dde'

export default {
  light: {
    primary: primaryColor,
    text: '#000',
    lightText: '#888',
    background: '#f2f2f2',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    raisedBackground: '#fff',
    border: tintColorLight,
    muted: mutedColorLight,
    controlPressed: '#ececec',
  },
  dark: {
    primary: primaryColor,
    text: '#fff',
    lightText: '#ccc',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    raisedBackground: '#111',
    border: tintColorDark,
    muted: mutedColorDark,
    controlPressed: '#181818',
  },
}
