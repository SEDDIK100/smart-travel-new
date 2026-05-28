import { auth, db } from "@/config";
import { setPlans } from "@/redux/slices/planSlices";
import { useAppDispatch, useAppSelector } from "@/redux/stores";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart, BarChart } from "react-native-gifted-charts";
import VenusHeader from "@/components/Venusheader";
import InteractiveCommunityDashboard from "@/components/Interactivecommunitydashboard";

const W   = Dimensions.get("window").width - 56;
const BG  = "#1A2235";
const BG2 = "#0d1421";
const MUT = "#6b7280";

const getType = (d: any) => {
  const v = d.planType ?? d.type ?? "";
  if (v === "trip" || v === "voyage")       return "trip";
  if (v === "activity" || v === "activité") return "activity";
  return v;
};



const KpiCard = ({ icon, label, value, accent = "#A3E635" }: any) => (
  <View className="flex-1 bg-[#1A2235] rounded-xl p-3 mx-1">
    <FontAwesome6 name={icon} size={12} color="#4b5563" />
    <Text style={{ color: accent }} className="text-lg font-bold mt-2">{value}</Text>
    <Text className="text-gray-500 text-xs mt-0.5">{label}</Text>
  </View>
);

const Card = ({ title, children }: any) => (
  <View style={{ backgroundColor: BG, borderRadius: 12, padding: 14, marginBottom: 10 }}>
    <Text style={{ color: "#f1f5f9", fontWeight: "600", fontSize: 13, marginBottom: 10 }}>{title}</Text>
    {children}
  </View>
);

