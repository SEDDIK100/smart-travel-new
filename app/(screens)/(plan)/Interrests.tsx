import Header from "@/components/Header";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "@/redux/stores";
import { setInterests as setAction } from "@/redux/slices/tripSlices";
import { router } from "expo-router";
import HeaderQu from "@/components/HeaderQu";

const options = [
  { id: 1, label: "Food", icon: "🍜" },
  { id: 2, label: "Culture", icon: "🏛️" },
  { id: 3, label: "Nature", icon: "🌿" },
  { id: 4, label: "Shopping", icon: "🛍️" },
  { id: 5, label: "Events", icon: "🎶" },
  { id: 6, label: "Adventure", icon: "🧗" },
];

const Interests = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (selected.length === 0) return;
    const labels = options.filter((o) => selected.includes(o.id)).map((o) => o.label);
    dispatch(setAction(labels.join(", ")));
    router.push("/(screens)/(plan)/TripStyle");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <HeaderQu linkPrv="/(screens)/(plan)/TripDistance" linkNext="/(screens)/(plan)/TripStyle" />

      <View className="items-center w-full h-32">
        <Image className="w-full h-full" resizeMode="contain" source={require("@/assets/852.png")} />
      </View>

      <View className="px-6 mb-2">
        <Text className="text-white text-2xl font-extrabold tracking-tight">Your interests ?</Text>
        <Text className="text-gray-400 text-md mt-1">Pick all that apply</Text>
      </View>

      {selected.length > 0 && (
        <Text className="text-[#A3E635] text-center text-sm mb-2">
          {selected.length} selected
        </Text>
      )}

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="flex-row flex-wrap justify-center px-4 gap-3">
          {options.map((item) => {
            const isActive = selected.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => toggle(item.id)}
                className={`w-[28%] py-4 rounded-2xl items-center border ${isActive ? "bg-neutral-950 border-[#A3E635]" : "bg-[#1A2235] border-transparent"}`}
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
          <TouchableOpacity onPress={handleNext} disabled={selected.length === 0} className={`bg-[#A3E635] rounded-2xl flex-row w-3/5 items-center justify-center active:opacity-90 p-4 ${selected.length === 0 ? "opacity-50" : ""}`}>
            <Text className="text-black font-semibold text-xl">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Interests;