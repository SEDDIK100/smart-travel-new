import { auth, db } from "@/config";
import { API_BASE_URL } from "@/api";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector, useAppDispatch } from "@/redux/stores";
import { resetActivity } from "@/redux/slices/activitySlices";

const ActivityRes = () => {
  const dispatch = useAppDispatch();
  const act = useAppSelector((s) => s.activity);
  const user = useAppSelector((s) => s.user.user);
  const [allPlans, setAllPlans] = useState<any[][]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetched = useRef(false);

  useEffect(() => { if (!fetched.current) { fetched.current = true; generate(); } }, []);

  const generate = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/generate-activity`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity_name: act.activityName, mood: act.mood, position: act.position,
          activity_type: act.activityType, duration: act.duration, priority: act.priority,
          rythme: act.rythme, cadre: act.cadre, companions: act.companions,
          gender: user?.gender, age: user?.age, birthday: user?.birthdate,
        }),
      });
      const data = await res.json();
      if (res.ok && data.tasks?.length) {
        setAllPlans((p) => [...p, data.tasks]);
        setIndex(allPlans.length);
      } else setError("No tasks generated. Retry.");
    } catch { setError("Connection error"); }
    finally { setLoading(false); }
  };

  const choose = async () => {
    const tasks = allPlans[index];
    if (!tasks) return;
    const uid = auth.currentUser?.uid;
    if (uid) {
      const toSave = tasks.map((t: any, i: number) => ({
        id: `t${i}`, title: t.title || "", description: t.description || "",
        duration: t.duration || "", location: t.location || "",
        tip: t.tip || "", rating: 0,
      }));
      await addDoc(collection(db, "users", uid, "plans"), {
        type: "activity", status: "active", activityName: act.activityName,
        tasks: toSave, overallRating: 0,
        createdAt: serverTimestamp(), completedAt: null,
      }).catch(console.log);
    }
    dispatch(resetActivity());
    router.replace("/(tabs)/(guide)/guide");
  };

  const tasks = allPlans[index] || [];

  if (loading && !allPlans.length) return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d] items-center justify-center">
      <ActivityIndicator size="large" color="#A3E635" />
      <Text className="text-white text-xl font-bold mt-6">Generating... 🎯</Text>
    </SafeAreaView>
  );

  if (error && !allPlans.length) return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d] items-center justify-center px-6">
      <Text className="text-white text-xl font-bold mb-4">Oops!</Text>
      <Text className="text-gray-400 mb-6">{error}</Text>
      <TouchableOpacity onPress={generate} className="bg-[#A3E635] rounded-2xl px-8 py-4">
        <Text className="text-black font-semibold">Retry</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <View className="flex-row items-center px-4 py-3 border-b border-[#1A2235]">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome6 name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-[#A3E635] font-bold text-lg flex-1 text-center">
          🎯 {act.activityName} ({index + 1}/{allPlans.length})
        </Text>
        <View className="w-5" />
      </View>

      {allPlans.length > 1 && (
        <View className="flex-row justify-center gap-4 py-2">
          <TouchableOpacity onPress={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>
            <FontAwesome6 name="chevron-left" size={18} color={index === 0 ? "#333" : "#A3E635"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIndex(Math.min(allPlans.length - 1, index + 1))} disabled={index === allPlans.length - 1}>
            <FontAwesome6 name="chevron-right" size={18} color={index === allPlans.length - 1 ? "#333" : "#A3E635"} />
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={tasks}
        keyExtractor={(_, i) => `${i}`}
        contentContainerStyle={{ padding: 16, paddingBottom: 160 }}
        renderItem={({ item, index: i }) => (
          <View className="bg-[#1A2235] rounded-2xl p-4 mb-3">
            <View className="flex-row items-center gap-2 mb-2">
              <View className="bg-[#A3E635] w-6 h-6 rounded-full items-center justify-center">
                <Text className="text-black text-xs font-bold">{i + 1}</Text>
              </View>
              <Text className="text-white font-bold flex-1">{item.title}</Text>
            </View>
            {item.description ? <Text className="text-gray-400 text-sm mb-2">{item.description}</Text> : null}
            <View className="flex-row flex-wrap gap-2">
              {item.duration ? <Text className="text-xs text-gray-500 bg-[#0d0d0d] px-2 py-1 rounded">⏱ {item.duration}</Text> : null}
              {item.location ? <Text className="text-xs text-gray-500 bg-[#0d0d0d] px-2 py-1 rounded">📍 {item.location}</Text> : null}
              {item.tip ? <Text className="text-xs text-gray-500 bg-[#0d0d0d] px-2 py-1 rounded">💡 {item.tip}</Text> : null}
            </View>
          </View>
        )}
      />

      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-[#0d0d0d]">
        <TouchableOpacity onPress={generate} disabled={loading} className={`border border-[#A3E635] rounded-2xl py-3 items-center mb-3 ${loading ? "opacity-50" : ""}`}>
          <Text className="text-[#A3E635] font-semibold">{loading ? "Generating..." : "Generate Another 🔄"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={choose} className="bg-[#A3E635] rounded-2xl py-4 items-center">
          <Text className="text-black font-semibold text-lg">Choose This Plan ✨</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ActivityRes;