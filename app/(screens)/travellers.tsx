import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/Card";
import Press from "../../components/Press";
import { travel } from "../../constants/data";

const Travellers = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      {/*header*/}
      <View className="flex-row items-center justify-between px-8 ">
        <TouchableOpacity
          onPress={() => router.replace("/(screens)/destination")}
          className="bg-white rounded-full h-8 w-8 items-center justify-center"
        >
          <Text> {"<-"} </Text>
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
      <View className=" items-center w-full h-48">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/852.png")}
        />
      </View>

      {/*list*/}

      <FlatList
        data={travel}
        renderItem={({ item }) => <Card option={item} />}
      />

      {/*btn*/}
      <View className="items-center">
        <Press title="confirm" link={"/(screens)/vibe"} />
      </View>
    </SafeAreaView>
  );
};

export default Travellers;
