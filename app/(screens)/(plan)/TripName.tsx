import HeaderQu from "@/components/HeaderQu";
import { setTripName as setTripNameAction } from "@/redux/slices/tripSlices";
import { useAppDispatch } from "@/redux/stores";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const TripName = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");

  const handleNext = () => {
    dispatch(setTripNameAction(name.trim()));
    router.push("/(screens)/(plan)/TripMood");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <HeaderQu linkPrv="/(tabs)/(guide)/guide" linkNext="/(screens)/(plan)/TripMood" />

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
          className={`text-white py-4 bg-[#1A2235] px-5 rounded-2xl mb-2`}
          placeholder="Trip Name"
          placeholderTextColor="#64748B"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-[#0d0d0d]">
        <View className="items-center">
         
          <TouchableOpacity
            onPress={handleNext}
            disabled={!name}
            className={`bg-[#A3E635] rounded-2xl flex-row w-3/5 items-center justify-center
                   active:opacity-90 p-4 ${!name ? "opacity-50" : ""}`}
          >
            <Text className="text-black font-semibold text-xl">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TripName;
