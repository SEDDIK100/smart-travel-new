import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "@/redux/stores";
import { setDuration as setDurationAction } from "@/redux/slices/activitySlices";
import { router } from "expo-router";
import HeaderQu from "@/components/HeaderQu";

const durations = [
  { id: 1, label: "15 min", icon: "⚡" },
  { id: 2, label: "30 min", icon: "🕐" },
  { id: 3, label: "1 hour", icon: "🕑" },
  { id: 4, label: "2 hours", icon: "🕒" },
  { id: 5, label: "3 hours", icon: "🕓" },
  { id: 6, label: "Half day", icon: "🌤️" },
  { id: 7, label: "Full day", icon: "☀️" },
  { id: 8, label: "Weekend", icon: "🗓️" },
  { id: 9, label: "1 week", icon: "📅" },
];

const Duration = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number | null>(null);

  const handleNext = () => {
    const item = durations.find((d) => d.id === selected);
    if (!item) return;
    dispatch(setDurationAction(item.label));
    router.push("/(screens)/(activity)/Position");
  };      
                             
  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <HeaderQu linkPrv="/(screens)/(activity)/ActivityType" linkNext="/(screens)/(activity)/Position"   />

      <View className="items-center w-full h-32">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/852.png")}
        />
      </View>

      <View className="px-6 mb-4">
        <Text className="text-white text-2xl font-extrabold tracking-tight">
          How long ?
        </Text>
        <Text className="text-gray-400 text-md mt-1">
          Choose the duration of your activity
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="flex-row flex-wrap justify-center px-4 gap-3">
          {durations.map((item) => {
            const isActive = selected === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => setSelected(item.id)}
                className={`w-[28%] py-4 rounded-2xl items-center border ${
                  isActive
                    ? "bg-neutral-950 border-[#A3E635]"
                    : "bg-[#1A2235] border-transparent"
                }`}
              >
                <Text className="text-2xl mb-1">{item.icon}</Text>
                <Text className="text-white text-sm font-semibold">{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-[#0d0d0d]">
        <View className="items-center">
          <TouchableOpacity
            onPress={handleNext}
            disabled={!selected}
            className={`bg-[#A3E635] rounded-2xl flex-row w-3/5
              items-center justify-center active:opacity-90 p-4 
              ${!selected ? "opacity-50" : ""}`}
          >
            <Text className="text-black font-semibold text-xl">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Duration;