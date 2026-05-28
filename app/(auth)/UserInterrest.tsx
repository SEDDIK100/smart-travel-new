import Header from "@/components/Header";
import { auth, db } from "@/config";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useCallback } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/redux/stores";
import { router, useFocusEffect } from "expo-router";
import { setUser } from "@/redux/slices/userSlices";

const interrests = [
  { id: 1, label: "Travel", icon: "✈️" },
  { id: 2, label: "Road Trips", icon: "🚗" },
  { id: 3, label: "Camping", icon: "🏕️" },
  { id: 4, label: "Beach", icon: "🏖️" },
  { id: 5, label: "Mountains", icon: "⛰️" },
  { id: 6, label: "Gym", icon: "💪" },
  { id: 7, label: "Running", icon: "🏃" },
  { id: 8, label: "Swimming", icon: "🏊" },
  { id: 9, label: "Football", icon: "⚽" },
  { id: 10, label: "Yoga", icon: "🧘" },
  { id: 11, label: "Cycling", icon: "🚴" },
  { id: 12, label: "Hiking", icon: "🥾" },
  { id: 13, label: "Martial Arts", icon: "🥋" },
  { id: 14, label: "Music", icon: "🎵" },
  { id: 15, label: "Drawing", icon: "🎨" },
  { id: 16, label: "Photography", icon: "📸" },
  { id: 17, label: "Dancing", icon: "💃" },
  { id: 18, label: "Singing", icon: "🎤" },
  { id: 19, label: "Cooking", icon: "👨‍🍳" },
  { id: 20, label: "Food", icon: "🍜" },
  { id: 21, label: "Coffee", icon: "☕" },
  { id: 22, label: "Baking", icon: "🧁" },
  { id: 23, label: "Reading", icon: "📚" },
  { id: 24, label: "History", icon: "🏛️" },
  { id: 25, label: "Languages", icon: "🗣️" },
  { id: 26, label: "Science", icon: "🔬" },
  { id: 27, label: "Technology", icon: "💻" },
  { id: 28, label: "Gaming", icon: "🎮" },
  { id: 29, label: "Movies", icon: "🎬" },
  { id: 30, label: "Shopping", icon: "🛍️" },
  { id: 31, label: "Volunteering", icon: "🤝" },
  { id: 32, label: "Events", icon: "🎉" },
  { id: 33, label: "Nightlife", icon: "🌙" },
  { id: 34, label: "Nature", icon: "🌿" },
  { id: 35, label: "Gardening", icon: "🌱" },
  { id: 36, label: "Meditation", icon: "🧘‍♂️" },
  { id: 37, label: "Spa", icon: "🧖" },
  { id: 38, label: "Animals", icon: "🐾" },
  { id: 39, label: "Surfing", icon: "🏄" },
  { id: 40, label: "Climbing", icon: "🧗" },
  { id: 41, label: "Skiing", icon: "⛷️" },
  { id: 42, label: "Diving", icon: "🤿" },
  { id: 43, label: "Paragliding", icon: "🪂" },
];

const UserInterests = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.user.user);
  const [selected, setSelected] = useState<number[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (!currentUser?.interrests) { setSelected([]); return; }
      const labels = currentUser.interrests.split(",").map((s) => s.trim());
      setSelected(interrests.filter((i) => labels.includes(i.label)).map((i) => i.id));
    }, [currentUser])
  );

  const toggle = (id: number) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const handleNext = async () => {
    if (selected.length === 0) return;
    const joined = interrests.filter((o) => selected.includes(o.id)).map((o) => o.label).join(", ");
    const uid = auth.currentUser?.uid;
    if (uid) await updateDoc(doc(db, "users", uid), { interests: joined }).catch(console.log);
    if (currentUser) dispatch(setUser({ user: { ...currentUser, interrests: joined }, token: null }));
    router.push("/(tabs)/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <Header link="/(auth)/informPer" />
      <View className="items-center w-full h-20">
        <Image className="w-full h-full" resizeMode="contain" source={require("@/assets/852.png")} />
      </View>
      <View className="px-6 mb-2">
        <Text className="text-white text-2xl font-extrabold tracking-tight">What do you enjoy ?</Text>
        <Text className="text-gray-400 text-md mt-1">Pick everything you like (3 minimum)</Text>
      </View>
      {selected.length > 0 && <Text className="text-[#A3E635] text-center text-sm mb-2">{selected.length} selected</Text>}
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="flex-row flex-wrap justify-center px-4 gap-3">
          {interrests.map((item) => {
            const isActive = selected.includes(item.id);
            return (
              <TouchableOpacity key={item.id} activeOpacity={0.8} onPress={() => toggle(item.id)} className={`w-[28%] py-3 rounded-2xl items-center border ${isActive ? "bg-neutral-950 border-[#A3E635]" : "bg-[#1A2235] border-transparent"}`}>
                <Text className="text-2xl mb-1">{item.icon}</Text>
                <Text className="text-white text-xs font-semibold">{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-[#0d0d0d]">
        <View className="items-center">
          <TouchableOpacity onPress={() => router.push("/(tabs)/home")} className="mb-3">
            <Text className="text-gray-500 text-base">Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} disabled={selected.length < 3}
           className={`bg-[#A3E635] rounded-2xl flex-row w-3/5 items-center justify-center active:opacity-90 p-4 ${selected.length < 3 ? "opacity-50" : ""}`}>
            <Text className="text-black font-semibold text-xl">Confirm ({selected.length})</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserInterests;