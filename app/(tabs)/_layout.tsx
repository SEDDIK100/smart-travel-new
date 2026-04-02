import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
const _layout = () => {
  return (
           <Tabs>
                <Tabs.Screen name="home" options={{headerShown:false, tabBarIcon:(() =><Entypo name="home" size={24} color="black" />  )  }}    />
                <Tabs.Screen name="guide" options={{headerShown: false , tabBarIcon:(()=><FontAwesome5 name="map-marked-alt" size={24} color="black" />)  }} />
                <Tabs.Screen name="profile" options={{headerShown: false , tabBarIcon:(()=><FontAwesome6 name="person-hiking" size={24} color="black" />)  }} />
                
                
        </Tabs>
  )
}

export default _layout