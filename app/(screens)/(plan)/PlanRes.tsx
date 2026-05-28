import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "@/config";
import { API_BASE_URL } from "@/api";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAppSelector, useAppDispatch } from "@/redux/stores";
import { resetTrip } from "@/redux/slices/tripSlices";
import { getThemeFromKey, getStoneFromKey } from "@/constants/themes";

export default function PlanRes() {
  const dispatch = useAppDispatch();
  const trip     = useAppSelector((s) => s.trip);
  const user     = useAppSelector((s) => s.user.user);

  const theme = getThemeFromKey(trip.themeKey);
  const stone = getStoneFromKey(trip.themeKey);

  const [tasks,   setTasks]   = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");
  const fetched = useRef(false);

  const generate = async () => {
    setLoading(true);
    setError("");
    try {
      const res  = await fetch(`${API_BASE_URL}/generate-trip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip_name:        trip.tripName,
          destination_type: trip.destinationType,
          travel_mood:      trip.travelMood,
          travellers:       trip.travellers,
          trip_duration:    trip.tripDuration,
          budget:           trip.budget,
          travel_distance:  trip.travelDistance,
          interests:        trip.interests,
          travel_style:     trip.travelStyle,
          gender:           user?.gender,
          age:              user?.age,
          nationality:      user?.nationality,
          living_in:        user?.livingIn,
          user_interests:   user?.interrests,
        }),
      });
      const data = JSON.parse(await res.text());
      if (!res.ok || !data.tasks?.length) { setError("Generation failed"); return; }
      setTasks(data.tasks);
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fetched.current) { fetched.current = true; generate(); }
  }, []);

  const save = async () => {
    if (!user) {
      Alert.alert("Login required", "Create an account to save plans.", [
        { text: "Later", style: "cancel" },
        { text: "Sign in", onPress: () => router.push("/(auth)/signin") },
      ]);
      return;
    }
    const uid = auth.currentUser?.uid ?? (user as any)?.id;
    if (!uid || !tasks.length) return;

    setSaving(true);
    try {
      await addDoc(collection(db, "users", uid, "plans"), {
        type: "trip", status: "active", tripName: trip.tripName, theme: theme.key,
        tasks: tasks.map((t, i) => ({ ...t, id: `t${i}`, rating: 0 })),
        overallRating: 0, createdAt: serverTimestamp(), completedAt: null,
      });
      await addDoc(collection(db, "public_plans"), {
        planType: "trip", theme: theme.key, createdAt: serverTimestamp(),
        choices: { destinationType: trip.destinationType, travelMood: trip.travelMood, travellers: trip.travellers, tripDuration: trip.tripDuration,
           budget: trip.budget, travelDistance: trip.travelDistance, interests: trip.interests, travelStyle: trip.travelStyle },
        userProfile: { gender: user?.gender ?? "", nationality: user?.nationality ?? "", age: user?.age ?? null },
      }).catch(() => {});
      dispatch(resetTrip());
      router.replace("/(tabs)/MyPlan");
    } catch {
      Alert.alert("Error", "Could not save. Check your connection.");
    } finally {
      setSaving(false);
    }
  };

  if (loading && !tasks.length) return (
    <SafeAreaView className="flex-1 items-center justify-center" style={{ backgroundColor: theme.bg }}>
      <ActivityIndicator size="large" color={theme.accent} />
      <Text className="font-bold text-xl mt-6" style={{ color: theme.title }}>Preparing your trip...</Text>
    </SafeAreaView>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.bg }}>

      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b" style={{ borderColor: theme.cardBg }}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome6 name="arrow-left" size={20} color={theme.title} />
        </TouchableOpacity>
        <Text className="flex-1 font-bold text-lg text-center" style={{ color: theme.accent }}>
          {trip.tripName}
        </Text>
        <View className="w-5" />
      </View>

      {error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-red-400 text-center mb-6">{error}</Text>
          <TouchableOpacity onPress={generate} className="px-8 py-3 rounded-2xl" style={{ backgroundColor: theme.accent }}>
            <Text className="font-bold text-black">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 180 }}>

          <View className="items-center mb-4">
            <Image source={stone} className="w-44 h-44 rounded-2xl" resizeMode="cover" />
          </View>

          <Text className="text-2xl font-extrabold text-center mb-1" style={{ color: theme.title }}>{trip.tripName}</Text>
          <Text className="text-xs text-center uppercase tracking-widest mb-6" style={{ color: theme.subtitle }}>{theme.key}</Text>

          {tasks.map((item, i) => (
            <View key={i} className="rounded-2xl p-4 mb-3" style={{ backgroundColor: theme.cardBg }}>
              <View className="flex-row items-center gap-2 mb-2">
                <View className="w-6 h-6 rounded-full items-center justify-center" style={{ backgroundColor: theme.accent }}>
                  <Text className="font-bold text-xs text-black">{i + 1}</Text>
                </View>
                <Text className="font-bold flex-1 text-base" style={{ color: theme.title }}>{item.title}</Text>
              </View>
              {item.description && <Text className="text-sm mb-3" style={{ color: theme.subtitle }}>{item.description}</Text>}
              <View className="flex-row flex-wrap gap-2">
                {item.day      && <Text className="text-xs px-2 py-1 rounded" style={{ backgroundColor: theme.badge, color: theme.badgeText }}>📅 {item.day}</Text>}
                {item.duration && <Text className="text-xs px-2 py-1 rounded" style={{ backgroundColor: theme.badge, color: theme.badgeText }}>⏱ {item.duration}</Text>}
                {item.cost     && <Text className="text-xs px-2 py-1 rounded" style={{ backgroundColor: theme.badge, color: theme.badgeText }}>💰 {item.cost}</Text>}
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {!error && (
        <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4" style={{ backgroundColor: theme.bg + "f0" }}>
          <TouchableOpacity onPress={generate} disabled={loading} className="border rounded-2xl py-3 items-center mb-3" style={{ borderColor: theme.accent }}>
            <Text className="font-semibold" style={{ color: theme.accent }}>{loading ? "Generating..." : "Another suggestion "}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={save} disabled={saving} className="rounded-2xl py-4 items-center" style={{ backgroundColor: theme.accent }}>
            {saving ? <ActivityIndicator color="#000" /> : <Text className="font-bold text-lg text-black">Choose this plan </Text>}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}