import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";
import React from "react";
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',

        tabBarStyle: {
          backgroundColor: "#1A2235",
          paddingTop: 10,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 10,
        },
      }}
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
  );
};

export default _layout;
