import React, { useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";

// ── constants ─────────────────────────────────────────────────────────────────
const W   = Dimensions.get("window").width - 56;
const BG  = "#1A2235";
const BG2 = "#0d1421";
const ACC = "#A3E635";
const C1  = "#7F77DD";
const C2  = "#22d3ee";
const MUT = "#6b7280";
const TXT = "#f1f5f9";

const THEME_LABELS: Record<string, string> = {
  adventures:"Adventures", beach_water:"Beach", culture_discovery:"Culture",
  sport_fitness:"Sport", health:"Health", relaxation_meditation:"Relax",
  romance:"Romance", party_nightlife:"Nightlife", education_learning:"Learning",
  technology:"Tech", gaming:"Gaming",
};

// ── helpers ───────────────────────────────────────────────────────────────────
const getType = (p: any) => {
  const v = p.planType ?? p.type ?? "";
  if (v === "trip"     || v === "voyage")   return "trip";
  if (v === "activity" || v === "activité") return "activity";
  return v;
};

const countBy = (arr: any[], fn: (d: any) => any, n = 8): [string, number][] => {
  const m: Record<string, number> = {};
  arr.forEach(d => { const v = fn(d); if (v) m[String(v)] = (m[String(v)] ?? 0) + 1; });
  return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n);
};

const pct = (n: number, t: number) => t > 0 ? Math.round(n / t * 100) : 0;

const ageGroup = (a: number) =>
  a < 25 ? "18-24" : a < 35 ? "25-34" : a < 45 ? "35-44" : a < 55 ? "45-54" : "55+";

const toBar = (data: [string, number][], color = ACC) =>
  data.map(([k, v]) => ({
    value: v,
    label: (THEME_LABELS[k] ?? k).slice(0, 7),
    frontColor: color,
    topLabelComponent: () => <Text style={{ color: MUT, fontSize: 8, marginBottom: 2 }}>{v}</Text>,
  }));

// ── components ────────────────────────────────────────────────────────────────
const Card = ({ title, children }: any) => (
  <View style={{ backgroundColor: BG, borderRadius: 12, padding: 14, marginBottom: 10 }}>
    <Text style={{ color: TXT, fontWeight: "600", fontSize: 13, marginBottom: 12 }}>{title}</Text>
    {children}
  </View>
);

const BarC = ({ data, color = ACC, height = 140 }: any) => {
  const d = toBar(data, color);
  if (!d.length) return null;
  return (
    <BarChart data={d} width={W - 8} height={height}
      barWidth={Math.max(Math.floor((W - 60) / d.length), 18)} spacing={8}
      noOfSections={4} maxValue={Math.max(...d.map(i => i.value), 1) + 2}
      yAxisTextStyle={{ color: MUT, fontSize: 9 }} xAxisLabelTextStyle={{ color: MUT, fontSize: 9 }}
      yAxisColor={BG2} xAxisColor={BG2} rulesColor={BG2} isAnimated />
  );
};



