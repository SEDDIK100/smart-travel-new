import { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
interface Location {
  name: string;
  region: string;
  country: string;
  flag: string;
}
const LOCATIONS: Location[] = [
  { name: 'Tunis', region: 'Tunis', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Sfax', region: 'Sfax', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Sousse', region: 'Sousse', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Monastir', region: 'Monastir', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Nabeul', region: 'Nabeul', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Bizerte', region: 'Bizerte', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Gabès', region: 'Gabès', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Ariana', region: 'Ariana', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Gafsa', region: 'Gafsa', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Kairouan', region: 'Kairouan', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Kasserine', region: 'Kasserine', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Béja', region: 'Béja', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Jendouba', region: 'Jendouba', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Mahdia', region: 'Mahdia', country: 'Tunisie', flag: '🇹🇳' },   
  { name: 'Médenine', region: 'Médenine', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Siliana', region: 'Siliana', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Sidi Bouzid', region: 'Sidi Bouzid', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Tataouine', region: 'Tataouine', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Tozeur', region: 'Tozeur', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Kébili', region: 'Kébili', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Zaghouan', region: 'Zaghouan', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'El Kef', region: 'El Kef', country: 'Tunisie', flag: '🇹🇳' },
  // Tunisie – villes secondaires
  { name: 'La Marsa', region: 'Tunis', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Hammam-Lif', region: 'Ben Arous', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Ben Arous', region: 'Ben Arous', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Manouba', region: 'Manouba', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Kalaa Sghira', region: 'Sousse', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Kalaa Kebira', region: 'Sousse', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Hammamet', region: 'Nabeul', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Djerba', region: 'Médenine', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Zarzis', region: 'Médenine', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Msaken', region: 'Sousse', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Enfidha', region: 'Sousse', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Akouda', region: 'Sousse', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Korba', region: 'Nabeul', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Menzel Bourguiba', region: 'Bizerte', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Ksar Hellal', region: 'Monastir', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Moknine', region: 'Monastir', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Douz', region: 'Kébili', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Tabarka', region: 'Jendouba', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Ain Draham', region: 'Jendouba', country: 'Tunisie', flag: '🇹🇳' },
  { name: 'Paris', region: 'Île-de-France', country: 'France', flag: '🇫🇷' },
  { name: 'Lyon', region: 'Auvergne-Rhône-Alpes', country: 'France', flag: '🇫🇷' },
  { name: 'Marseille', region: 'Provence', country: 'France', flag: '🇫🇷' },
  { name: 'Nice', region: "Côte d'Azur", country: 'France', flag: '🇫🇷' },
  { name: 'Toulouse', region: 'Occitanie', country: 'France', flag: '🇫🇷' },
  { name: 'Bordeaux', region: 'Nouvelle-Aquitaine', country: 'France', flag: '🇫🇷' },
  { name: 'Rome', region: 'Latium', country: 'Italie', flag: '🇮🇹' },
  { name: 'Milan', region: 'Lombardie', country: 'Italie', flag: '🇮🇹' },
  { name: 'Londres', region: 'Angleterre', country: 'Royaume-Uni', flag: '🇬🇧' },
  { name: 'Madrid', region: 'Communauté de Madrid', country: 'Espagne', flag: '🇪🇸' },
  { name: 'Berlin', region: 'Berlin', country: 'Allemagne', flag: '🇩🇪' },
  { name: 'Dubai', region: 'Émirats', country: 'Émirats arabes unis', flag: '🇦🇪' },
  { name: 'Istanbul', region: 'Marmara', country: 'Turquie', flag: '🇹🇷' },
  { name: 'Le Caire', region: 'Gouvernorat du Caire', country: 'Égypte', flag: '🇪🇬' },
  { name: 'Casablanca', region: 'Grand Casablanca', country: 'Maroc', flag: '🇲🇦' },
  { name: 'Alger', region: 'Alger', country: 'Algérie', flag: '🇩🇿' },
];
function normalize(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
function searchLocations(query: string): Location[] {
  if (!query.trim()) return [];
  const q = normalize(query.trim());
  return LOCATIONS.filter(
    (l) =>
      normalize(l.name).includes(q) ||
      normalize(l.region).includes(q) ||
      normalize(l.country).includes(q),
  ).slice(0, 8);
}
// ─── Component ───────────────────────────────────────────────────────────────
interface LocationAutocompleteProps {
  placeholder?: string;
  onSelect?: (location: Location) => void;
  label?: string;
}
export default function LocationAutocomplete({
  placeholder = 'Tapez une ville...',
  onSelect,
  label = 'Lieu',
}: LocationAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [selected, setSelected] = useState<Location | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const handleChange = useCallback((text: string) => {
    setQuery(text);
    setSelected(null);
    setSuggestions(searchLocations(text));
  }, []);
  const handleSelect = useCallback(
    (loc: Location) => {
      setQuery(loc.name);
      setSelected(loc);
      setSuggestions([]);
      onSelect?.(loc);
    },
    [onSelect],
  );
  const handleClear = useCallback(() => {
    setQuery('');
    setSelected(null);
    setSuggestions([]);
  }, []);
  const showDropdown = isFocused && suggestions.length > 0;
  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>
      {/* Input row */}
      <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
        <Text style={styles.pinIcon}>📍</Text>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // delay so tap on suggestion registers first
            setTimeout(() => setIsFocused(false), 150);
          }}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Dropdown */}
      {showDropdown && (
        <View style={styles.dropdown}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => `${item.name}-${item.country}`}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={suggestions.length > 5}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.suggestionItem,
                  index < suggestions.length - 1 && styles.suggestionBorder,
                ]}
                onPress={() => handleSelect(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.flag}>{item.flag}</Text>
                <View style={styles.suggestionText}>
                  <Text style={styles.cityName}>{item.name}</Text>
                  <Text style={styles.regionName}>
                    {item.region}, {item.country}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {/* Selected badge */}
      {selected && (
        <View style={styles.badge}>
          <Text style={styles.badgeLabel}>Lieu sélectionné</Text>
          <Text style={styles.badgeValue}>
            {selected.flag}  {selected.name} — {selected.region}, {selected.country}
          </Text>
        </View>
      )}
    </View>
  );
}
// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    gap: 8,
  },
  inputWrapperFocused: {
    borderColor: '#3B82F6',
    // subtle shadow on iOS
    ...Platform.select({
      ios: {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  pinIcon: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    padding: 0, // remove default Android padding
  },
  clearIcon: {
    fontSize: 14,
    color: '#9CA3AF',
    paddingLeft: 4,
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    marginTop: 4,
    maxHeight: 280,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 11,
    gap: 10,
  },
  suggestionBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F3F4F6',
  },
  flag: {
    fontSize: 20,
  },
  suggestionText: {
    flex: 1,
  },
  cityName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  regionName: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 1,
  },
  badge: {
    marginTop: 10,
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  badgeLabel: {
    fontSize: 11,
    color: '#0284C7',
    fontWeight: '500',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badgeValue: {
    fontSize: 14,
    color: '#0C4A6E',
    fontWeight: '500',
  },
});