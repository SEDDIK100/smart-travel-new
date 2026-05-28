import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useRef } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Guide = () => {
  const floatAnim  = useRef(new Animated.Value(0)).current;
  const bubbleAnim = useRef(new Animated.Value(0)).current;

  // ✅ useFocusEffect — se déclenche à CHAQUE fois que l'onglet est ouvert
  //    useEffect([]) ne se lance qu'une seule fois au montage du composant,
  //    les onglets restant montés en arrière-plan avec Expo Router.
  useFocusEffect(
    useCallback(() => {
      // Remettre les valeurs à zéro avant chaque animation
      floatAnim.setValue(0);
      bubbleAnim.setValue(1);

      // Animation flottante en boucle
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, { toValue: -10, duration: 500, useNativeDriver: true }),
          Animated.timing(floatAnim, { toValue: 0,   duration: 500, useNativeDriver: true }),
        ])
      );
      loop.start();

      // Après 5s : arrêt propre
      const timer = setTimeout(() => {
        loop.stop();
        Animated.timing(floatAnim,  { toValue:-10, duration: 300, useNativeDriver: true }).start();
        Animated.timing(bubbleAnim, { toValue: 0, duration: 600, useNativeDriver: true }).start();
      }, 5000);

      // Cleanup quand on quitte l'onglet
      return () => {
        clearTimeout(timer);
        loop.stop();
      };
    }, [floatAnim, bubbleAnim])
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">

      {/* Header */}
      <View className="flex-row items-center justify-between mx-6 pt-4">
        <Text className="text-white text-xl font-extrabold tracking-wide">seaRock</Text>

        {/* Stone = agent chatbot */}
        <View className="items-center">
          <Animated.View style={{ opacity: bubbleAnim }} className="bg-[#A3E635] px-3 py-1 rounded-full mb-1">
            <Text className="text-black text-xs font-bold">💬 Ask the chatbot</Text>
          </Animated.View>

          <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
            <TouchableOpacity
              onPress={() => router.push("/(screens)/(chatbot)/ChatBot")}
              activeOpacity={0.8}
              className="h-16 w-16"
            >
              <Image className="h-full w-full" resizeMode="contain" source={require("@/assets/rock4.png")} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      {/* Logo */}
      <View className="items-center w-full h-56">
        <Image className="w-full h-full" resizeMode="contain" source={require("@/assets/rock3.png")} />
      </View>

      {/* Activity */}
      <View className="items-center mx-6 mb-10">
        <Text className="text-white text-2xl font-bold text-center mb-1">Quick Plan</Text>
        <Text className="text-gray-400 text-center text-base mb-3">
          {"Need something quick? Let's get your trip ready in just a few taps."}
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(screens)/(activity)/activityName")}
          className="bg-[#A3E635] w-3/5 border border-white justify-center py-3 flex-row rounded-2xl space-x-4 items-center"
        >
          <Text className="text-center text-lg">Activity</Text>
          <AntDesign name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Trip */}
      <View className="items-center mx-6">
        <Text className="text-white text-2xl font-bold text-center mb-1">Trip</Text>
        <Text className="text-gray-400 text-center text-base mb-3">
          {"Prefer to plan it all? Customize every detail for the perfect journey."}
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/(screens)/(plan)/TripName")}
          className="bg-[#A3E635] w-3/5 border border-white justify-center py-3 flex-row rounded-2xl space-x-4 items-center"
        >
          <Text className="text-center text-lg">Generate Trip</Text>
          <FontAwesome5 name="magic" size={24} color="black" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default Guide;