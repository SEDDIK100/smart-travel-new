import { useState, useCallback } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";

interface Location {
  name: string;
  region: string;
  country: string;
  flag: string;
}

function normalize(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

interface Props {
  data: Location[];
  placeholder?: string;
  label?: string;
  onSelect?: (loc: Location) => void;
}

export default function LocationAutocomplete({ data, placeholder = "Search...", label = "Location", onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Location | null>(null);
  const [focused, setFocused] = useState(false);

  const results = query.trim()
    ? data.filter((l) => normalize(l.name).includes(normalize(query)) || normalize(l.country).includes(normalize(query))).slice(0, 8)
    : [];

  const pick = useCallback((loc: Location) => {
    setQuery(loc.name);
    setSelected(loc);
    onSelect?.(loc);
  }, [onSelect]);

  return (
    <View className="w-full">
      <Text className="text-sm text-gray-300 mb-2">{label}</Text>

      <View className={`flex-row items-center bg-[#1A2235] rounded-2xl px-4 border ${focused ? "border-[#A3E635]" : "border-transparent"}`}>
        <Text className="text-base mr-2">📍</Text>
        <TextInput
          className="flex-1 text-white py-4"
          value={query}
          onChangeText={(t) => { setQuery(t); setSelected(null); }}
          placeholder={placeholder}
          placeholderTextColor="#64748B"
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => { setQuery(""); setSelected(null); }}>
            <Text className="text-gray-500 text-base">✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {focused && results.length > 0 && !selected && (
        <View className="bg-[#1A2235] rounded-2xl mt-2 border border-gray-700 overflow-hidden" style={{ maxHeight: 280 }}>
          <FlatList
            data={results}
            keyExtractor={(item) => `${item.name}-${item.country}`}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => pick(item)}
                className="flex-row items-center px-4 py-3 border-b border-gray-800"
              >
                <Text className="text-xl mr-3">{item.flag}</Text>
                <View className="flex-1">
                  <Text className="text-white text-sm font-semibold">{item.name}</Text>
                  <Text className="text-gray-500 text-xs">{item.region}, {item.country}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {selected && (
        <View className="mt-3 bg-[#A3E635]/10 rounded-xl border border-[#A3E635]/30 px-4 py-3">
          <Text className="text-[#A3E635] text-xs font-semibold uppercase tracking-wider mb-1">Selected</Text>
          <Text className="text-white font-semibold">{selected.flag}  {selected.name} — {selected.country}</Text>
        </View>
      )}
    </View>
  );
}