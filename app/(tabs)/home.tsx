import { auth } from "@/config";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/redux/stores";

const Home = () => {
  const user = useAppSelector((s) => s.user.user);
  const plans = useAppSelector((s) => s.plans?.plans || []);
  const isGuest = !auth.currentUser;

  const active = plans.filter((p) => p.status === "active").length;
  const completed = plans.filter((p) => p.status === "completed").length;

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]" edges={["top"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Header */}
        <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
          <View>
            
            <Text className="text-white text-2xl font-extrabold">
              {isGuest ? "Explore as Guest" : "Your Dashboard"}
            </Text>
          </View>
          <TouchableOpacity className="w-10 h-10">
            <Image
              className="h-full w-full rounded-full"
              resizeMode="contain"
              source={require("@/assets/st.jpg")}
            />
          </TouchableOpacity>
        </View>

        {/* Guest banner */}
        {isGuest && (
          <TouchableOpacity
            onPress={() => router.push("/(auth)/signin")}
            className="mx-4 mt-4 bg-[#1A2235] rounded-2xl p-4 flex-row items-center border border-[#A3E635]/30"
          >
            <FontAwesome6 name="user-plus" size={20} color="#A3E635" />
            <View className="ml-3 flex-1">
              <Text className="text-white font-semibold">Sign in to save your plans</Text>
              <Text className="text-gray-500 text-xs mt-0.5">Track progress & unlock achievements</Text>
            </View>
            <FontAwesome6 name="chevron-right" size={14} color="#A3E635" />
          </TouchableOpacity>
        )}

        {/* Stats (auth only) */}
        {!isGuest && (
          <View className="flex-row mx-4 mt-4 gap-3">
            <View className="flex-1 bg-[#1A2235] rounded-2xl p-4 items-center">
              <Text className="text-[#A3E635] text-3xl font-extrabold">{active}</Text>
              <Text className="text-gray-400 text-xs mt-1">Active Plans</Text>
            </View>
            <View className="flex-1 bg-[#1A2235] rounded-2xl p-4 items-center">
              <Text className="text-[#A3E635] text-3xl font-extrabold">{completed}</Text>
              <Text className="text-gray-400 text-xs mt-1">Achievements</Text>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <Text className="text-white text-lg font-bold px-6 mt-6 mb-3">Quick Start</Text>

        <TouchableOpacity
          onPress={() => router.push("/(screens)/(plan)/TripName")}
          className="mx-4 mb-3 bg-[#1A2235] rounded-2xl p-5 flex-row items-center"
        >
          <Text className="text-3xl mr-4">🌍</Text>
          <View className="flex-1">
            <Text className="text-white font-bold text-base">Plan a Trip</Text>
            <Text className="text-gray-500 text-sm">Create your perfect travel itinerary</Text>
          </View>
          <FontAwesome6 name="chevron-right" size={14} color="#71717a" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(screens)/(activity)/activityName")}
          className="mx-4 mb-3 bg-[#1A2235] rounded-2xl p-5 flex-row items-center"
        >
          <Text className="text-3xl mr-4">🎯</Text>
          <View className="flex-1">
            <Text className="text-white font-bold text-base">Find an Activity</Text>
            <Text className="text-gray-500 text-sm">Discover something fun to do today</Text>
          </View>
          <FontAwesome6 name="chevron-right" size={14} color="#71717a" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(screens)/(chatbot)/ChatBot")}
          className="mx-4 mb-3 bg-[#1A2235] rounded-2xl p-5 flex-row items-center"
        >
          <Text className="text-3xl mr-4">💬</Text>
          <View className="flex-1">
            <Text className="text-white font-bold text-base">AI Assistant</Text>
            <Text className="text-gray-500 text-sm">Ask anything about travel & activities</Text>
          </View>
          <FontAwesome6 name="chevron-right" size={14} color="#71717a" />
        </TouchableOpacity>

        {/* User info (auth only) */}
        {!isGuest && user?.gender && (
          <View className="mx-4 mt-4 bg-[#1A2235] rounded-2xl p-4">
            <Text className="text-gray-500 text-xs uppercase tracking-wider mb-2">Your Profile</Text>
            <View className="flex-row flex-wrap gap-2">
              {user.username ? <Text className="text-xs text-gray-400 bg-[#0d0d0d] px-3 py-1.5 rounded-full">👤 {user.username}</Text> : null}
              {user.age ? <Text className="text-xs text-gray-400 bg-[#0d0d0d] px-3 py-1.5 rounded-full">🎂 {user.age} years</Text> : null}
              {user.gender ? <Text className="text-xs text-gray-400 bg-[#0d0d0d] px-3 py-1.5 rounded-full">⚧ {user.gender}</Text> : null}
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;