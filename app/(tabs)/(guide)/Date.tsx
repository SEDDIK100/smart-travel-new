import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Press from "../../../components/Press";

const Date = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      {/*header*/}
      <View className="flex-row items-center justify-between   px-8 ">
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/(guide)/vibe")}
          className="bg-white rounded-full h-8 w-8 items-center justify-center "
        >
          <Text> {`<-`} </Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 ">
          <Image
            className="h-full w-full rounded-full"
            resizeMode="contain"
            source={require("@/assets/st.jpg")}
          />
        </TouchableOpacity>
      </View>
      {/*logo*/}
      <View className=" items-center w-full h-72 ">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/rock3.png")}
        />
      </View>

      <View className="rounded-2xl mb-8 mx-4 bg-[rgb(26,34,53)] ">
        <View>
          
        </View>
      </View>

      {/*btn*/}
      <View>
        <Press title="confirm" link={"/(screens)/travellers"} icon="" />
      </View>
    </SafeAreaView>
  );
};

export default Date;
