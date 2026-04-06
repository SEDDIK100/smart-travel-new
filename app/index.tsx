import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

const Index = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <View className="flex-1 items-center ">
        <Image
          className=" shadow-slate-700 absolute"
          source={require("@/assets/999.png")}
        />

        <View className="flex-col justify-center items-center top-1/2">
          <Text className="text-5xl text-white font-bold mt-2 max-w-xl  text-bold text-center">
            Plan Less {"\n"} Experience More
          </Text>
          <Text className="text-center text-sm p-6 text-gray-500">
            Discover your next adventure efffortlesly. Personalized itineraries
            at your fingertips . Travel smarter with ai driven insights.
          </Text>

          <TouchableOpacity
            onPress={() => router.replace("/(welcome)/welcome")}
            className="gap-2 px-4  border border-white items-center justify-center py-3 mt-8 flex-row rounded-full"
          >
            <Text className="text-center text-lg text-white">Let s start</Text>
            <FontAwesome5 name="plane-departure" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
