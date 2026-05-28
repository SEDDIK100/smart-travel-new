import React from "react";
import { Image, Text, View } from "react-native";

/**
 * VenusHeader — logo fixe en haut de chaque page tabs
 * Utilisation : <VenusHeader /> en premier enfant de SafeAreaView
 */
const VenusHeader = () => (
  <View className="flex-row items-center px-5 pt-3 pb-2 border-b border-[#1A2235]">
    {/* Logo image */}
    <Image
      source={require("@/assets/st.jpg")}
      className="w-9 h-9 rounded-full mr-3"
      resizeMode="cover"
    />
    {/* Nom + tagline */}
    <View>
      <Text style={{ letterSpacing: 4, fontSize: 17, fontWeight: "800", color: "#ffffff" }}>
        VENUS
      </Text>
      <Text className="text-[#A3E635] text-xs -mt-0.5" style={{ letterSpacing: 1.5 }}>
        smart guide
      </Text>
    </View>
  </View>
);

export default VenusHeader;