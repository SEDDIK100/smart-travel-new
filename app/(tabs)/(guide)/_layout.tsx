import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen  name="guide" options={{headerShown:false}} />
        <Stack.Screen  name="destination" options={{headerShown:false}} />
        <Stack.Screen  name="travellers" options={{headerShown:false}} />
        <Stack.Screen  name="vibe" options={{headerShown:false}} />
        <Stack.Screen  name="Date" options={{headerShown:false}} />
    </Stack>
  
  )
}

export default _layout