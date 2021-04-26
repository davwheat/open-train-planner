import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

export default function useFadeIn() {
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

  const restartAnimation = () => {
    opacityRef.current?.setValue(0)
    Animated.timing(opacityRef.current as Animated.Value, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  return [opacityRef.current, restartAnimation] as const
}
