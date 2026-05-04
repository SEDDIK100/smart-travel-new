import { auth, db } from "@/config";
import { rateTask, completePlan } from "@/redux/slices/planSlices";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router, useLocalSearchParams } from "expo-router";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import React from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/redux/stores";

const PlanDetail = () => {
  const dispatch = useAppDispatch();
  const { planId } = useLocalSearchParams<{ planId: string }>();
  const plan = useAppSelector((s) => s.plans.plans.find((p) => p.id === planId));

  if (!plan) return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d] items-center justify-center">
      <Text className="text-gray-500">Plan not found</Text>
    </SafeAreaView>
  );

  const allRated = plan.tasks.length > 0 && plan.tasks.every((t) => t.rating > 0);
  const avg = plan.tasks.length > 0 ? Math.round(plan.tasks.reduce((s, t) => s + t.rating, 0) / plan.tasks.length) : 0;

  const rate = async (taskId: string, rating: number) => {
    dispatch(rateTask({ planId: plan.id, taskId, rating }));
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const updated = plan.tasks.map((t) => t.id === taskId ? { ...t, rating } : t);
    await updateDoc(doc(db, "users", uid, "plans", plan.id), { tasks: updated }).catch(console.log);
  };

  const complete = () => {
    Alert.alert("Complete", `Mark as achievement (${avg}⭐)?`, [
      { text: "Cancel" },
      { text: "Yes", onPress: async () => {
        dispatch(completePlan({ planId: plan.id, rating: avg }));
        const uid = auth.currentUser?.uid;
        if (uid) await updateDoc(doc(db, "users", uid, "plans", plan.id), {
          status: "completed", overallRating: avg, completedAt: serverTimestamp(),
        }).catch(console.log);
        router.back();
      }},
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]" edges={["top"]}>
      <View className="flex-row items-center px-4 py-3 border-b border-[#1A2235]">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome6 name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-[#A3E635] font-bold text-lg flex-1 text-center">{plan.title}</Text>
        <View className="w-5" />
      </View>

      <FlatList
        data={plan.tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        renderItem={({ item, index: i }) => (
          <View className={`bg-[#1A2235] rounded-2xl p-4 mb-3 border ${item.rating > 0 ? "border-[#A3E635]/30" : "border-transparent"}`}>
            <View className="flex-row items-center gap-2 mb-1">
              <View className={`w-6 h-6 rounded-full items-center justify-center ${item.rating > 0 ? "bg-[#A3E635]" : "bg-gray-700"}`}>
                {item.rating > 0
                  ? <FontAwesome6 name="check" size={10} color="#000" />
                  : <Text className="text-gray-400 text-xs font-bold">{i + 1}</Text>
                }
              </View>
              <Text className="text-white font-bold flex-1">{item.title}</Text>
            </View>
            {item.description ? <Text className="text-gray-400 text-sm mb-2 ml-8">{item.description}</Text> : null}
            <View className="flex-row gap-1 ml-8 mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <TouchableOpacity key={s} onPress={() => plan.status === "active" && rate(item.id, s)}>
                  <FontAwesome6 name="star" size={20} color={s <= item.rating ? "#A3E635" : "#374151"} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />

      {plan.status === "active" && (
        <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-[#0d0d0d]">
          <TouchableOpacity
            onPress={complete}
            disabled={!allRated}
            className={`rounded-2xl py-4 items-center ${allRated ? "bg-[#A3E635]" : "bg-gray-700"}`}
          >
            <Text className={`font-semibold text-lg ${allRated ? "text-black" : "text-gray-500"}`}>
              {allRated ? "Complete 🏆" : `Rate all (${plan.tasks.filter(t => t.rating > 0).length}/${plan.tasks.length})`}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PlanDetail;