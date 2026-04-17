import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

interface header {
    link : any;
}

const Header = ({link}: header) => {
  return (
    <View className="flex-row items-center justify-between px-6 mt-2">
            <TouchableOpacity  
              onPress={() => router.push(link)}
              className="bg-[#1c1c1e] border border-white/10 rounded-full h-10 w-10 items-center justify-center"
            >
              <Text className="text-white text-lg">{"<-"}</Text>
            </TouchableOpacity>
    
            <TouchableOpacity className="w-12 h-12">
              <Image
                className="h-full w-full rounded-full border-2 border-zinc-700"
                resizeMode="contain"
                source={require("@/assets/st.jpg")}
              />
            </TouchableOpacity>
          </View>
    
  )
}

export default Header