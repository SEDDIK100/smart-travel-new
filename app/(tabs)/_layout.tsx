import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";


const _layout = () => {
  return (
    <SafeAreaProvider>
    <Tabs



      
      screenOptions = {({route})=>({
        tabBarStyle: {
              paddingTop:6,
              backgroundColor: '#1A2235',     
              borderTopWidth: 0,
              position: 'absolute',
              marginLeft: 10,
              marginRight:10,
              bottom: 30,
              height: 68,
              borderRadius: 25,                
              shadowColor: '#A3E635',           
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.4,
              shadowRadius: 25,
              },
              tabBarActiveTintColor: '#A3E635',
              tabBarInactiveTintColor: '#71717a',
            
            tabBarLabelStyle: {
              fontSize: 11.5,
              fontWeight: '600',
              marginBottom: 4,
              marginTop: 4},

      
    })}
>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({color,size,focused}) => <Entypo name={focused? 'home' : 'home'} size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(guide)"
        
        options={{
          headerShown: false,
          tabBarIcon: ({color,size,focused}) => (
            <FontAwesome5 name={ focused ? 'map-marked-alt' : 'map-marked-alt'} size={size} color={color} />
          ),
        }}
      /> <Tabs.Screen
        name="MyPlan"
        options={{
          headerShown: false,
          tabBarIcon: ({color,size,focused}) => (
           <Feather name="check-square" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({color, size,focused}) => (
            <FontAwesome6 name={ focused ? 'person-hiking' : 'person-hiking'} size={size} color={color} />
          ),
        }}
      />
    </Tabs> 
     </SafeAreaProvider>
  );
};

export default _layout;
