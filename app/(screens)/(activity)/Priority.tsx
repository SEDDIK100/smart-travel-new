import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "@/redux/stores";
import { setPriority } from "@/redux/slices/activitySlices";
import { router } from "expo-router";
import HeaderQu from "@/components/HeaderQu";
import { getThemeFromKey, getStoneFromKey } from "@/constants/themes";

const OPTIONS = [
  { id: 1,  label: "Get Active",      icon: "🏃", description: "Sport & fitness",       themeKey: "sport_fitness"         },
  { id: 2,  label: "Stay Healthy",    icon: "🌿", description: "Wellness & health",      themeKey: "health"                },
  { id: 3,  label: "Seek Adventure",  icon: "🧭", description: "Outdoor & wild",         themeKey: "adventures"            },
  { id: 4,  label: "Find Romance",    icon: "💕", description: "Love & couple moments",  themeKey: "romance"               },
  { id: 5,  label: "Explore Culture", icon: "🎨", description: "Art, history & food",    themeKey: "culture_discovery"     },
  { id: 6,  label: "Party Hard",      icon: "🎉", description: "Nightlife & festivals",  themeKey: "party_nightlife"       },
  { id: 7,  label: "Hit the Beach",   icon: "🌊", description: "Beach & water sports",   themeKey: "beach_water"           },
  { id: 8,  label: "Learn Something", icon: "📚", description: "Education & skills",     themeKey: "education_learning"    },
  { id: 9,  label: "Find Peace",      icon: "🧘", description: "Relax & meditate",       themeKey: "relaxation_meditation" },
  { id: 10, label: "Go Digital",      icon: "💻", description: "Tech & innovation",      themeKey: "technology"            },
  { id: 11, label: "Game On",         icon: "🎮", description: "Gaming & fun",           themeKey: "gaming"                },
];

export default function Priority() {
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const item   = OPTIONS.find((o) => o.id === selectedId);
  const theme  = item ? getThemeFromKey(item.themeKey) : null;
  const stone  = item ? getStoneFromKey(item.themeKey) : require("@/assets/852.png");
  const accent = theme?.accent ?? "#A3E635";
  const bg     = theme?.bg     ?? "#0d0d0d";
  const cardBg = theme?.cardBg ?? "#1A2235";

  const handleNext = () => {
    if (!item) return;
    dispatch(setPriority({ priority: item.label, themeKey: item.themeKey }));
    router.push("/(screens)/(activity)/Rythm");
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: bg }}>
      <HeaderQu linkPrv="/(screens)/(activity)/activityName" linkNext="/(screens)/(activity)/Rythm" />

      <View className="w-full h-36 items-center">
        <Image className="w-full h-full" resizeMode="contain" source={stone} />
      </View>

      <View className="px-6 mb-3">
        <Text className="text-white text-2xl font-extrabold">What s your vibe?</Text>
        <Text className="text-sm mt-1" style={{ color: item ? accent : "#6b7280" }}>
          {item ? `${item.icon}  ${item.label} — stone unlocked` : "Pick a priority to reveal your stone"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-center">
          {OPTIONS.map((o) => (
            <TouchableOpacity
              key={o.id}
              activeOpacity={0.8}
              onPress={() => setSelectedId(o.id)}
              className="w-[44%] m-1.5 py-4 px-3 rounded-2xl items-center border-2"
              style={{ backgroundColor: selectedId === o.id ? bg : cardBg, borderColor: selectedId === o.id ? accent : "transparent" }}
            >
              <Text className="text-3xl mb-1">{o.icon}</Text>
              <Text className="font-bold text-sm text-center" style={{ color: selectedId === o.id ? accent : "white" }}>{o.label}</Text>
              <Text className="text-gray-500 text-xs text-center mt-0.5">{o.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 items-center" style={{ backgroundColor: bg }}>
        <TouchableOpacity
          onPress={handleNext}
          disabled={!selectedId}
          className="rounded-2xl w-3/5 items-center p-4"
          style={{ backgroundColor: accent, opacity: selectedId ? 1 : 0.4 }}
        >
          <Text className="text-black font-semibold text-xl">Next →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}