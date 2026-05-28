import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/redux/stores";
import { setMood } from "@/redux/slices/activitySlices";
import { router } from "expo-router";
import HeaderQu from "@/components/HeaderQu";
import { getThemeFromKey, getStoneFromKey } from "@/constants/themes";

const OPTIONS = [
  { id: 1,  label: "Happy",       icon: "😊", desc: "Feeling good"        },
  { id: 2,  label: "Excited",     icon: "🤩", desc: "Full of energy"       },
  { id: 3,  label: "Motivated",   icon: "💪", desc: "Ready to push"        },
  { id: 4,  label: "Bored",       icon: "😐", desc: "Need something new"   },
  { id: 5,  label: "Stressed",    icon: "😤", desc: "Need to unwind"       },
  { id: 6,  label: "Sad",         icon: "😔", desc: "Need a mood lift"     },
  { id: 7,  label: "Romantic",    icon: "🥰", desc: "Feeling affectionate" },
  { id: 8,  label: "Curious",     icon: "🤔", desc: "Want to discover"     },
  { id: 9,  label: "Tired",       icon: "😴", desc: "Low energy"           },
  { id: 10, label: "Nostalgic",   icon: "🌅", desc: "Reflective mood"      },
  { id: 11, label: "Adventurous", icon: "🧭", desc: "Craving a challenge"  },
  { id: 12, label: "Peaceful",    icon: "🕊️", desc: "Calm and serene"      },
];

export default function Moods() {
  const dispatch = useAppDispatch();
  const themeKey = useAppSelector((s) => s.activity.themeKey);
  const [selected, setSelected] = useState<number | null>(null);

  const { accent, bg, cardBg } = getThemeFromKey(themeKey);
  const stone = getStoneFromKey(themeKey);

  const handleNext = () => {
    const item = OPTIONS.find((o) => o.id === selected);
    if (!item) return;
    dispatch(setMood(item.label));
    router.push("/(screens)/(activity)/Cadre");
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: bg }}>
      <HeaderQu linkPrv="/(screens)/(activity)/ActivityType" linkNext="/(screens)/(activity)/Cadre" />
      <View className="w-full h-36 items-center">
        <Image className="w-full h-full" resizeMode="contain" source={stone} />
      </View>
      <View className="px-6 mb-3">
        <Text className="text-white text-2xl font-extrabold">How do you feel?</Text>
        <Text className="text-gray-400 text-sm mt-1">Your mood shapes your activity</Text>
      </View>
      <FlatList
        data={OPTIONS}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "center", gap: 10, marginBottom: 10 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} onPress={() => setSelected(item.id)}
            className="w-[28%] py-4 rounded-2xl items-center border-2"
            style={{ backgroundColor: selected === item.id ? bg : cardBg, borderColor: selected === item.id ? accent : "transparent" }}>
            <Text className="text-2xl mb-1">{item.icon}</Text>
            <Text className="text-xs font-bold text-center" style={{ color: selected === item.id ? accent : "white" }}>{item.label}</Text>
            <Text className="text-[10px] text-center mt-0.5 px-1 text-gray-500">{item.desc}</Text>
          </TouchableOpacity>
        )}
      />
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 items-center" style={{ backgroundColor: bg }}>
        <TouchableOpacity onPress={handleNext} disabled={!selected}
          className="rounded-2xl w-3/5 items-center p-4"
          style={{ backgroundColor: accent, opacity: selected ? 1 : 0.4 }}>
          <Text className="text-black font-semibold text-xl">Confirm ✓</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}