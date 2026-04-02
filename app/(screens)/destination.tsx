import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import Press from "../../components/Press";

const Destination = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      {/*header*/}
      <View className="flex-row items-center justify-between   px-8 ">
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/home")}
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

      {/*seaarchBar*/}
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
        <TouchableOpacity className="items-center ">
          <Press title="confirm" link={"/(screens)/travellers"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Destination;
