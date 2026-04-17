import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen  name="guide" options={{headerShown:false}} />
        <Stack.Screen  name="guideRes" options={{headerShown:false}} />
    </Stack>
  
  )
}

export default _layout