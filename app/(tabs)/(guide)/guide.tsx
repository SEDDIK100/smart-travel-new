import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




const Guide = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      {/*header*/}
      <View className="flex-row items-center justify-between mx-6 ">
        <Text className="text-white"> seaRock </Text>

        <TouchableOpacity className="h-20 w-20 ">
          <Image
            className="h-full w-full"
            resizeMode="contain"
            source={require("@/assets/rock4.png")}
          />
        </TouchableOpacity>
      </View>

      {/*logo*/}
      <View className=" items-center w-full h-56 ">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/rock3.png")}
        />
      </View>

      <View className="items-center mx-6 mb-10">
        <Text className="text-white text-2xl font-bold text-center mb-1 ">
          Quick Plan
        </Text>
        <Text className="text-gray-400 text-center text-base mb-3">
          “Need something quick? Let s get your trip ready in just a few taps.”
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(screens)/(activity)/activityName")}
          className="bg-[#A3E635] w-3/5 border border-white justify-center py-3
        flex-row rounded-2xl space-x-4 items-center"
        >
          <Text className="text-center text-lg "> Activity </Text>
          <AntDesign name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View className="items-center mx-6">
        <Text className="text-white text-2xl font-bold text-center mb-1 ">
          Trip
        </Text>
        <Text className="text-gray-400 text-center text-base mb-3">
          “Prefer to plan it all? Customize every detail for the perfect
          journey.””
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/(screens)/(plan)/TripName")}
          className="bg-[#A3E635] w-3/5 border border-white justify-center py-3 flex-row rounded-2xl space-x-4 items-center"
        >
          <Text className="text-center text-lg "> Generate Trip </Text>
          <FontAwesome5 name="magic" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View className="items-center mx-6">
        <Text className="text-white text-2xl font-bold text-center mb-1 ">
          Chat Bot
        </Text>
        <Text className="text-gray-400 text-center text-base mb-3">
          ask chat bot
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/(guide)/ChatBot")}
          className="bg-[#A3E635] w-3/5 border border-white justify-center py-3 flex-row rounded-2xl space-x-4 items-center"
        >
          <Text className="text-center text-lg "> ask </Text>
          <FontAwesome5 name="magic" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/*button*/}
    </SafeAreaView>
  );
};

export default Guide;
