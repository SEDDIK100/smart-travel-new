import Press from "@/components/Press";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <View className="flex-1 justify-center items-center ">
        <View className="w-full h-48 ">
          <Image
            className=" shadow-slate-700 h-full w-full"
            resizeMode="contain"
            source={require("@/assets/999.png")}
          />
        </View>

        <View className="flex-col justify-center items-center">
          <Text className="text-5xl text-white font-bold mt-2 max-w-xl  text-bold text-center">
            Navigate where you want
          </Text>
          <Text className="text-center text-md p-6 text-gray-500">
            The world is full of places to discover, log in and start planning
            your next unforgettable experience today
          </Text>

          <View className="flex-row mb-8">
            <Press
              title="invited"
              link={"/(tabs)/home"}
              icon={(<FontAwesome6 name="person" size={24} color="black"/>)}
              style=""
            />
            <Press
              title="signin"
              icon={(
                <FontAwesome6
                  name="house-chimney-user"
                  size={24}
                  color="black"
                />)}
                    style=""
              link={"/(auth)/signin"}
              
            />
          </View>

          {/*div*/}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-gray-800" />
            <Text className="text-gray-500 px-6 "> Or continue with </Text>
            <View className="flex-1 h-px bg-gray-800" />
          </View>

          {/*sociaux*/}
          <View className="flex-row gap-4 justify-center mb-4">
            <TouchableOpacity className=" p-2 bg-[#1A2235] flex-row justify-center items-center rounded-2xl ">
              <Text className="text-white text-2xl mr-2"> G</Text>
              <Text className="text-white font-medium"> Google </Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-[#1A2235] flex-row justify-center items-center rounded-2xl">
              <Text className="text-white text-2xl mr-2"> A</Text>
              <Text className="text-white font-medium"> Apple </Text>
            </TouchableOpacity>
          </View>

          {/*sign up link */}

          <View className="flex-row justify-center mt-auto mb-10">
            <Text className="text-gray-400 "> don t have an account </Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}>
              <Text className="text-emerald-500 font-semibold">signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
