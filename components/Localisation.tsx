import { useState, useCallback, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";

interface Location {
  name: string;
  region: string;
  country: string;
  flag: string;
  isoCode?: string;
}

function normalize(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

interface Props {
  data: Location[];
  placeholder?: string;
  label?: string;
  accentColor?: string;   // ← add these

  initialValue?: string;
  onSelect?: (loc: Location | string) => void;
}

export default function Localisation({ data, placeholder = "Search...", label = "Location", initialValue = "", onSelect }: Props) {
  const [query, setQuery] = useState(initialValue);
  const [selected, setSelected] = useState<Location | null>(null);

  useEffect(() => { 
    setQuery(initialValue); 
    if (!initialValue) setSelected(null);
  }, [initialValue]);

  const results = query.trim() && !selected
    ? data.filter((l) => normalize(l.name).includes(normalize(query)) || normalize(l.country).includes(normalize(query))).slice(0, 8)
    : [];

  const pick = useCallback((loc: Location) => {
    setQuery(loc.name);
    setSelected(loc);
    onSelect?.(loc);
  }, [onSelect]);

  const handleChangeText = (text: string) => {
    setQuery(text);
    setSelected(null);
    onSelect?.(text); // Mise à jour immédiate pour le parent
  };

  return (
    <View className="w-full">
      <Text className="text-sm text-gray-300 mb-2">{label}</Text>
      <View className="flex-row items-center bg-[#1A2235] rounded-2xl px-4 border border-transparent focus:border-[#A3E635]">
        <Text className="text-base mr-2">📍</Text>
        <TextInput 
          className="flex-1 text-white py-4" 
          value={query} 
          onChangeText={handleChangeText} 
          placeholder={placeholder} 
          placeholderTextColor="#64748B" 
          autoCorrect={false} 
          autoCapitalize="words" 
        />
        {query.length > 0 && (
          <Pressable onPress={() => handleChangeText("")}>
            <Text className="text-gray-500 text-base">✕</Text>
          </Pressable>
        )}
      </View>
      {results.length > 0 && (
        <View className="bg-[#1A2235] rounded-2xl mt-2 border border-gray-700 overflow-hidden" style={{ maxHeight: 280 }}>
          <ScrollView keyboardShouldPersistTaps="always" nestedScrollEnabled>
            {results.map((item, idx) => (
              <Pressable key={`${item.name}-${idx}`} onPress={() => pick(item)} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })} className="flex-row items-center px-4 py-3 border-b border-gray-800">
                <Text className="text-xl mr-3">{item.flag || "📍"}</Text>
                <View className="flex-1">
                  <Text className="text-white text-sm font-semibold">{item.name}</Text>
                  <Text className="text-gray-500 text-xs">{item.region}, {item.country}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}