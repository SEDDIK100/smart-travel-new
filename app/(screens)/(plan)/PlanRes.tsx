import React, { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "@/config";
import { API_BASE_URL } from "@/api";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAppSelector, useAppDispatch } from "@/redux/stores";
import { resetTrip } from "@/redux/slices/tripSlices";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { getTheme } from "@/utils/themes";

const PlanRes = () => {
  const dispatch = useAppDispatch();
  const trip = useAppSelector((s) => s.trip);
  const user = useAppSelector((s) => s.user.user);

  const [allPlans, setAllPlans] = useState<any[][]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fetched = useRef(false);
  const viewShotRef = useRef<ViewShot>(null);

  // ✅ Détection du thème basée sur l'ensemble des champs du voyage
  const theme = useMemo(() => getTheme({
    mood: trip.travelMood,
    interests: trip.interests,
    style: trip.travelStyle,
    destination: trip.destinationType,
    userInterests: user?.interrests,
  }), [trip, user]);

  useEffect(() => {
    if (!fetched.current) { fetched.current = true; generate(); }
  }, []);

  const generate = async () => {
    setLoading(true); setError("");
    try {
      const payload = {
        trip_name: trip.tripName || "Mon Voyage",
        destination_type: trip.destinationType, travel_mood: trip.travelMood,
        travellers: trip.travellers, trip_duration: trip.tripDuration,
        budget: trip.budget, travel_distance: trip.travelDistance,
        interests: trip.interests, travel_style: trip.travelStyle,
        gender: user?.gender, age: user?.age, birthday: user?.birthdate,
        nationality: user?.nationality, living_in: user?.livingIn,
        user_interests: user?.interrests,
      };
      const res = await fetch(`${API_BASE_URL}/generate-trip`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const text = await res.text();
      if (!res.ok) { setError(`Erreur serveur ${res.status}`); return; }
      const data = JSON.parse(text);
      if (data.tasks?.length > 0) {
        setAllPlans((prev) => { const n = [...prev, data.tasks]; setIndex(n.length - 1); return n; });
      } else setError("Aucune tâche générée");
    } catch (err: any) {
      setError("Erreur de connexion au serveur");
    } finally { setLoading(false); }
  };

  const choose = async () => {
    const tasks = allPlans[index];
    const uid = auth.currentUser?.uid;
    if (!tasks || !uid) return;
    try {
      await addDoc(collection(db, "users", uid, "plans"), {
        type: "trip", status: "active", tripName: trip.tripName,
        tasks: tasks.map((t, i) => ({ ...t, id: `t${i}`, rating: 0 })),
        overallRating: 0, createdAt: serverTimestamp(), completedAt: null,
        theme: theme.key, // on conserve le thème pour pouvoir l'afficher plus tard
      });
      dispatch(resetTrip());
      router.replace("/(tabs)/(guide)/guide");
    } catch (e) {
      Alert.alert("Erreur", "Impossible de sauvegarder");
    }
  };

  const saveToGallery = async () => {
    if (!viewShotRef.current?.capture) return;
    setSaving(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission refusée", "Impossible d'enregistrer sans autorisation.");
        return;
      }
      const uri = await viewShotRef.current.capture();
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert("✅ Enregistré", "Le plan a été ajouté à votre galerie.");
    } catch (e) {
      Alert.alert("Erreur", "Impossible d'enregistrer le plan.");
    } finally { setSaving(false); }
  };

  if (loading && allPlans.length === 0) return (
    <SafeAreaView className="flex-1 items-center justify-center" style={{ backgroundColor: theme.bg }}>
      <ActivityIndicator size="large" color={theme.accent} />
      <Text className="font-bold mt-6 text-xl" style={{ color: theme.title }}>Préparation de votre voyage... ✈️</Text>
    </SafeAreaView>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.bg }}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b" style={{ borderColor: theme.cardBg }}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome6 name="arrow-left" size={20} color={theme.title} />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center justify-center gap-3">
          <TouchableOpacity onPress={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}
            style={{ opacity: index === 0 ? 0.3 : 1 }}>
            <FontAwesome6 name="chevron-left" size={16} color={theme.accent} />
          </TouchableOpacity>
          <Text className="font-bold text-lg" style={{ color: theme.accent }}>
            {trip.tripName} ({index + 1}/{allPlans.length})
          </Text>
          <TouchableOpacity onPress={() => setIndex((i) => Math.min(allPlans.length - 1, i + 1))}
            disabled={index === allPlans.length - 1}
            style={{ opacity: index === allPlans.length - 1 ? 0.3 : 1 }}>
            <FontAwesome6 name="chevron-right" size={16} color={theme.accent} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={saveToGallery} disabled={saving || !allPlans[index]}>
          {saving
            ? <ActivityIndicator size="small" color={theme.accent} />
            : <FontAwesome6 name="download" size={18} color={theme.accent} />}
        </TouchableOpacity>
      </View>

      {error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-red-400 text-center mb-6">{error}</Text>
          <TouchableOpacity onPress={generate} className="px-8 py-3 rounded-2xl" style={{ backgroundColor: theme.accent }}>
            <Text className="font-bold" style={{ color: "#000" }}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 180 }}>
          {/* ✅ Zone capturable avec pierre + thème adapté */}
          <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}
            style={{ backgroundColor: theme.bg, padding: 16, borderRadius: 16 }}>

            {/* Pierre du thème en haut */}
            <View style={{ alignItems: "center", marginBottom: 16 }}>
              <Image source={theme.stone}
                style={{
                  width: 180, height: 180, borderRadius: 16,
                  shadowColor: theme.accent, shadowOpacity: 0.5,
                  shadowRadius: 20, shadowOffset: { width: 0, height: 0 },
                }}
                resizeMode="cover"
              />
            </View>

            {/* Titre principal */}
            <Text className="text-2xl font-extrabold text-center mb-1" style={{ color: theme.title }}>
              {trip.tripName}
            </Text>
            <Text className="text-center text-xs uppercase tracking-widest mb-6" style={{ color: theme.subtitle }}>
              {theme.key} • {trip.tripDuration}
            </Text>

            {/* Tâches */}
            {(allPlans[index] || []).map((item, i) => (
              <View key={i} className="rounded-2xl p-4 mb-3" style={{ backgroundColor: theme.cardBg }}>
                <View className="flex-row items-center gap-2 mb-2">
                  <View className="w-6 h-6 rounded-full items-center justify-center" style={{ backgroundColor: theme.accent }}>
                    <Text className="font-bold text-xs" style={{ color: "#000" }}>{i + 1}</Text>
                  </View>
                  <Text className="font-bold flex-1 text-base" style={{ color: theme.title }}>{item.title}</Text>
                </View>
                {item.description && <Text className="text-sm mb-3" style={{ color: theme.subtitle }}>{item.description}</Text>}
                <View className="flex-row flex-wrap gap-2">
                  {item.day && <Text className="text-xs px-2 py-1 rounded" style={{ backgroundColor: theme.badge, color: theme.badgeText }}>📅 {item.day}</Text>}
                  {item.duration && <Text className="text-xs px-2 py-1 rounded" style={{ backgroundColor: theme.badge, color: theme.badgeText }}>⏱ {item.duration}</Text>}
                  {item.location && <Text className="text-xs px-2 py-1 rounded" style={{ backgroundColor: theme.badge, color: theme.badgeText }}>📍 {item.location}</Text>}
                  {item.cost && <Text className="text-xs px-2 py-1 rounded" style={{ backgroundColor: theme.badge, color: theme.badgeText }}>💰 {item.cost}</Text>}
                </View>
              </View>
            ))}
          </ViewShot>
        </ScrollView>
      )}

      {!error && (
        <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4" style={{ backgroundColor: theme.bg + "f0" }}>
          <TouchableOpacity onPress={generate} disabled={loading}
            className="border rounded-2xl py-3 items-center mb-3"
            style={{ borderColor: theme.accent }}>
            <Text className="font-semibold" style={{ color: theme.accent }}>
              {loading ? "Génération..." : "Autre proposition 🔄"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={choose} className="rounded-2xl py-4 items-center" style={{ backgroundColor: theme.accent }}>
            <Text className="font-bold text-lg" style={{ color: "#000" }}>Choisir ce plan ✨</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PlanRes;