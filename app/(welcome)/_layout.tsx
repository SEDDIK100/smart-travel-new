
import React from 'react'
import { Stack } from 'expo-router'


const Welcomelayout = () => {
  return (
     <Stack>
        <Stack.Screen name="welcome" options={{headerShown:false}}  />

        
    </Stack>
  )
}

export default Welcomelayout