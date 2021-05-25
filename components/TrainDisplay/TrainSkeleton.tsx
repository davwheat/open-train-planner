import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Center, Skeleton, VStack, HStack } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '../Themed'
import type { ThemeProps } from '../../types'
import useColorScheme from '../../hooks/useColorScheme'

const TrainSkeleton: React.FC<ThemeProps> = ({ lightColor, darkColor }) => {
  const mutedColor = useThemeColor({ light: lightColor, dark: darkColor }, 'muted')

  const colorScheme = useColorScheme()

  const skeletonProps = {
    style: styles.skeleton,
    startColor: colorScheme === 'dark' ? '#222' : '#ddd',
    endColor: mutedColor,
  }

  return (
    <HStack space={2} style={[styles.root, { borderBottomColor: mutedColor }]}>
      <View style={styles.trainTimes}>
        <Skeleton variant="text" height="20px" {...skeletonProps} />
      </View>
      <VStack space={1} style={styles.trainDetails}>
        <Skeleton variant="text" height="18px" {...skeletonProps} />
        <Skeleton variant="text" height="16px" {...skeletonProps} />
      </VStack>
      <Center>
        <Ionicons name="ios-chevron-forward-outline" size={24} color={mutedColor} />
      </Center>
    </HStack>
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
  },
  trainTimes: {
    flexBasis: 52,
    display: 'flex',
    justifyContent: 'center',
  },
  skeleton: {
    margin: 0,
  },
})

export default TrainSkeleton
