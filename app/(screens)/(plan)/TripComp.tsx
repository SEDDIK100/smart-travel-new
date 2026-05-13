import HeaderQu from "@/components/HeaderQu";
import { setTripComp as setAction } from "@/redux/slices/tripSlices";
import { useAppDispatch } from "@/redux/stores";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const options = [
  { id: 1, label: "Solo", icon: "🧍" },
  { id: 2, label: "Couple", icon: "👫" },
  { id: 3, label: "Friends", icon: "👯" },
  { id: 4, label: "Family", icon: "👨‍👩‍👧‍👦" },
];

const TripComp = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number | null>(null);

  const handleNext = () => {
    const item = options.find((d) => d.id === selected);
    if (!item) return;
    dispatch(setAction(item.label));
    router.push("/(screens)/(plan)/TripDuration");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <HeaderQu
        linkPrv="/(screens)/(plan)/TravelMood"
        linkNext="/(screens)/(plan)/TripDuration"
      />

      <View className="items-center w-full h-32">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/852.png")}
        />
      </View>

      <View className="px-6 mb-4">
        <Text className="text-white text-2xl font-extrabold tracking-tight">
        
          who s coming ?
        </Text>
        <Text className="text-gray-400 text-md mt-1">
          Who are you traveling with
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="flex-row flex-wrap justify-center px-4 gap-3">
          {options.map((item) => {
            const isActive = selected === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => setSelected(item.id)}
                className={`w-[28%] py-4 rounded-2xl items-center border ${isActive ? "bg-neutral-950 border-[#A3E635]" : "bg-[#1A2235] border-transparent"}`}
              >
                <Text className="text-2xl mb-1">{item.icon}</Text>
                <Text className="text-white text-sm font-semibold">
                  {item.label}
                </Text>
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
            className={`bg-[#A3E635] rounded-2xl flex-row w-3/5 items-center justify-center active:opacity-90 p-4 ${!selected ? "opacity-50" : ""}`}
          >
            <Text className="text-black font-semibold text-xl">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TripComp;
