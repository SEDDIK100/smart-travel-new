import Card from "@/components/Card";
import Press from "@/components/Press";
import { vb } from "@/constants/data";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Vibe = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      {/*header*/}
      <View className="flex-row items-center justify-between   px-8 ">
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/(guide)/Date")}
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
      <View className=" items-center w-full h-48 ">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/852.png")}
        />
      </View>

      {/*list*/}

      <FlatList
        className="mx-4 mb-4"
        data={vb}
        renderItem={({ index, item }) => (
          <View>
            <Card option={item} />
          </View>
        )}
      />

      {/*btn*/}
      <View>
        <Press title="confirm" link={"/(screens)/Date"} icon="" />
      </View>
    </SafeAreaView>
  );
};

export default Vibe;
