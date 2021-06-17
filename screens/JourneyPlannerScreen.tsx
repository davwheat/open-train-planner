import * as React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import FadeInView from '../components/FadeInView'
import { Text, View } from '../components/Themed'
import PoweredByNationalRailEnquiries from '../components/PoweredByNationalRailEnquiries'
import { Headline } from '../components/Typography'

export default function JourneyPlannerScreen() {
  return (
    <ScrollView>
      <FadeInView>
        <View style={styles.container}>
          <Headline style={styles.title}>Journey Planner</Headline>
          <Text style={styles.getStartedText}>You'll be able to find the fastest route between two stations from this page.</Text>
          <PoweredByNationalRailEnquiries />
        </View>
      </FadeInView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
