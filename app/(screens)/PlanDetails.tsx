import { auth, db } from "@/config";
import { rateTask, completePlan } from "@/redux/slices/planSlices";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router, useLocalSearchParams } from "expo-router";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import React from "react";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/redux/stores";
import { THEMES, DEFAULT_THEME } from "@/constants/themes";

export default function PlanDetail() {
  const dispatch   = useAppDispatch();
  const user       = useAppSelector((s) => s.user.user);
  const { planId } = useLocalSearchParams<{ planId: string }>();
  const plan       = useAppSelector((s) => s.plans.plans.find((p) => p.id === planId));

  if (!plan) return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d] items-center justify-center">
      <Text className="text-gray-500">Plan not found</Text>
    </SafeAreaView>
  );

  const theme    = THEMES[plan.theme ?? plan.themeKey ?? "adventures"] ?? DEFAULT_THEME;
  const rated    = plan.tasks.filter((t: any) => t.rating > 0).length;
  const allRated = plan.tasks.length > 0 && rated === plan.tasks.length;
  const avg      = plan.tasks.length > 0
    ? Math.round(plan.tasks.reduce((s, t) => s + t.rating, 0) / plan.tasks.length)
    : 0;

  const getUid = () => auth.currentUser?.uid ?? (user as any)?.id ?? null;

  const rate = async (taskId: string, rating: number) => {
    dispatch(rateTask({ planId: plan.id, taskId, rating }));
    const uid = getUid();
    if (!uid) return;
    const updated = plan.tasks.map((t) => t.id === taskId ? { ...t, rating } : t);
    await updateDoc(doc(db, "users", uid, "plans", plan.id), { tasks: updated }).catch(console.log);
  };

  const complete = () => {
    Alert.alert("Complete Plan", `Mark as achievement (${avg}⭐)?`, [
      { text: "Cancel" },
      {
        text: "Complete 🏆", onPress: async () => {
          dispatch(completePlan({ planId: plan.id, rating: avg }));
          const uid = getUid();
          if (uid) await updateDoc(doc(db, "users", uid, "plans", plan.id), {
            status: "completed", overallRating: avg, completedAt: serverTimestamp(),
          }).catch(console.log);
          router.back();
        },
      },
    ]);
  };

  const Badge = ({ emoji, value }: { emoji: string; value?: string }) =>
    value ? (
      <View className="px-2 py-1 rounded-lg mr-2 mb-1" style={{ backgroundColor: theme.badge }}>
        <Text className="text-xs" style={{ color: theme.badgeText }}>{emoji + " " + value}</Text>
      </View>
    ) : null;

  const Stars = ({ rating, onPress }: { rating: number; onPress?: (s: number) => void }) => (
    <View className="flex-row ml-10">
      {[1, 2, 3, 4, 5].map((s) =>
        onPress ? (
          <TouchableOpacity key={s} onPress={() => onPress(s)} className="mr-2">
            <FontAwesome6 name="star" size={22} color={s <= rating ? theme.accent : theme.badge} />
          </TouchableOpacity>
        ) : (
          <FontAwesome6 key={s} name="star" size={18} color={s <= rating ? theme.accent : theme.badge} style={{ marginRight: 4 }} />
        )
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.bg }} edges={["top"]}>

      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b" style={{ borderBottomColor: theme.cardBg }}>
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <FontAwesome6 name="arrow-left" size={18} color={theme.title} />
        </TouchableOpacity>
        <Image source={theme.stone} className="w-8 h-8 rounded-lg mr-3" resizeMode="contain" />
        <Text className="font-extrabold text-base flex-1" style={{ color: theme.accent }} numberOfLines={1}>
          {plan.title}
        </Text>
        <View className="px-3 py-1 rounded-xl" style={{ backgroundColor: theme.badge }}>
          <Text className="text-xs font-bold" style={{ color: theme.accent }}>{rated}/{plan.tasks.length}</Text>
        </View>
      </View>

      {/* Progress bar */}
      {plan.status === "active" && plan.tasks.length > 0 && (
        <View className="px-4 py-3">
          <View className="h-1 rounded-full" style={{ backgroundColor: theme.cardBg }}>
            <View style={{
              height: 4, borderRadius: 999, backgroundColor: theme.accent,
              width: `${Math.round((rated / plan.tasks.length) * 100)}%` as `${number}%`,
            }} />
          </View>
        </View>
      )}

      {/* Tasks */}
      <FlatList
        data={plan.tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        renderItem={({ item, index: i }) => (
          <View className="rounded-2xl p-4 mb-3 border" style={{ backgroundColor: theme.cardBg, borderColor: item.rating > 0 ? theme.accent + "55" : "transparent" }}>

            <View className="flex-row items-center mb-2">
              <View className="w-7 h-7 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: item.rating > 0 ? theme.accent : theme.badge }}>
                {item.rating > 0
                  ? <FontAwesome6 name="check" size={11} color="#000" />
                  : <Text className="text-xs font-bold" style={{ color: theme.subtitle }}>{i + 1}</Text>}
              </View>
              <Text className="font-bold text-base flex-1" style={{ color: theme.title }}>{item.title}</Text>
            </View>

            {item.description && <Text className="text-sm leading-5 mb-3 ml-10" style={{ color: theme.subtitle }}>{item.description}</Text>}

            <View className="flex-row flex-wrap ml-10 mb-2">
              <Badge emoji="📅" value={item.day} />
              <Badge emoji="⏱" value={item.duration} />
              <Badge emoji="💰" value={item.cost} />
              <Badge emoji="💡" value={item.tip} />
            </View>

            {plan.status === "active"    && <Stars rating={item.rating} onPress={(s) => rate(item.id, s)} />}
            {plan.status === "completed" && item.rating > 0 && <Stars rating={item.rating} />}
          </View>
        )}
      />

      {/* Complete button */}
      {plan.status === "active" && (
        <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4" style={{ backgroundColor: theme.bg }}>
          <TouchableOpacity
            onPress={complete}
            disabled={!allRated}
            className="rounded-2xl py-5 items-center"
            style={{ backgroundColor: allRated ? theme.accent : theme.cardBg }}
          >
            <Text className="font-bold text-lg" style={{ color: allRated ? "#000" : theme.subtitle }}>
              {allRated ? "Complete 🏆" : `Rate all tasks (${rated}/${plan.tasks.length})`}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}