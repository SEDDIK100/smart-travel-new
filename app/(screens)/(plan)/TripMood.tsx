import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "@/redux/stores";
import { setTripMood } from "@/redux/slices/tripSlices";
import { router } from "expo-router";
import HeaderQu from "@/components/HeaderQu";
import { getThemeFromKey, getStoneFromKey } from "@/constants/themes";

const OPTIONS = [
  { id: 1, label: "Relax",     icon: "😌", themeKey: "relaxation_meditation" },
  { id: 2, label: "Explore",   icon: "🧭", themeKey: "adventures"            },
  { id: 3, label: "Adventure", icon: "⚡", themeKey: "sport_fitness"         },
  { id: 4, label: "Nightlife", icon: "🎉", themeKey: "party_nightlife"       },
  { id: 5, label: "Cultural",  icon: "🏛️", themeKey: "culture_discovery"     },
];

export default function TripMood() {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number | null>(null);

  const item   = OPTIONS.find((o) => o.id === selected);
  const theme  = item ? getThemeFromKey(item.themeKey) : null;
  const stone  = item ? getStoneFromKey(item.themeKey) : require("@/assets/852.png");
  const accent = theme?.accent ?? "#A3E635";
  const bg     = theme?.bg     ?? "#0d0d0d";
  const cardBg = theme?.cardBg ?? "#1A2235";

  const handleNext = () => {
    if (!item) return;
    dispatch(setTripMood({ mood: item.label, themeKey: item.themeKey }));
    router.push("/(screens)/(plan)/TripComp");
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: bg }}>
      <HeaderQu linkPrv="/(screens)/(plan)/DestinationType" linkNext="/(screens)/(plan)/TripComp" />

      <View className="w-full h-36 items-center">
        <Image className="w-full h-full" resizeMode="contain" source={stone} />
      </View>

      <View className="px-6 mb-3">
        <Text className="text-white text-2xl font-extrabold">Travel mood?</Text>
        <Text className="text-sm mt-1" style={{ color: item ? accent : "#6b7280" }}>
          {item ? `${item.icon}  ${item.label} — stone unlocked` : "What vibe are you looking for"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-center gap-3">
          {OPTIONS.map((o) => (
            <TouchableOpacity
              key={o.id}
              activeOpacity={0.8}
              onPress={() => setSelected(o.id)}
              className="w-[44%] py-4 px-3 rounded-2xl items-center border-2"
              style={{ backgroundColor: selected === o.id ? bg : cardBg, borderColor: selected === o.id ? accent : "transparent" }}
            >
              <Text className="text-3xl mb-1">{o.icon}</Text>
              <Text className="font-bold text-sm text-center" style={{ color: selected === o.id ? accent : "white" }}>
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
          <Text className="text-black font-semibold text-xl">Next →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}