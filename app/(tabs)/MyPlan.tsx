import { auth, db } from "@/config";
import { removePlan, setPlans } from "@/redux/slices/planSlices";
import { useAppDispatch, useAppSelector } from "@/redux/stores";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import VenusHeader from "@/components/Venusheader";
import { SafeAreaView } from "react-native-safe-area-context";
import { THEMES, DEFAULT_THEME } from "@/constants/themes";
import Error from "@/components/Error";

const formatDate = (iso: string) => {
  try { return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }); }
  catch { return ""; }
};

export default function MyPlans() {
  const dispatch = useAppDispatch();
  const user     = useAppSelector((s) => s.user.user);
  const plans    = useAppSelector((s) => s.plans.plans);
  const [tab, setTab] = useState("active");

  const uid = () => auth.currentUser?.uid ?? (user as any)?.id ?? null;

  const load = async () => {
    if (!uid()) return;
    const snap = await getDocs(query(collection(db, "users", uid()!, "plans"), orderBy("createdAt", "desc"))).catch(() => null);
    if (!snap) return;
    dispatch(setPlans(snap.docs.map((d) => ({
      id:            d.id,
      type:          d.data().type          || "trip",
      status:        d.data().status        || "active",
      title:         d.data().tripName || d.data().activityName || "Plan",
      tasks:         d.data().tasks         || [],
      overallRating: d.data().overallRating || 0,
      createdAt:     d.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      theme:         d.data().theme,
      themeKey:      d.data().themeKey,
    }))));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = (planId: string, title: string) => {
    Alert.alert("Delete", `Delete "${title}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => {
        if (!uid()) return;
        await deleteDoc(doc(db, "users", uid()!, "plans", planId)).catch(() => Alert.alert("Error", "Could not delete."));
        dispatch(removePlan(planId));
      }},
    ]);
  };

  if (!user) return <Error title="sorry" desc="don't miss new recommendations" sub="signin for better experience" />;

  const list = plans.filter((p) => p.status === tab);

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]" edges={["top"]}>
      <VenusHeader />
      <Text className="text-white text-2xl font-extrabold px-6 pt-4 pb-2">My Plans</Text>

      {/* Tabs */}
      <View className="flex-row mx-4 mb-4 bg-[#1A2235] rounded-xl p-1">
        {["active", "completed"].map((t) => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} className={`flex-1 py-3 rounded-lg items-center ${tab === t ? "bg-[#A3E635]" : ""}`}>
            <Text className={`font-semibold ${tab === t ? "text-black" : "text-gray-400"}`}>
              {t === "active" ? "Active" : "Achievements"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Empty state */}
      {list.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-base">{tab === "active" ? "No active plans yet" : "No achievements yet"}</Text>
          {tab === "active" && (
            <TouchableOpacity onPress={() => router.push("/(screens)/(plan)/TripName")} className="mt-4 bg-[#A3E635] px-6 py-3 rounded-xl">
              <Text className="text-black font-semibold">Create a plan</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          onRefresh={load}
          refreshing={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          renderItem={({ item }) => {
            const theme = THEMES[item.theme ?? item.themeKey ?? "adventures"] ?? DEFAULT_THEME;
            const rated = item.tasks.filter((t: any) => t.rating > 0).length;
            const total = item.tasks.length;
            const pct   = total > 0 ? Math.round((rated / total) * 100) : 0;

            return (
              <TouchableOpacity
                onPress={() => router.push({ pathname: "/(screens)/PlanDetails", params: { planId: item.id } })}
                activeOpacity={0.85}
                className="rounded-2xl mb-4 overflow-hidden"
                style={{ backgroundColor: theme.cardBg, borderWidth: 1.5, borderColor: theme.accent + "55" }}
              >
                <View className="h-1" style={{ backgroundColor: theme.accent }} />

                <View className="p-4">

                  
                  {/* Title row */}
                  <View className="flex-row items-center mb-2">
                    <View className="px-3 py-1 rounded-lg mr-3" style={{ backgroundColor: theme.accent + "22" }}>
                      <Text className="text-xs font-bold uppercase" style={{ color: theme.accent }}>
                        {item.type === "trip" ? "✈️ Trip" : "🎯 Activity"}
                      </Text>
                    </View>
                    <Text className="font-extrabold text-base flex-1" style={{ color: theme.title }} numberOfLines={1}>{item.title}</Text>
                    <TouchableOpacity onPress={() => handleDelete(item.id, item.title)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                      <FontAwesome6 name="trash" size={15} color="#ef4444" />
                    </TouchableOpacity>
                  </View>

                  <Text className="text-xs mb-3" style={{ color: theme.subtitle }}>📅 {formatDate(item.createdAt)}</Text>

                  {/* Progress bar — active */}
                  {tab === "active" && total > 0 && (
                    <View>
                      <View className="flex-row justify-between mb-1">
                        <Text className="text-xs" style={{ color: theme.subtitle }}>Progress</Text>
                        <Text className="text-xs font-bold" style={{ color: theme.accent }}>{rated}/{total} rated</Text>
                      </View>
                      <View className="h-1.5 rounded-full" style={{ backgroundColor: theme.badge }}>
                        <View style={{ height: 6, borderRadius: 999, backgroundColor: theme.accent, width: `${pct}%` as `${number}%` }} />
                      </View>
                    </View>
                  )}

                  {/* Stars — completed */}
                  {tab === "completed" && (
                    <View className="flex-row items-center">
                      <Text className="text-lg tracking-widest" style={{ color: theme.accent }}>{"⭐".repeat(item.overallRating)}</Text>
                      <Text className="text-xs ml-2" style={{ color: theme.subtitle }}>{item.overallRating}/5</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}