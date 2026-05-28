import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { useAppSelector } from "@/redux/stores";
import HeaderQu from "@/components/HeaderQu";
import { getThemeFromKey, getStoneFromKey } from "@/constants/themes";

export default function TripSummary() {
  const trip = useAppSelector((s) => s.trip);
  const user = useAppSelector((s) => s.user.user);
  const { accent, bg, cardBg } = getThemeFromKey(trip.themeKey);
  const stone = getStoneFromKey(trip.themeKey);

  const rows = [
    { icon: "🌍", label: "Trip name",   value: trip.tripName        },
    { icon: "🏷️", label: "Destination", value: trip.destinationType },
    { icon: "😊", label: "Mood",        value: trip.travelMood      },
    { icon: "👥", label: "Travellers",  value: trip.travellers      },
    { icon: "💰", label: "Budget",      value: trip.budget          },
    { icon: "🚗", label: "Distance",    value: trip.travelDistance  },
    { icon: "🎯", label: "Interests",   value: trip.interests       },
    { icon: "🎒", label: "Style",       value: trip.travelStyle     },
    { icon: "👤", label: "Gender",      value: user?.gender ?? ""   },
    { icon: "🎂", label: "Age",         value: user?.age ? `${user.age} years` : "" },
  ].filter((r) => r.value);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: bg }}>
      <HeaderQu linkPrv="/(screens)/(plan)/TripBudget" linkNext="/(screens)/(plan)/PlanRes" />

      <View className="w-full h-36 items-center">
        <Image className="w-full h-full" resizeMode="contain" source={stone} />
      </View>

      <View className="px-6 mt-2 mb-4">
        <Text className="text-white text-2xl font-extrabold">Your trip summary</Text>
        <Text className="text-gray-500 text-sm mt-1">Review before generating</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="rounded-2xl p-5" style={{ backgroundColor: cardBg }}>
          {rows.map((row, i) => (
            <View
              key={row.label}
              className="flex-row items-center py-3"
              style={{ borderBottomWidth: i < rows.length - 1 ? 1 : 0, borderBottomColor: bg }}
            >
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
          <Text className="text-gray-400 font-semibold text-base">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(screens)/(plan)/PlanRes")}
          className="flex-2 rounded-2xl py-4 flex-row items-center justify-center gap-2"
          style={{ flex: 2, backgroundColor: accent }}
        >
          <FontAwesome6 name="wand-magic-sparkles" size={16} color="#000" />
          <Text className="text-black font-semibold text-base">Generate Plan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}