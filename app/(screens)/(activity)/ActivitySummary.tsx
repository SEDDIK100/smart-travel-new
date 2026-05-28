import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useAppSelector } from "@/redux/stores";
import { router } from "expo-router";
import HeaderQu from "@/components/HeaderQu";
import { getThemeFromKey, getStoneFromKey } from "@/constants/themes";

export default function ActivitySummary() {
  const activity = useAppSelector((s) => s.activity);
  const { accent, bg, cardBg } = getThemeFromKey(activity.themeKey);
  const stone = getStoneFromKey(activity.themeKey);

  const rows = [
    { icon: "✏️", label: "Activity name", value: activity.activityName },
    { icon: "🎯", label: "Category",       value: activity.activityType },
    { icon: "😊", label: "Mood",           value: activity.mood         },
    { icon: "🏞️", label: "Setting",        value: activity.cadre        },
    { icon: "⭐", label: "Priority",       value: activity.priority     },
    { icon: "⏱️", label: "Duration",       value: activity.duration     },
    { icon: "⚡", label: "Rhythm",         value: activity.rythme       },
    { icon: "👥", label: "Companions",     value: activity.companions   },
  ].filter((r) => r.value);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: bg }}>
      <HeaderQu linkPrv="/(screens)/(activity)/Cadre" linkNext="/(screens)/(activity)/ActivityRes" />

      <View className="w-full h-36 items-center">
        <Image className="w-full h-full" resizeMode="contain" source={stone} />
      </View>

      <View className="px-6 mt-2 mb-4">
        <Text className="text-white text-2xl font-extrabold">Your activity summary</Text>
        <Text className="text-gray-500 text-sm mt-1">Review before generating</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="rounded-2xl p-5" style={{ backgroundColor: cardBg }}>
          {rows.map((row, i) => (
            <View key={row.label} className="flex-row items-center py-3"
              style={{ borderBottomWidth: i < rows.length - 1 ? 1 : 0, borderBottomColor: bg }}>
              <Text className="text-xl mr-3">{row.icon}</Text>
              <View className="flex-1">
                <Text className="text-gray-400 text-xs uppercase tracking-widest">{row.label}</Text>
                <Text className="text-white text-sm font-semibold mt-0.5">{row.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 flex-row gap-3" style={{ backgroundColor: bg }}>
        <TouchableOpacity onPress={() => router.back()} className="flex-1 border border-gray-600 rounded-2xl py-4 items-center">
          <Text className="text-gray-400 font-semibold">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(screens)/(activity)/ActivityRes")}
          className="rounded-2xl py-4 flex-row items-center justify-center gap-2"
          style={{ flex: 2, backgroundColor: accent }}
        >
          <FontAwesome6 name="wand-magic-sparkles" size={16} color="#000" />
          <Text className="text-black font-semibold text-base">Generate Plan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}