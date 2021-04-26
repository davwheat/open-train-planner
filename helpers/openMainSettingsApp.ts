import { Platform } from 'react-native'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'

export default async function openMainSettingsApp() {
  if (Platform.OS === 'ios') {
    if (await Linking.canOpenURL('App-prefs:')) {
      Linking.openURL('App-prefs:')
    }
  } else {
    IntentLauncher.startActivityAsync(IntentLauncher.ACTION_SETTINGS)
  }
}