const DonutCard = ({ title, data, total, colors }: any) => {
  const pie = data.map(([k, v]: any, i: number) => ({
    value: v, color: colors[i % colors.length], text: k,
  })).filter((d: any) => d.value > 0);
  if (!pie.length) return null;
  return (
    <Card title={title}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <PieChart data={pie} donut radius={65} innerRadius={42} innerCircleColor={BG}
          centerLabelComponent={() => <Text style={{ color: TXT, fontWeight: "700", fontSize: 18 }}>{total}</Text>}
          isAnimated />
        <View style={{ gap: 8 }}>
          {pie.map((d: any) => (
            <View key={d.text} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: d.color }} />
              <Text style={{ color: MUT, fontSize: 12 }}>{d.text} · {d.value} ({pct(d.value, total)}%)</Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
};


// ── main ──────────────────────────────────────────────────────────────────────
export default function InteractiveCommunityDashboard({ allPlans }: { allPlans: any[] }) {
  const [tab,  setTab]  = useState("overview");


  const plans = allPlans;

  const trips = plans.filter(p => getType(p) === "trip");
  const acts  = plans.filter(p => getType(p) === "activity");
  const total = plans.length;

  if (!allPlans.length) return null;

  return (
    <View>
      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
        {[
          { k:"overview", l:"Overview"                   },
          { k:"trip",     l:`Trips (${trips.length})`  },
          { k:"activity", l:`Activities (${acts.length})` },
          { k:"profile",  l:"Profile"                    },
        ].map(t => (
          <TouchableOpacity key={t.k} onPress={() => setTab(t.k)}
            style={{ paddingHorizontal: 14, paddingVertical: 7, borderRadius: 18, marginRight: 6,
              backgroundColor: tab === t.k ? ACC : BG, borderWidth: 1, borderColor: tab === t.k ? ACC : "#1f2937" }}>
            <Text style={{ color: tab === t.k ? "#000" : MUT, fontWeight: "600", fontSize: 12 }}>{t.l}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {tab === "overview" && <OverviewTab plans={plans} trips={trips} acts={acts} total={total} />}
      {tab === "trip"     && <TripTab     trips={trips} />}
      {tab === "activity" && <ActivityTab acts={acts} />}
      {tab === "profile"  && <ProfileTab  plans={plans} total={total} />}
    </View>
  );
}

// ── tabs ──────────────────────────────────────────────────────────────────────
function OverviewTab({ plans, trips, acts, total }: any) {
  return (
    <>
      <DonutCard title="Trips vs Activities"
        data={[["Trips", trips.length], ["Activities", acts.length]]}
        total={total} colors={[C1, C2]} />
    </>
  );
}

function TripTab({ trips }: any) {
  const n = trips.length;
  if (!n) return <Card title="Trips"><Text style={{ color: MUT, textAlign: "center", paddingVertical: 20 }}>No trips</Text></Card>;

  return (
    <>

      {[
        { title: "Themes",       fn: (d: any) => d.theme ?? d.themeKey,       color: C1  },
        { title: "Destination",  fn: (d: any) => d.choices?.destinationType,  color: C1  },
        { title: "Mood",       fn: (d: any) => d.choices?.travelMood,       color: C2  },
        { title: "Style",        fn: (d: any) => d.choices?.travelStyle,      color: ACC },
        { title: "With who",     fn: (d: any) => d.choices?.travellers,       color: ACC },
        { title: "Duration",        fn: (d: any) => d.choices?.tripDuration,     color: MUT },
      ].map(({ title, fn, color }) => {
        const data = countBy(trips, fn);
        return data.length ? <Card key={title} title={title}><BarC data={data} color={color} /></Card> : null;
      })}
      <DonutCard title="Budget" data={countBy(trips, d => d.choices?.budget)} total={n} colors={[ACC, C2, C1, MUT]} />
    </>
  );
}

function ActivityTab({ acts }: any) {
  const n = acts.length;
  if (!n) return <Card title="Activities"><Text style={{ color: MUT, textAlign: "center", paddingVertical: 20 }}>No activities</Text></Card>;

  return (
    <>

      {[
        { title: "Themes",     fn: (d: any) => d.theme ?? d.themeKey,      color: C2  },
        { title: "Type",       fn: (d: any) => d.choices?.activityType,    color: C2  },
        { title: "Priority",   fn: (d: any) => d.choices?.priority,        color: ACC },
        { title: "Mood",     fn: (d: any) => d.choices?.mood,            color: C1  },
        { title: "Setting",      fn: (d: any) => d.choices?.cadre,           color: ACC },
        { title: "Rhythm",     fn: (d: any) => d.choices?.rythme,          color: MUT },
        { title: "With who",   fn: (d: any) => d.choices?.companions,      color: MUT },
        { title: "Duration",      fn: (d: any) => d.choices?.duration,        color: MUT },
      ].map(({ title, fn, color }) => {
        const data = countBy(acts, fn);
        return data.length ? <Card key={title} title={title}><BarC data={data} color={color} /></Card> : null;
      })}
    </>
  );
}

function ProfileTab({ plans, total }: any) {
  const AGE_ORDER = ["18-24", "25-34", "35-44", "45-54", "55+"];
  const ageData   = AGE_ORDER.map(g => {
    const v = plans.filter((p: any) => p.userProfile?.age && ageGroup(p.userProfile.age) === g).length;
    return [g, v] as [string, number];
  });

  return (
    <>

      <DonutCard title="Gender" data={countBy(plans, d => d.userProfile?.gender)} total={total} colors={[C1, C2, ACC]} />
      <Card title="Age groups"><BarC data={ageData} color={C2} /></Card>
      <Card title="Nationalities"><BarC data={countBy(plans, d => d.userProfile?.nationality)} color={C1} /></Card>
    </>
  );
}