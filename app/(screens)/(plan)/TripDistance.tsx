import React, { useState, useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/redux/stores";
import { setTripDistance } from "@/redux/slices/tripSlices";
import { router } from "expo-router";
import HeaderQu from "@/components/HeaderQu";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Country, City } from "country-state-city";
import LocationAutocomplete from "@/components/Localisation";
import { getThemeFromKey, getStoneFromKey } from "@/constants/themes";

const OPTIONS = [
  { id: 1, label: "Local",         icon: "📍" },
  { id: 2, label: "Region",        icon: "🗺️" },
  { id: 3, label: "Country",       icon: "🏳️" },
  { id: 4, label: "International", icon: "✈️" },
];

export default function TripDistance() {
  const dispatch = useAppDispatch();
  const themeKey = useAppSelector((s) => s.trip.themeKey);
  const [selected, setSelected] = useState<number | null>(null);
  const [countryIso, setCountryIso] = useState("");
  const [city, setCity] = useState("");

  const { accent, bg, cardBg } = getThemeFromKey(themeKey);
  const stone = getStoneFromKey(themeKey);

  const isInternational = selected === 4;
  const canConfirm = isInternational ? !!city : !!selected;

  const countries = useMemo(() =>
    Country.getAllCountries().map((c) => ({ name: c.name, country: c.name, region: c.isoCode, flag: c.flag, isoCode: c.isoCode }))
  , []);

  const cities = useMemo(() =>
    countryIso ? City.getCitiesOfCountry(countryIso)?.map((c) => ({ name: c.name, country: c.countryCode, region: c.stateCode || "City", flag: "📍" })) || [] : []
  , [countryIso]);

  const handleSelect = (id: number) => {
    setSelected(id);
    if (id !== 4) { setCountryIso(""); setCity(""); }
  };

  const handleNext = () => {
    if (!canConfirm) return;
    dispatch(setTripDistance(isInternational ? city : OPTIONS.find((o) => o.id === selected)!.label));
    router.push("/(screens)/(plan)/Interrests");
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: bg }}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} extraScrollHeight={100} enableOnAndroid keyboardShouldPersistTaps="handled">
        <HeaderQu linkPrv="/(screens)/(plan)/TripDuration" linkNext="/(screens)/(plan)/Interrests" />

        <View className="w-full h-36 items-center">
          <Image className="w-full h-full" resizeMode="contain" source={stone} />
        </View>

        <View className="px-6 mb-3">
          <Text className="text-white text-2xl font-extrabold">How far?</Text>
          <Text className="text-gray-400 text-sm mt-1">How far can you go</Text>
        </View>

        <View className="flex-row flex-wrap justify-center px-4 gap-3">
          {OPTIONS.map((o) => (
            <TouchableOpacity
              key={o.id}
              activeOpacity={0.8}
              onPress={() => handleSelect(o.id)}
              className="w-[28%] py-4 rounded-2xl items-center border-2"
              style={{ backgroundColor: selected === o.id ? bg : cardBg, borderColor: selected === o.id ? accent : "transparent" }}
            >
              <Text className="text-2xl mb-1">{o.icon}</Text>
              <Text className="text-sm font-semibold" style={{ color: selected === o.id ? accent : "white" }}>{o.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {isInternational && (
          <View className="mt-6 px-6 gap-4">
            <LocationAutocomplete data={countries} label="Destination country" placeholder="Search country..." onSelect={(loc: any) => { setCountryIso(loc.isoCode); setCity(""); }} />
            {countryIso && (
              <LocationAutocomplete data={cities} label="Destination city" placeholder="Search city..." onSelect={(loc: any) => setCity(loc.name)} />
            )}
          </View>
        )}
      </KeyboardAwareScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 items-center" style={{ backgroundColor: bg }}>
        <TouchableOpacity
          onPress={handleNext}
          disabled={!canConfirm}
          className="rounded-2xl w-3/5 items-center p-4"
          style={{ backgroundColor: accent, opacity: canConfirm ? 1 : 0.4 }}
        >
          <Text className="text-black font-semibold text-xl">Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}