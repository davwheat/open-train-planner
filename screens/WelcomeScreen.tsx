import { useFocusEffect } from '@react-navigation/core'
import * as React from 'react'
import { StyleSheet } from 'react-native'

import { Text, View } from '../components/Themed'
import useFadeIn from '../hooks/useFadeIn'

export default function WelcomeScreen() {
  const [opacity, restartAnimation] = useFadeIn()

  useFocusEffect(
    React.useCallback(() => {
      restartAnimation()
    }, [restartAnimation]),
  )

  return (
    <View style={styles.container} fadeInOpacity={opacity}>
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.getStartedText} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
        Your closest, most frequently used, and favourited stations will show here, along with up-to-date info about your regular journeys.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: '75%',
  },
})
