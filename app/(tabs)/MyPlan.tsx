import { auth, db } from "@/config";
import { setPlans } from "@/redux/slices/planSlices";
import { router } from "expo-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/redux/stores";
import Error from "@/components/Error";
const MyPlans = () => {
  const dispatch = useAppDispatch();
  const plans = useAppSelector((s) => s.plans.plans);
  const [tab, setTab] = useState("active");

  useEffect(() => { load() }, []);

  const load = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const snap = await getDocs(query(collection(db, "users", uid, "plans"), orderBy("createdAt", "desc")));
    dispatch(setPlans(snap.docs.map((d) => ({
      id: d.id,
      type: d.data().type || "trip",
      status: d.data().status || "active",
      title: d.data().tripName || d.data().activityName || "Plan",
      plan: d.data().plan || "",
      tasks: d.data().tasks || [],
      overallRating: d.data().overallRating || 0,
      createdAt: d.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    }))));
  };

    const currentUser = useAppSelector(state => state.user.user)
    const list = plans.filter((p) => p.status === tab);
   if(!currentUser) return(
     <Error
        title="sorry"
        desc="don t me new recommendations"
        sub="signin for better experience"
      />
    );


   
    else 
  

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]" edges={["top"]}>
      <Text className="text-white text-2xl font-extrabold px-6 pt-4 pb-2">My Plans</Text>

      <View className="flex-row mx-4 mb-4 bg-[#1A2235] rounded-xl p-1">
        {["active", "completed"].map((t) => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} className={`flex-1 py-3 rounded-lg items-center ${tab === t ? "bg-[#A3E635]" : ""}`}>
            <Text className={tab === t ? "text-black font-semibold" : "text-gray-400 font-semibold"}>
              {t === "active" ? "Active" : "Achievements"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {list.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">{tab === "active" ? "No active plans" : "No achievements yet"}</Text>
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          onRefresh={load}
          refreshing={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push({ pathname: "/(screens)/PlanDetails", params: { planId: item.id } })}
              className="bg-[#1A2235] rounded-2xl p-4 mx-4 mb-3"
            >
              <Text className="text-white font-bold">{item.type === "trip" ? "🌍" : "🎯"} {item.title}</Text>
              {item.status === "active" && item.tasks.length > 0 && (
                <Text className="text-gray-500 text-xs mt-1">
                  {item.tasks.filter((t: any) => t.rating > 0).length}/{item.tasks.length} rated
                </Text>
              )}
              {item.status === "completed" && (
                <Text className="text-[#A3E635] text-xs mt-1">{"⭐".repeat(item.overallRating)}</Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default MyPlans;