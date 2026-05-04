import { auth } from "@/config";
import { logout } from "@/redux/slices/userSlices";
import { clearPlans } from "@/redux/slices/planSlices";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/redux/stores";

const Row = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View className="flex-row items-center py-3 border-b border-[#1A2235]">
    <Text className="text-xl mr-3">{icon}</Text>
    <View className="flex-1">
      <Text className="text-gray-500 text-xs uppercase tracking-wider">{label}</Text>
      <Text className="text-white text-base font-semibold mt-0.5">{value || "—"}</Text>
    </View>
  </View>
);

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user.user);
  const plans = useAppSelector((s) => s.plans?.plans || []);
  const isGuest = !auth.currentUser;

  const active = plans.filter((p) => p.status === "active").length;
  const completed = plans.filter((p) => p.status === "completed").length;

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel" },
      { text: "Logout", style: "destructive", onPress: async () => {
        await signOut(auth).catch(console.log);
        await AsyncStorage.removeItem("token").catch(console.log);
        dispatch(logout());
        dispatch(clearPlans());
        router.replace("/(welcome)/welcome");
      }},
    ]);
  };

  // Guest screen
  if (isGuest) return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d] items-center justify-center px-6" edges={["top"]}>
      <FontAwesome6 name="user-large" size={40} color="#A3E635" />
      <Text className="text-white text-xl font-bold mt-6 mb-2">Guest Mode</Text>
      <Text className="text-gray-400 text-center mb-8">
        Sign in to save your plans, track achievements, and personalize your experience.
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/(auth)/signin")}
        className="bg-[#A3E635] rounded-2xl px-8 py-4 w-3/5 items-center"
      >
        <Text className="text-black font-semibold text-lg">Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/signup")} className="mt-4">
        <Text className="text-gray-400">Don t have an account? <Text className="text-[#A3E635]">Sign Up</Text></Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]" edges={["top"]}>
      {/* Header */}
      <View className="items-center mt-6 mb-6">
        <View className="w-20 h-20 bg-[#1A2235] rounded-full items-center justify-center mb-3">
          <Text className="text-3xl">{user?.gender === "male" ? "👨" : user?.gender === "female" ? "👩" : "👤"}</Text>
        </View>
        <Text className="text-white text-xl font-bold">{user?.username || "User"}</Text>
        <Text className="text-gray-500 text-sm">{user?.email}</Text>
      </View>

      {/* Stats */}
      <View className="flex-row mx-6 mb-6 gap-3">
        <View className="flex-1 bg-[#1A2235] rounded-2xl p-4 items-center">
          <Text className="text-[#A3E635] text-2xl font-extrabold">{active}</Text>
          <Text className="text-gray-400 text-xs mt-1">Active</Text>
        </View>
        <View className="flex-1 bg-[#1A2235] rounded-2xl p-4 items-center">
          <Text className="text-[#A3E635] text-2xl font-extrabold">{completed}</Text>
          <Text className="text-gray-400 text-xs mt-1">Achievements</Text>
        </View>
      </View>

      {/* Info */}
      <View className="mx-6 bg-[#1A2235] rounded-2xl p-5 mb-6">
        <Row icon="👤" label="Username" value={user?.username || ""} />
        <Row icon="📧" label="Email" value={user?.email || ""} />
        <Row icon="⚧" label="Gender" value={user?.gender || ""} />
        <Row icon="🎂" label="Age" value={user?.age ? `${user.age} years` : ""} />
        <Row icon="📅" label="Birthday" value={user?.birthdate || ""} />
      </View>

      {/* Actions */}
      <View className="mx-6">
        <TouchableOpacity
          onPress={() => router.push("/(auth)/informPer")}
          className="bg-[#1A2235] rounded-2xl p-4 flex-row items-center mb-3"
        >
          <FontAwesome6 name="pen-to-square" size={16} color="#A3E635" />
          <Text className="text-white font-semibold ml-3">Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-[#1A2235] rounded-2xl p-4 flex-row items-center"
        >
          <FontAwesome6 name="right-from-bracket" size={16} color="#EF4444" />
          <Text className="text-red-400 font-semibold ml-3">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;