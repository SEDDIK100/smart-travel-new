import Press from "@/components/Press";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";

const TripName = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
    
      <View className="flex-row items-center justify-between px-8 ">
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/(guide)/guide")}
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
    
      <View className=" items-center w-full h-72 ">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/rock3.png")}
        />
      </View>

    
      <View className="mx-6 mb-20">
        <GooglePlacesAutocomplete
          styles={{ backgroundColor: "red" }}
          placeholder="Search"
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: "YOUR API KEY",
            language: "en",
          }}
        />
      </View>

      {/*btn*/}

      <View>
        <Press
          title="confirm"
          link={"/(screens)/(plan)/travellers"}
          icon=""
          style=""
        />
      </View>
    </SafeAreaView>
  );
};

export default TripName;
