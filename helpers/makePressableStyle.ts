import { useThemeColor } from '../components/Themed'

export default function makePressableStyle(pressed: boolean, lightColor, darkColor) {
  const controlPressBgColor = useThemeColor({ light: lightColor, dark: darkColor }, 'controlPressed')

  return {
    backgroundColor: pressed ? controlPressBgColor : 'transparent',
  }
}
