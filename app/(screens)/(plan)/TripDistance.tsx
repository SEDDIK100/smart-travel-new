import React, { useState, useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "@/redux/stores";
import { setTripDistance as setAction } from "@/redux/slices/tripSlices";
import { router } from "expo-router";
import HeaderQu from "@/components/HeaderQu";
import LocationAutocomplete from "@/components/Localisation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Country, City } from "country-state-city";

const options = [
  { id: 1, label: "Local", icon: "📍" },
  { id: 2, label: "Region", icon: "🗺️" },
  { id: 3, label: "Country", icon: "🏳️" },
  { id: 4, label: "International", icon: "✈️" },
];

const TravelDistance = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number | null>(null);

  // Champs autocomplete pour International
  const [destinationCountryIso, setDestinationCountryIso] = useState("");
  const [destinationCity, setDestinationCity] = useState("");

  const isInternational = selected === 4;

  const countriesData = useMemo(() => {
    return Country.getAllCountries().map((c) => ({
      name: c.name,
      country: c.name,
      region: c.isoCode,
      flag: c.flag,
      isoCode: c.isoCode,
    }));
  }, []);

  const citiesData = useMemo(() => {
    if (!destinationCountryIso) return [];
    return (
      City.getCitiesOfCountry(destinationCountryIso)?.map((city) => ({
        name: city.name,
        country: city.countryCode,
        region: city.stateCode || "City",
        flag: "📍",
      })) || []
    );
  }, [destinationCountryIso]);

  // Reset autocomplete quand on change de choix
  const handleSelect = (id: number) => {
    setSelected(id);
    if (id !== 4) {
      setDestinationCountryIso("");
      setDestinationCity("");
    }
  };

  const canConfirm = isInternational ? !!destinationCity : !!selected;

  const handleNext = () => {
    if (!canConfirm) return;

    if (isInternational) {
      dispatch(setAction(destinationCity));
    } else {
      const item = options.find((d) => d.id === selected);
      if (item) dispatch(setAction(item.label));
    }

    router.push("/(screens)/(plan)/Interrests");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        extraScrollHeight={100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderQu linkPrv="/(screens)/(plan)/TripDuration" linkNext="/(screens)/(plan)/Interrests" />

        <View className="items-center w-full h-32">
          <Image className="w-full h-full" resizeMode="contain" source={require("@/assets/852.png")} />
        </View>

        <View className="px-6 mb-4">
          <Text className="text-white text-2xl font-extrabold tracking-tight">How far ?</Text>
          <Text className="text-gray-400 text-md mt-1">How far can you go</Text>
        </View>

        {/* Choix de distance */}
        <View className="flex-row flex-wrap justify-center px-4 gap-3">
          {options.map((item) => {
            const isActive = selected === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => handleSelect(item.id)}
                className={`w-[28%] py-4 rounded-2xl items-center border ${isActive ? "bg-neutral-950 border-[#A3E635]" : "bg-[#1A2235] border-transparent"}`}
              >
                <Text className="text-2xl mb-1">{item.icon}</Text>
                <Text className="text-white text-sm font-semibold">{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Autocomplete si International */}
        {isInternational && (
          <View className="mt-6">
            <View className="px-6 mb-4">
              <LocationAutocomplete
                data={countriesData}
                label="Destination country"
                placeholder="Search country..."
                onSelect={(loc: any) => {
                  setDestinationCountryIso(loc.isoCode);
                  setDestinationCity("");
                }}
              />
            </View>

            {destinationCountryIso && (
              <View className="px-6 mb-4">
                <LocationAutocomplete
                  data={citiesData}
                  label="Destination city"
                  placeholder="Search city..."
                  onSelect={(loc) => setDestinationCity(loc.name)}
                />
              </View>
            )}
          </View>
        )}
      </KeyboardAwareScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-[#0d0d0d]">
        <View className="items-center">
          <TouchableOpacity
            onPress={handleNext}
            disabled={!canConfirm}
            className={`bg-[#A3E635] rounded-2xl flex-row w-3/5 items-center justify-center active:opacity-90 p-4 ${!canConfirm ? "opacity-50" : ""}`}
          >
            <Text className="text-black font-semibold text-xl">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TravelDistance;