export default function Home() {
  const dispatch = useAppDispatch();
  const user     = useAppSelector(s => s.user.user);
  const plans    = useAppSelector(s => s.plans?.plans || []);
  const isGuest  = !user;

  const [tab,          setTab]          = useState<"community" | "personal">("community");
  const [publicPlans,  setPublicPlans]  = useState<any[]>([]);
  const [loadingPublic,setLoadingPublic]= useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(query(collection(db, "public_plans"), orderBy("createdAt", "desc"), limit(1000)));
        setPublicPlans(snap.docs.map(d => ({
          ...d.data(),
          type:      d.data().planType ?? d.data().type ?? "",
          createdAt: d.data().createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
          status:    d.data().status ?? "active",
          tasks:     [],
        })));
      } finally { setLoadingPublic(false); }
    })();
  }, []);

  useEffect(() => {
    if (!user || plans.length > 0) return;
    const uid = auth.currentUser?.uid ?? (user as any)?.id ?? null;
    if (!uid) return;
    (async () => {
      const snap = await getDocs(query(collection(db, "users", uid, "plans"), orderBy("createdAt", "desc")));
      dispatch(setPlans(snap.docs.map(d => ({
        id:            d.id,
        type:          d.data().type || "trip",
        status:        d.data().status || "active",
        title:         d.data().tripName || d.data().activityName || "Plan",
        tasks:         d.data().tasks || [],
        overallRating: d.data().overallRating || 0,
        createdAt:     d.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        theme:         d.data().theme,
        themeKey:      d.data().themeKey,
      }))));
    })();
  }, [user]);

  // personal stats
  const trips      = plans.filter(p => getType(p) === "trip").length;
  const acts       = plans.filter(p => getType(p) === "activity").length;
  const completed  = plans.filter(p => p.status === "completed").length;
  const rated      = plans.filter(p => (p.overallRating ?? 0) > 0);
  const avgR       = rated.length ? (rated.reduce((s, p) => s + (p.overallRating ?? 0), 0) / rated.length).toFixed(1) + "/5" : "—";
  const totalTasks = plans.reduce((s, p) => s + (p.tasks?.length ?? 0), 0);
  const doneTasks  = plans.reduce((s, p) => s + (p.tasks?.filter((t: any) => t.rating > 0).length ?? 0), 0);

  const pieData = [
    { value: trips, color: "#7F77DD", text: "Trips" },
    { value: acts,  color: "#22d3ee", text: "Activities" },
  ].filter(d => d.value > 0);

  const ratingDist = [5, 4, 3, 2, 1].map(s => {
    const count = rated.filter(p => Math.round(p.overallRating ?? 0) === s).length;
    return { value: count, label: s + "★", frontColor: s >= 4 ? "#A3E635" : s === 3 ? "#f59e0b" : "#ef4444",
      topLabelComponent: () => <Text style={{ color: MUT, fontSize: 8, marginBottom: 2 }}>{count}</Text> };
  });

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]" edges={["top"]}>
      <VenusHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Greeting */}
        <View className="px-6 pt-3 pb-4">
          <Text className="text-gray-400 text-sm">{user?.username ? ", " + user.username : ""}</Text>
          <Text className="text-white text-2xl font-extrabold mt-0.5">{isGuest ? "Explore" : "Dashboard"}</Text>
        </View>

        {/* Guest banner */}
        {isGuest && (
          <TouchableOpacity onPress={() => router.push("/(auth)/signin")}
            className="mx-4 bg-[#1A2235] rounded-2xl p-4 flex-row items-center border border-[#A3E635]/30">
            <FontAwesome6 name="user-plus" size={20} color="#A3E635" />
            <View className="ml-3 flex-1">
              <Text className="text-white font-semibold">Sign in to save your plans</Text>
              <Text className="text-gray-500 text-xs mt-0.5">Track progress & unlock achievements</Text>
            </View>
            <FontAwesome6 name="chevron-right" size={14} color="#A3E635" />
          </TouchableOpacity>
        )}

        {!isGuest && (
          <>
            {/* Tabs */}
            <View className="flex-row mx-4 mb-4 bg-[#1A2235] rounded-2xl p-1">
              {(["community", "personal"]).map((t: any) => (
                <TouchableOpacity key={t} onPress={() => setTab(t)}
                  className={`flex-1 py-3 rounded-xl items-center ${tab === t ? "bg-[#A3E635]" : ""}`}>
                  <Text className={`text-xs font-bold ${tab === t ? "text-black" : "text-gray-400"}`}>
                    {t === "community" ? "Community" : "My Stats"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ── Community ─────────────────────────────────────────── */}
            {tab === "community" && (
              loadingPublic ? (
                <View className="items-center py-10">
                  <ActivityIndicator color="#A3E635" />
                  <Text className="text-gray-400 text-sm mt-3">Loading...</Text>
                </View>
              ) : (
                <View className="mx-3">
                  <View className="flex-row mb-3">
                    <KpiCard icon="layer-group"    label="Total"      value={publicPlans.length}                                    accent="#A3E635" />
                    <KpiCard icon="plane"          label="Trips"      value={publicPlans.filter(p => getType(p) === "trip").length} accent="#7F77DD" />
                    <KpiCard icon="person-running" label="Activities" value={publicPlans.filter(p => getType(p) === "activity").length} accent="#22d3ee" />
                  </View>
                  {publicPlans.length > 0
                    ? <InteractiveCommunityDashboard allPlans={publicPlans} />
                    : <View className="bg-[#1A2235] rounded-2xl p-6 items-center"><Text className="text-gray-400 text-sm">No data yet</Text></View>
                  }
                </View>
              )
            )}

            {/* ── My Stats ──────────────────────────────────────────── */}
            {tab === "personal" && (
              <View className="mx-3">

                {/* KPIs */}
                <View className="flex-row mb-2">
                  <KpiCard icon="layer-group"    label="Total"      value={plans.length} accent="#A3E635" />
                  <KpiCard icon="check"          label="Completed"  value={completed}    accent="#f59e0b" />
                  <KpiCard icon="star"           label="Avg rating" value={avgR}         accent="#f59e0b" />
                </View>
                <View className="flex-row mb-3">
                  <KpiCard icon="list-check"  label="Tasks rated"      value={doneTasks + "/" + totalTasks}                                           accent="#c084fc" />
                  <KpiCard icon="chart-line"  label="Task performance" value={totalTasks > 0 ? Math.round(doneTasks / totalTasks * 100) + "%" : "—"} accent="#c084fc" />
                  <KpiCard icon="percent"     label="Completion"       value={Math.round(completed / Math.max(plans.length, 1) * 100) + "%"}          />
                </View>

                {/* Donut — Trips vs Activities */}
                {pieData.length > 0 && (
                  <Card title="Trips vs Activities">
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                      <PieChart data={pieData} donut radius={65} innerRadius={42} innerCircleColor={BG}
                        centerLabelComponent={() => <Text style={{ color: "#f1f5f9", fontWeight: "700", fontSize: 18 }}>{plans.length}</Text>}
                        isAnimated />
                      <View style={{ gap: 8 }}>
                        {pieData.map(d => (
                          <View key={d.text} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: d.color }} />
                            <Text style={{ color: MUT, fontSize: 12 }}>{d.text} · {d.value}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </Card>
                )}

                {/* Bar — Ratings distribution */}
                {rated.length > 0 && (
                  <Card title="Ratings distribution">
                    <BarChart
                      data={ratingDist}
                      width={W - 28} height={120}
                      barWidth={Math.floor((W - 80) / 5)} spacing={8}
                      noOfSections={3}
                      yAxisTextStyle={{ color: MUT, fontSize: 9 }}
                      xAxisLabelTextStyle={{ color: MUT, fontSize: 9 }}
                      yAxisColor={BG2} xAxisColor={BG2} rulesColor={BG2}
                      isAnimated
                    />
                  </Card>
                )}

              </View>
            )}
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}