import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Center, Skeleton, VStack } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '../Themed'
import type { ThemeProps } from '../../types'

const TrainSkeleton: React.FC<ThemeProps> = ({ lightColor, darkColor }) => {
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'muted')

  const skeletonProps = {
    style: styles.skeleton,
    startColor: '#222',
    endColor: borderColor,
  }

  return (
    <View style={[styles.root, { borderBottomColor: borderColor }]}>
      <VStack space={1} style={styles.trainDetails}>
        <Skeleton variant="text" height="20px" {...skeletonProps} />
        <Skeleton variant="text" height="14px" {...skeletonProps} />
      </VStack>
      <VStack space={1} style={styles.trainTimes}>
        <Skeleton variant="text" height="22px" {...skeletonProps} />
        <Skeleton variant="text" height="12px" {...skeletonProps} />
      </VStack>
      <Center>
        <Ionicons name="ios-chevron-forward-outline" size={24} color="white" />
      </Center>
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
  trainDetails: {
    flex: 1,
    marginRight: 8,
  },
  trainTimes: {
    minWidth: 48,
    marginRight: 8,
  },
  skeleton: {
    margin: 0,
  },
})

export default TrainSkeleton
