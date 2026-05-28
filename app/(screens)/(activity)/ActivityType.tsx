import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/redux/stores";
import { setActivityType } from "@/redux/slices/activitySlices";
import { router } from "expo-router";
import HeaderQu from "@/components/HeaderQu";
import { getThemeFromKey, getStoneFromKey } from "@/constants/themes";

const SECTIONS = [
  { title: "🏃 Sport & Fitness", data: [
    [{id:"s1",label:"Running",icon:"🏃",activityType:"running"},{id:"s2",label:"Cycling",icon:"🚴",activityType:"cycling"},{id:"s3",label:"Swimming",icon:"🏊",activityType:"swimming"}],
    [{id:"s4",label:"Gym",icon:"🏋️",activityType:"gym"},{id:"s5",label:"Football",icon:"⚽",activityType:"football"},{id:"s6",label:"Tennis",icon:"🎾",activityType:"tennis"}],
    [{id:"s7",label:"Basketball",icon:"🏀",activityType:"basketball"},{id:"s8",label:"Volleyball",icon:"🏐",activityType:"volleyball"},{id:"s9",label:"Martial Arts",icon:"🥋",activityType:"martialarts"}],
  ]},
  { title: "🌿 Nature & Adventure", data: [
    [{id:"n1",label:"Hiking",icon:"🥾",activityType:"hiking"},{id:"n2",label:"Trekking",icon:"🏔️",activityType:"trekking"},{id:"n3",label:"Camping",icon:"⛺",activityType:"camping"}],
    [{id:"n4",label:"Climbing",icon:"🧗",activityType:"climbing"},{id:"n5",label:"Picnic",icon:"🧺",activityType:"nature"},{id:"n6",label:"Safari",icon:"🦁",activityType:"safari"}],
    [{id:"n7",label:"Skydiving",icon:"🪂",activityType:"adventure"},{id:"n8",label:"Horse Riding",icon:"🐴",activityType:"adventure"},{id:"n9",label:"Bird Watching",icon:"🦅",activityType:"nature"}],
  ]},
  { title: "🌊 Water", data: [
    [{id:"w1",label:"Beach",icon:"🏖️",activityType:"beach"},{id:"w2",label:"Diving",icon:"🤿",activityType:"diving"},{id:"w3",label:"Surfing",icon:"🏄",activityType:"surfing"}],
    [{id:"w4",label:"Kayaking",icon:"🛶",activityType:"water"},{id:"w5",label:"Sailing",icon:"⛵",activityType:"sailing"},{id:"w6",label:"Fishing",icon:"🎣",activityType:"water"}],
  ]},
  { title: "🎵 Music & Nightlife", data: [
    [{id:"m1",label:"Concert",icon:"🎵",activityType:"concert"},{id:"m2",label:"Festival",icon:"🎪",activityType:"festival"},{id:"m3",label:"Club",icon:"🎧",activityType:"nightlife"}],
    [{id:"m4",label:"Dance",icon:"💃",activityType:"dance"},{id:"m5",label:"Karaoke",icon:"🎤",activityType:"music"},{id:"m6",label:"Live Music",icon:"🎸",activityType:"music"}],
  ]},
  { title: "🎨 Culture & Discovery", data: [
    [{id:"c1",label:"Museum",icon:"🏛️",activityType:"decouverte"},{id:"c2",label:"Art Gallery",icon:"🖼️",activityType:"decouverte"},{id:"c3",label:"City Tour",icon:"🗺️",activityType:"exploration"}],
    [{id:"c4",label:"Theatre",icon:"🎭",activityType:"decouverte"},{id:"c5",label:"Cinema",icon:"🎬",activityType:"chill"},{id:"c6",label:"Food Tour",icon:"🍜",activityType:"decouverte"}],
    [{id:"c7",label:"Photography",icon:"📸",activityType:"exploration"},{id:"c8",label:"Workshop",icon:"🛠️",activityType:"decouverte"},{id:"c9",label:"Book Club",icon:"📚",activityType:"chill"}],
  ]},
  { title: "🧘 Wellness & Mindfulness", data: [
    [{id:"y1",label:"Yoga",icon:"🧘",activityType:"yoga"},{id:"y2",label:"Meditation",icon:"🌙",activityType:"meditation"},{id:"y3",label:"Spa",icon:"💆",activityType:"spa"}],
    [{id:"y4",label:"Pilates",icon:"🤸",activityType:"yoga"},{id:"y5",label:"Breathwork",icon:"🌬️",activityType:"meditation"},{id:"y6",label:"Journaling",icon:"📓",activityType:"chill"}],
  ]},
  { title: "💕 Social & Romantic", data: [
    [{id:"r1",label:"Date Night",icon:"🕯️",activityType:"romantic"},{id:"r2",label:"Family Day",icon:"👨‍👩‍👧",activityType:"social"},{id:"r3",label:"Friends",icon:"🤝",activityType:"social"}],
    [{id:"r4",label:"Dinner Out",icon:"🍽️",activityType:"romantic"},{id:"r5",label:"Game Night",icon:"🎲",activityType:"social"},{id:"r6",label:"Picnic Date",icon:"💑",activityType:"romantic"}],
  ]},
];

const ALL_ITEMS = SECTIONS.flatMap((s) => s.data.flat());

export default function ActivityType() {
  const dispatch = useAppDispatch();
  const themeKey = useAppSelector((s) => s.activity.themeKey);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { accent, bg, cardBg } = getThemeFromKey(themeKey);
  const stone      = getStoneFromKey(themeKey);
  const selected   = ALL_ITEMS.find((i) => i.id === selectedId) ?? null;

  const handleNext = () => {
    if (!selected) return;
    dispatch(setActivityType(selected.activityType));
    router.push("/(screens)/(activity)/Moods");
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: bg }}>
      <HeaderQu linkPrv="/(screens)/(activity)/Position" linkNext="/(screens)/(activity)/Moods" />

      <View className="w-full h-36 items-center">
        <Image className="w-full h-full" resizeMode="contain" source={stone} />
      </View>

      <View className="px-6 mb-4">
        <Text className="text-white text-2xl font-extrabold">What do you want to do?</Text>
        <Text className="text-gray-400 text-sm mt-1">
          {selected ? `${selected.icon} ${selected.label}` : "Pick an activity"}
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        data={SECTIONS}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item: section }) => (
          <View className="mb-6">
            <Text className="text-white text-sm font-bold mb-3 px-1">{section.title}</Text>
            {section.data.map((row, idx) => (
              <View key={idx} className="flex-row justify-center gap-3 mb-3">
                {row.map((item) => (
                  <TouchableOpacity key={item.id} activeOpacity={0.8} onPress={() => setSelectedId(item.id)}
                    className="w-[28%] py-3 rounded-2xl items-center border-2"
                    style={{ backgroundColor: selectedId === item.id ? bg : cardBg, borderColor: selectedId === item.id ? accent : "transparent" }}>
                    <Text className="text-2xl mb-1">{item.icon}</Text>
                    <Text className="text-xs font-semibold text-center" style={{ color: selectedId === item.id ? accent : "white" }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        )}
      />

      <View className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 items-center" style={{ backgroundColor: bg }}>
        <TouchableOpacity onPress={handleNext} disabled={!selected}
          className="rounded-2xl w-3/5 items-center p-4"
          style={{ backgroundColor: accent, opacity: selected ? 1 : 0.4 }}>
          <Text className="text-black font-semibold text-xl">Next →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}