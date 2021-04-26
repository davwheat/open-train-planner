import React, { useCallback, useEffect, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/core'

import { View } from '../components/Themed'
import { Animated } from 'react-native'

interface Props {
  children: React.ReactNode
}

const FadeInView: React.FC<Props> = ({ children }) => {
  const opacityRef = useRef<Animated.Value | undefined>(undefined)

  if (typeof opacityRef.current === 'undefined') {
    opacityRef.current = new Animated.Value(0)
  }

  useEffect(() => {
    Animated.timing(opacityRef.current as Animated.Value, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [])

  const restartAnimation = useCallback(() => {
    opacityRef.current?.setValue(0)
    Animated.timing(opacityRef.current as Animated.Value, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [opacityRef.current])

  useFocusEffect(
    useCallback(() => {
      restartAnimation()
    }, [restartAnimation]),
  )

  return <View fadeInOpacity={opacityRef.current}>{children}</View>
}

export default React.memo(FadeInView)
