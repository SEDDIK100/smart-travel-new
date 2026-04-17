import Header from "@/components/Header";
import Press from "@/components/Press";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const TripName = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
     <Header link="/(tabs)/(guide)/guide"/>
    
      <View className=" items-center w-full h-72 ">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/rock3.png")}
        />
      </View>

    
     <View className="px-5">
               <Text className="text-sm text-gray-300 mb-2"> Your trip name * </Text>
               <TextInput
                 className={`text-white py-4 bg bg-[#1A2235] px-5 rounded-2xl 
                mb-2`}
                 placeholder="Trip Name"
                 placeholderTextColor="#64748B"
                 
                 autoCapitalize="none"
                 autoCorrect={false}
                 textContentType="emailAddress"
     
               />


               </View>  

      {/*btn*/}

      <View className="my-6" >
        <Press
          title="confirm"
          link={"/(screens)/(plan)/travellers"}
          icon=""
          style=""
        />
      </View>
    </SafeAreaView>
  );
};

export default TripName;
