import React from 'react'
import { StyleSheet, Image } from 'react-native'

const PoweredByNationalRailEnquiries = () => {
  return <Image style={styles.nrePoweredBy} source={require('../assets/images/nre_powered_logo.png')} />
}

const styles = StyleSheet.create({
  nrePoweredBy: {
    width: '75%',
    height: 0,
    paddingBottom: '15%',
    resizeMode: 'contain',
    marginTop: 16,
    marginBottom: 16,
  },
})

export default PoweredByNationalRailEnquiries
