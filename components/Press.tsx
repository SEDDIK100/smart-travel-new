import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type props = {
  title: any;
  link: any;
  icon: any;
};

const Press = ( {title, link, icon} : props) => {
  return (
    <>
    
      <View className="items-center mt-2">
        <TouchableOpacity
          onPress={() => router.push(link)}
          className="bg-[#A3E635]  rounded-2xl flex-row w-3/5
                   items-center justify-center active:opacity-90 p-4 "
        >
          <View className="flex-row items-center">
            <Text className="text-black font-semibold text-xl"> {title} </Text>
            <Text className="text-black font-semibold text-lg"> {icon} </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Press;
