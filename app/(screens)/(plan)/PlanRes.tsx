import { auth, db } from "@/config";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector, useAppDispatch } from "@/redux/stores";
import { resetTrip } from "@/redux/slices/tripSlices";

import { API_BASE_URL } from "@/api";

const PlanRes = () => {
  const dispatch = useAppDispatch();
  const tripData = useAppSelector((state) => state.trip);

  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const hasFetched = useRef(false);

  // Appel API au montage — même pattern que guideRes
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    generatePlan();
  }, []);

  const generatePlan = async () => {
    setLoading(true);
    setError(null);
    setPlan(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);

    try {
      const res = await fetch(`${API_BASE_URL}/generate-trip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip_name: tripData.tripName,
          travellers: tripData.travellers,
          vibe: tripData.vibe,
          budget: tripData.budget,
          
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);
      const data = await res.json();

      if (res.ok) {
        setPlan(data.plan);
        setLatency(data.latency_ms);
        await savePlanToFirestore(data.plan);
      } else {
        throw new Error(data.detail ?? "Erreur serveur");
      }
    } catch (err: any) {
      clearTimeout(timeout);
      if (err.name === "AbortError") {
        setError("⏱️ Le serveur a mis trop de temps à répondre.");
      } else if (err.message === "Network request failed") {
        setError("⚠️ Impossible de contacter le serveur. Vérifiez votre connexion.");
      } else {
        setError(err.message || "⚠️ Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Sauvegarde dans Firestore — même pattern que guideRes
  const savePlanToFirestore = async (planText: string) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await addDoc(collection(db, "users", user.uid, "plans"), {
        type: "trip",
        tripName: tripData.tripName,
        travellers: tripData.travellers,
        vibe: tripData.vibe,
        budget: tripData.budget,
        plan: planText,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.log("Firestore save error:", e);
    }
  };

  const handleNewPlan = () => {
    dispatch(resetTrip());
    router.replace("/(tabs)/(guide)/guide");
  };

  const handleRetry = () => {
    hasFetched.current = false;
    generatePlan();
  };

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#0d0d0d] items-center justify-center">
        <ActivityIndicator size="large" color="#A3E635" />
        <Text className="text-white text-xl font-bold mt-6 mb-2">
          AI Agent is working...
        </Text>
        <Text className="text-gray-400 text-center px-10 text-base">
          Generating your perfect travel plan ✈️
        </Text>
      </SafeAreaView>
    );
  }

  // ─── Erreur ───────────────────────────────────────────────────────────────
  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-[#0d0d0d] items-center justify-center px-6">
        <FontAwesome6 name="triangle-exclamation" size={48} color="#EF4444" />
        <Text className="text-white text-xl font-bold mt-6 mb-2">Oops!</Text>
        <Text className="text-gray-400 text-center text-base mb-8">{error}</Text>
        <TouchableOpacity
          onPress={handleRetry}
          className="bg-[#A3E635] rounded-2xl px-8 py-4 mb-4"
        >
          <Text className="text-black font-semibold text-lg">Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNewPlan}>
          <Text className="text-gray-400 text-base underline">Start over</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ─── Plan généré ──────────────────────────────────────────────────────────
  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A2235]">
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <FontAwesome6 name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-[#A3E635] font-bold text-lg">
            🌍 {tripData.tripName || "Trip Plan"}
          </Text>
          {latency && (
            <Text className="text-gray-500 text-xs">
              Generated in {(latency / 1000).toFixed(1)}s
            </Text>
          )}
        </View>
        <View className="w-5" />
      </View>

      {/* Contenu */}
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 16 }}
      >
        <View className="bg-[#1A2235] rounded-2xl p-5 border border-gray-700">
          <Text className="text-zinc-200 text-base leading-7">
            {plan ?? "No plan generated yet."}
          </Text>
        </View>
      </ScrollView>

      {/* Bouton en bas */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-[#0d0d0d]">
        <TouchableOpacity
          onPress={handleNewPlan}
          className="bg-[#A3E635] rounded-2xl py-4 items-center"
        >
          <Text className="text-black font-semibold text-lg">
            New Plan ✨
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PlanRes;