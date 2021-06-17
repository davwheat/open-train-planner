import { VStack } from 'native-base'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import makePressableStyle from '../../helpers/makePressableStyle'
import { ThemeProps } from '../../types'
import { Text, useThemeColor } from '../Themed'

const FavouriteStationMaximumReachedItem: React.FC<ThemeProps> = ({ lightColor, darkColor }) => {
  const mutedColor = useThemeColor({ light: lightColor, dark: darkColor }, 'muted')

  return (
    <View style={[styles.root, { borderBottomColor: mutedColor }]}>
      <VStack space={1} style={styles.info}>
        <Text style={styles.name}>Maximum favourites reached</Text>
        <Text style={styles.crs}>Tap an existing station to remove</Text>
      </VStack>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 8,
    borderBottomWidth: 1,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 18,
    margin: 0,
  },
  crs: {
    fontSize: 14,
    lineHeight: 16,
    margin: 0,
  },
})

export default FavouriteStationMaximumReachedItem
