import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/redux/stores";
import { setTripDuration } from "@/redux/slices/tripSlices";
import { router } from "expo-router";
import HeaderQu from "@/components/HeaderQu";
import { getThemeFromKey, getStoneFromKey } from "@/constants/themes";

const OPTIONS = [
  { id: 1, label: "1 day",    icon: "📍" },
  { id: 2, label: "Weekend",  icon: "🗓️" },
  { id: 3, label: "4-7 days", icon: "✈️" },
  { id: 4, label: "1+ week",  icon: "🌍" },
];

export default function TripDuration() {
  const dispatch = useAppDispatch();
  const themeKey = useAppSelector((s) => s.trip.themeKey);
  const [selected, setSelected] = useState<number | null>(null);

  const { accent, bg, cardBg } = getThemeFromKey(themeKey);
  const stone = getStoneFromKey(themeKey);

  const handleNext = () => {
    const item = OPTIONS.find((o) => o.id === selected);
    if (!item) return;
    dispatch(setTripDuration(item.label));
    router.push("/(screens)/(plan)/TripDistance");
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: bg }}>
      <HeaderQu linkPrv="/(screens)/(plan)/TripComp" linkNext="/(screens)/(plan)/TripDistance" />

      <View className="w-full h-36 items-center">
        <Image className="w-full h-full" resizeMode="contain" source={stone} />
      </View>

      <View className="px-6 mb-3">
        <Text className="text-white text-2xl font-extrabold">How long?</Text>
        <Text className="text-gray-400 text-sm mt-1">How long is your trip</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="flex-row flex-wrap justify-center px-4 gap-3">
          {OPTIONS.map((o) => (
            <TouchableOpacity
              key={o.id}
              activeOpacity={0.8}
              onPress={() => setSelected(o.id)}
              className="w-[28%] py-4 rounded-2xl items-center border-2"
              style={{ backgroundColor: selected === o.id ? bg : cardBg, borderColor: selected === o.id ? accent : "transparent" }}
            >
              <Text className="text-2xl mb-1">{o.icon}</Text>
              <Text className="text-sm font-semibold" style={{ color: selected === o.id ? accent : "white" }}>
                {o.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 items-center" style={{ backgroundColor: bg }}>
        <TouchableOpacity
          onPress={handleNext}
          disabled={!selected}
          className="rounded-2xl w-3/5 items-center p-4"
          style={{ backgroundColor: accent, opacity: selected ? 1 : 0.4 }}
        >
          <Text className="text-black font-semibold text-xl">Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}