import Header from "@/components/Header";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/redux/stores";



const Row = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View className="flex-row items-center py-3 border-b border-[#1A2235]">
    <Text className="text-xl mr-3">{icon}</Text>
    <View className="flex-1">
      <Text className="text-gray-500 text-xs uppercase tracking-wider">{label}</Text>
      <Text className="text-white text-base font-semibold mt-0.5">{value || "—"}</Text>
    </View>
  </View>
);

const ActivitySummary = () => {
  const a = useAppSelector((state) => state.activity);
  const user = useAppSelector((state) => state.user.user);

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <Header link="/(screens)/(activity)/Companions" />

      <View className="px-6 mt-4 mb-4">
        <Text className="text-white text-2xl font-extrabold tracking-tight">Your activity summary</Text>
        <Text className="text-gray-400 text-md mt-1">Review before generating</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="bg-[#1A2235] rounded-2xl p-5">
          <Row icon="🎯" label="Activity name" value={a.activityName} />
          <Row icon="😊" label="Mood" value={a.mood} />
          <Row icon="📍" label="Position" value={a.position} />
          <Row icon="🏷️" label="Activity type" value={a.activityType} />
          <Row icon="⏱️" label="Duration" value={a.duration} />
          <Row icon="🎯" label="Priority" value={a.priority} />
          <Row icon="🏃" label="Rhythm" value={a.rythme} />
          <Row icon="🌿" label="Setting" value={a.cadre} />
          <Row icon="👥" label="Companions" value={a.companions} />
          {user?.gender && <Row icon="👤" label="Gender" value={user.gender} />}
          {user?.age && <Row icon="🎂" label="Age" value={`${user.age} years`} />}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-[#0d0d0d]">
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 border border-gray-600 rounded-2xl py-4 items-center"
          >
            <Text className="text-gray-400 font-semibold text-base">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(screens)/(activity)/ActivityRes")}
            className="flex-[2] bg-[#A3E635] rounded-2xl py-4 items-center flex-row justify-center gap-2"
          >
            <FontAwesome6 name="wand-magic-sparkles" size={16} color="#000" />
            <Text className="text-black font-semibold text-lg">Generate Plan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ActivitySummary;