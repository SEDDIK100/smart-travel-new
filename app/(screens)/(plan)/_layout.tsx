import React from 'react'
import { Stack } from 'expo-router'
const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name="TripName" options={{headerShown:false}}  />
        <Stack.Screen name="travellers" options={{headerShown:false}}  />
        <Stack.Screen name="vibe" options={{headerShown:false}}  />
        <Stack.Screen name="Budget" options={{headerShown:false}}  />
        <Stack.Screen name="PlanRes" options={{headerShown:false}}  />
    </Stack>
  )
}

export default _layout