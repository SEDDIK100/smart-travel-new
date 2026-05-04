
import React from 'react'
import { Stack } from 'expo-router'


const _layout = () => {
  return (
     <Stack>
        <Stack.Screen name="(activity)" options={{headerShown:false}}  />
        <Stack.Screen name="(plan)" options={{headerShown:false}}  />
        <Stack.Screen name="(chatbot)" options={{headerShown:false}}  />
        <Stack.Screen name="PlanDetails" options={{headerShown:false}}  />
    </Stack>
  )
}

export default _layout

