import Header from "@/components/Header";
import LocationAutocomplete from "@/components/Localisation";
import { auth, db } from "@/config";
import { setUser } from "@/redux/slices/userSlices";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useMemo, useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/redux/stores";
import { router, useFocusEffect } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Country, City, State } from "country-state-city";

const Nationality = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.user.user);

  const [nationality, setNationality] = useState("");
  const [residenceCountryIso, setResidenceCountryIso] = useState("");
  const [residenceCountryName, setResidenceCountryName] = useState("");
  const [selectedStateIso, setSelectedStateIso] = useState("");
  const [selectedStateName, setSelectedStateName] = useState("");
  const [cityName, setCityName] = useState("");

  // Pré-remplissage des données lors de l'ouverture
  useFocusEffect(
    useCallback(() => {
      if (!currentUser) return;
      setNationality(currentUser.nationality ?? "");

      if (currentUser.livingIn) {
        const parts = currentUser.livingIn.split(",").map(p => p.trim());
        // Format attendu: "Ville, État, Pays"
        if (parts.length >= 3) {
          setCityName(parts[0]);
          setSelectedStateName(parts[1]);
          setResidenceCountryName(parts[2]);
        } else if (parts.length === 2) {
          setCityName(parts[0]);
          setResidenceCountryName(parts[1]);
        } else {
          setCityName(parts[0]);
        }
      }
    }, [currentUser])
  );

  const countriesData = useMemo(() =>
    Country.getAllCountries().map((c) => ({
      name: c.name, country: c.name, region: c.isoCode, flag: c.flag, isoCode: c.isoCode,
    })), []);

  const stateData = useMemo(() => {
    if (!residenceCountryIso) return [];
    return State.getStatesOfCountry(residenceCountryIso).map((s) => ({
      name: s.name, country: s.countryCode, region: s.isoCode || "State", flag: "📍", isoCode: s.isoCode,
    }));
  }, [residenceCountryIso]);

  const citiesData = useMemo(() => {
    if (!residenceCountryIso || !selectedStateIso) return [];
    return City.getCitiesOfState(residenceCountryIso, selectedStateIso).map((c) => ({
      name: c.name, country: c.countryCode, region: c.stateCode || "City", flag: "📍",
    }));
  }, [residenceCountryIso, selectedStateIso]);

  const handleNext = async () => {
    if (!nationality || !cityName) return;

    // Création de la chaîne complète pour "livingIn"
    const locationParts = [cityName];
    if (selectedStateName) locationParts.push(selectedStateName);
    if (residenceCountryName) locationParts.push(residenceCountryName);
    const fullLocation = locationParts.join(", ");

    const uid = auth.currentUser?.uid;
    if (uid) {
      await updateDoc(doc(db, "users", uid), { nationality, livingIn: fullLocation }).catch(console.log);
    }
    if (currentUser) {
      dispatch(setUser({ user: { ...currentUser, nationality, livingIn: fullLocation }, token: null }));
    }
    router.replace("/(auth)/UserInterrest");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} extraScrollHeight={100} enableOnAndroid={true} keyboardShouldPersistTaps="handled">
        <Header link="/(auth)/UserInterests" />
        <View className="items-center w-full h-20">
          <Image className="w-full h-full" resizeMode="contain" source={require("@/assets/852.png")} />
        </View>
        <View className="px-6 mb-4">
          <Text className="text-white text-2xl font-extrabold tracking-tight">About you</Text>
          <Text className="text-gray-400 text-md mt-1">Tell us where you are from</Text>
        </View>

        <View className="px-6 mb-6">
          <LocationAutocomplete data={countriesData} label="Your nationality" initialValue={nationality} onSelect={(loc: any) => setNationality(typeof loc === 'string' ? loc : loc.name)} />
        </View>

        <View className="px-6">
          <View className="mb-4">
            <LocationAutocomplete data={countriesData} label="Country of residence" initialValue={residenceCountryName} onSelect={(loc: any) => { 
                const name = typeof loc === 'string' ? loc : loc.name;
                setResidenceCountryIso(loc.isoCode || ""); 
                setResidenceCountryName(name);
                setSelectedStateIso(""); setSelectedStateName(""); setCityName(""); 
              }} 
            />
          </View>

          {(residenceCountryIso || selectedStateName) && (
            <View className="mb-4">
              <LocationAutocomplete data={stateData} label="State / Province" initialValue={selectedStateName} onSelect={(loc: any) => { 
                  const name = typeof loc === 'string' ? loc : loc.name;
                  setSelectedStateIso(loc.isoCode || "");
                  setSelectedStateName(name);
                  setCityName(""); 
                }} 
              />
            </View>
          )}

          {(residenceCountryIso || cityName) && (
            <View className="mb-4">
              <LocationAutocomplete data={citiesData} label="City" initialValue={cityName} onSelect={(loc: any) => setCityName(typeof loc === 'string' ? loc : loc.name)} />
              <Text className="text-gray-500 text-[10px] mt-1 ml-1 italic">Not in the list? Type it manually.</Text>
            </View>
          )}
        </View>

        <View className="items-center mt-10 pb-20">
          <TouchableOpacity onPress={handleNext} disabled={!nationality || !cityName} className={`bg-[#A3E635] rounded-2xl flex-row w-3/5 items-center justify-center active:opacity-90 p-4 ${!nationality || !cityName ? "opacity-50" : ""}`}>
            <Text className="text-black font-semibold text-xl">Confirm</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Nationality;