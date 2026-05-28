import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/redux/stores";
import { setInterests } from "@/redux/slices/tripSlices";
import { router } from "expo-router";
import HeaderQu from "@/components/HeaderQu";
import { getThemeFromKey, getStoneFromKey } from "@/constants/themes";

const OPTIONS = [
  { id: 1,  label: "Get Active",      icon: "🏃", desc: "Sport & fitness"      },
  { id: 2,  label: "Stay Healthy",    icon: "🌿", desc: "Wellness & health"     },
  { id: 3,  label: "Seek Adventure",  icon: "🧭", desc: "Outdoor & wild"        },
  { id: 4,  label: "Find Romance",    icon: "💕", desc: "Love & couple moments" },
  { id: 5,  label: "Explore Culture", icon: "🎨", desc: "Art, history & food"   },
  { id: 6,  label: "Party Hard",      icon: "🎉", desc: "Nightlife & festivals" },
  { id: 7,  label: "Hit the Beach",   icon: "🌊", desc: "Beach & water sports"  },
  { id: 8,  label: "Learn Something", icon: "📚", desc: "Education & skills"    },
  { id: 9,  label: "Find Peace",      icon: "🧘", desc: "Relax & meditate"      },
  { id: 10, label: "Go Digital",      icon: "💻", desc: "Tech & innovation"     },
  { id: 11, label: "Game On",         icon: "🎮", desc: "Gaming & fun"          },
];

export default function Interests() {
  const dispatch = useAppDispatch();
  const themeKey = useAppSelector((s) => s.trip.themeKey);
  const [selected, setSelected] = useState<number | null>(null);

  const { accent, bg, cardBg } = getThemeFromKey(themeKey);
  const stone = getStoneFromKey(themeKey);

  const handleNext = () => {
    const item = OPTIONS.find((o) => o.id === selected);
    if (!item) return;
    dispatch(setInterests(item.label));
    router.push("/(screens)/(plan)/TripStyle");
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: bg }}>
      <HeaderQu linkPrv="/(screens)/(plan)/TripDistance" linkNext="/(screens)/(plan)/TripStyle" />

      <View className="w-full h-36 items-center">
        <Image className="w-full h-full" resizeMode="contain" source={stone} />
      </View>

      <View className="px-6 mb-3">
        <Text className="text-white text-2xl font-extrabold">Your main interest?</Text>
        <Text className="text-gray-400 text-sm mt-1">Pick what drives your trip</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-center">
          {OPTIONS.map((o) => (
            <TouchableOpacity
              key={o.id}
              activeOpacity={0.8}
              onPress={() => setSelected(o.id)}
              className="w-[44%] m-1.5 py-4 px-3 rounded-2xl items-center border-2"
              style={{ backgroundColor: selected === o.id ? bg : cardBg, borderColor: selected === o.id ? accent : "transparent" }}
            >
              <Text className="text-3xl mb-1">{o.icon}</Text>
              <Text className="font-bold text-sm text-center" style={{ color: selected === o.id ? accent : "white" }}>{o.label}</Text>
              <Text className="text-gray-500 text-xs text-center mt-0.5">{o.desc}</Text>
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