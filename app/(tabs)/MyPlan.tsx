import Error from "@/components/Error";
import { auth, db } from "@/config";
import { removePlan, setPlans } from "@/redux/slices/planSlices";
import { useAppDispatch, useAppSelector } from "@/redux/stores";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons"; // Formate une date ISO en "08 mars 2024"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const MyPlans = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.user.user);
  const plans = useAppSelector((s) => s.plans.plans);
  const [tab, setTab] = useState("active");

  const load = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const snap = await getDocs(
      query(
        collection(db, "users", uid, "plans"),
        orderBy("createdAt", "desc"),
      ),
    );
    dispatch(
      setPlans(
        snap.docs.map((d) => ({
          id: d.id,
          type: d.data().type || "trip",
          status: d.data().status || "active",
          title: d.data().tripName || d.data().activityName || "Plan",
          plan: d.data().plan || "",
          tasks: d.data().tasks || [],
          overallRating: d.data().overallRating || 0,
          createdAt:
            d.data().createdAt?.toDate?.()?.toISOString() ||
            new Date().toISOString(),
        })),
      ),
    );
  };

  useEffect(() => {
    load();
  }, []);

  // ✅ Suppression d'un plan (actif ou achevé) avec confirmation
  const handleDelete = (planId: string, title: string) => {
    Alert.alert(
      "Supprimer le plan",
      `Voulez-vous vraiment supprimer "${title}" ? Cette action est définitive.`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            const uid = auth.currentUser?.uid;
            if (!uid) return;
            try {
              await deleteDoc(doc(db, "users", uid, "plans", planId));
              dispatch(removePlan(planId));
            } catch (e) {
              console.log("Erreur suppression plan :", e);
              Alert.alert("Erreur", "Impossible de supprimer le plan.");
            }
          },
        },
      ],
    );
  };

  if (!currentUser)
    return (
      <Error
        title="sorry"
        desc="don't miss new recommendations"
        sub="signin for better experience"
      />
    );

  const list = plans.filter((p) => p.status === tab);

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]" edges={["top"]}>
      <Text className="text-white text-2xl font-extrabold px-6 pt-4 pb-2">
        My Plans
      </Text>

      <View className="flex-row mx-4 mb-4 bg-[#1A2235] rounded-xl p-1">
        {["active", "completed"].map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            className={`flex-1 py-3 rounded-lg items-center ${tab === t ? "bg-[#A3E635]" : ""}`}
          >
            <Text
              className={
                tab === t
                  ? "text-black font-semibold"
                  : "text-gray-400 font-semibold"
              }
            >
              {t === "active" ? "Active" : "Achievements"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {list.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">
            {tab === "active" ? "No active plans" : "No achievements yet"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          onRefresh={load}
          refreshing={false}
          renderItem={({ item }) => (
            <View className="bg-[#1A2235] rounded-2xl mx-4 mb-3 flex-row items-center">
              {/* Zone cliquable */}
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(screens)/PlanDetails",
                    params: { planId: item.id },
                  })
                }
                className="flex-1 p-4"
              >
                <View className="text-white  flex-row items-center gap-2">
                  {item.type === "trip" ? (
                    <Fontisto name="world" size={20} color="gray"/>
                  ) : (
                    <MaterialCommunityIcons
                      name="target"
                      size={20}
                      color="gray"
                    />
                  )}
                  <Text className="text-white font-bold text-md uppercase">
                    
                    {item.title}
                  </Text>
                </View>

                {/* ✅ Date de création */}
                <View className="text-gray-500 text-xs mt-1 flex-row items-center gap-2 ">
                  <Ionicons name="calendar-sharp" size={20} color="gray" />
                  <Text className="text-white">
                    
                    Créé le {formatDate(item.createdAt)}
                  </Text>
                </View>

                {item.status === "active" && item.tasks.length > 0 && (
                  <Text className="text-gray-500 text-base mt-1">
                    {item.tasks.filter((t: any) => t.rating > 0).length}/
                    {item.tasks.length} rated
                  </Text>
                )}
                {item.status === "completed" && (
                  <Text className="text-[#A3E635] text-xs mt-1">
                    {"⭐".repeat(item.overallRating)}
                  </Text>
                )}
              </TouchableOpacity>

              {/* ✅ Bouton supprimer */}
              <TouchableOpacity
                onPress={() => handleDelete(item.id, item.title)}
                className="px-4 py-4"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <FontAwesome6 name="trash" size={16} color="#ef4444" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default MyPlans;
