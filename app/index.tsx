import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router, Redirect } from "expo-router"; // Ajout de Redirect
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/redux/stores"; // Accès à Redux
import "../global.css";

const Index = () => {
  const { user } = useAppSelector((state) => state.user);

  // LOGIQUE DE CONNEXION AUTOMATIQUE
  // Si l'utilisateur est trouvé dans Redux par AuthGate, on redirige vers Home
  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <View className="flex-1 items-center">
        <View className="items-center">
          <Image className="shadow-slate-700 absolute w-1/2" resizeMode="contain" source={require("@/assets/rockw.png")} />
        </View>
        <View className="flex-col justify-center items-center top-1/2">
          <Text className="text-5xl text-white font-bold mt-2 max-w-xl text-bold text-center">
            Plan Less {"\n"} Experience More
          </Text>
          <Text className="text-center text-sm p-6 text-gray-500">
            Discover your next adventure effortlessly. Personalized programs at your fingertips.
          </Text>
          <TouchableOpacity 
            onPress={() => router.replace("/(welcome)/welcome")} 
            className="gap-2 px-4 border border-white items-center justify-center py-3 mt-8 flex-row rounded-full"
          >
            <Text className="text-center text-lg text-white">Let s start</Text>
            <FontAwesome5 name="plane-departure" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;