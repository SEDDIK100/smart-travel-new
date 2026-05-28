import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config";

const W = Dimensions.get("window").width - 64;
const C = {
  green:"#22c55e", blue:"#3b82f6", amber:"#f59e0b",
  purple:"#8b5cf6", red:"#ef4444", cyan:"#06b6d4", pink:"#ec4899",
  card:"#1e293b", border:"#334155", text:"#f1f5f9", muted:"#94a3b8",
};
const PAL = [C.blue,C.green,C.amber,C.purple,C.red,C.cyan,C.pink];

const KpiCard = ({ value, label, color }: any) => (
  <View style={[s.kpiCard, { borderTopColor: color }]}>
    <Text style={[s.kpiVal, { color }]}>{value}</Text>
    <Text style={s.kpiLbl}>{label}</Text>
  </View>
);

const Leg = ({ data }: any) => (
  <View style={s.legend}>
    {data.map((d:any) => (
      <View key={d.text} style={s.legItem}>
        <View style={[s.dot,{backgroundColor:d.color}]}/>
        <Text style={s.legTxt}>{d.text} : {d.value}</Text>
      </View>
    ))}
  </View>
);

export default function GlobalDashboard() {
  const [plans,   setPlans]   = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "public_plans"))
      .then(snap => setPlans(snap.docs.map(d => d.data())))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <View style={s.center}><ActivityIndicator color={C.blue}/></View>;

  if (plans.length === 0) return (
    <View style={s.center}>
      <Text style={{color:C.muted,textAlign:"center",fontSize:13}}>
        Aucune donnée communautaire disponible
      </Text>
    </View>
  );

  const total  = plans.length;
  const trips  = plans.filter(p => p.planType==="trip"     || p.type==="trip");
  const acts   = plans.filter(p => p.planType==="activity" || p.type==="activity");
  const done   = plans.filter(p => p.status==="completed");

  // Helper pour compter valeurs
  const countField = (field: string, sub?: string) => {
    const map: Record<string,number> = {};
    plans.forEach(p => {
      const val = sub ? p[sub]?.[field] : p[field];
      if (val) map[val] = (map[val]||0)+1;
    });
    return Object.entries(map).sort(([,a],[,b])=>b-a);
  };

  const mx = (arr:any[]) => Math.max(...arr.map(d=>d.value),1)+1;

  // ── Données graphiques ────────────────────────────────────────────────────

  // Pie Type
  const pieType = [
    { value: trips.length, color: C.blue,  text: "Voyages"   },
    { value: acts.length,  color: C.green, text: "Activités" },
  ].filter(d => d.value > 0);

  // Pie Statut
  const pieStatus = [
    { value: done.length,          color: C.green, text: "Terminés" },
    { value: total-done.length,    color: C.amber, text: "Actifs"   },
  ].filter(d => d.value > 0);

  // Bar Thèmes voyage
  const tripThemeBar = countField("theme").filter(([k]) => {
    return trips.some(p => (p.theme||p.themeKey)===k);
  }).slice(0,8).map(([k,v],i)=>({
    value:v, label:k.replace(/_/g," ").slice(0,8), frontColor:C.blue,
    topLabelComponent:()=><Text style={{color:C.muted,fontSize:8,marginBottom:2}}>{v}</Text>,
  }));

  // Bar Thèmes activité
  const actThemeBar = countField("theme").filter(([k]) => {
    return acts.some(p => (p.themeKey||p.theme)===k);
  }).slice(0,8).map(([k,v],i)=>({
    value:v, label:k.replace(/_/g," ").slice(0,8), frontColor:C.green,
    topLabelComponent:()=><Text style={{color:C.muted,fontSize:8,marginBottom:2}}>{v}</Text>,
  }));

  // Bar Genre
  const genderEntries = countField("gender","userProfile");
  const genderBar = genderEntries.slice(0,4).map(([k,v],i)=>({
    value:v, label:k, frontColor:PAL[i],
  }));

  // Pie Genre
  const pieGender = genderEntries.slice(0,4).map(([k,v],i)=>({
    value:v, color:PAL[i], text:k,
  }));

  // Bar Nationalité
  const natBar = countField("nationality","userProfile").slice(0,8).map(([k,v],i)=>({
    value:v, label:k.slice(0,6), frontColor:PAL[i%PAL.length],
  }));

  // Bar Age
  const ageOrder = ["18-24","25-34","35-44","45-54","55+"];
  const ageMap: Record<string,number> = {};
  plans.forEach(p => {
    const age = p.userProfile?.age ?? null;
    if (age === null) return;
    const g = age<25?"18-24":age<35?"25-34":age<45?"35-44":age<55?"45-54":"55+";
    ageMap[g] = (ageMap[g]||0)+1;
  });
  const ageBar = ageOrder.map((k,i) => ({
    value: ageMap[k]||0, label:k, frontColor:PAL[i],
  }));

  // Bar Budget (voyages)
  const budgetOrder = ["low","medium","high","luxury"];
  const budgetColors = [C.green,C.blue,C.amber,C.purple];
  const budgetMap: Record<string,number> = {};
  trips.forEach(p => {
    const b = p.choices?.budget ?? p.budget;
    if (b) budgetMap[b] = (budgetMap[b]||0)+1;
  });
  const budgetBar = budgetOrder.map((k,i) => ({
    value: budgetMap[k]||0, label:k, frontColor:budgetColors[i],
  }));

  // Bar Type destination voyage
  const destTypeMap: Record<string,number> = {};
  trips.forEach(p => {
    const d = p.choices?.destinationType;
    if (d) destTypeMap[d] = (destTypeMap[d]||0)+1;
  });
  const destTypeBar = Object.entries(destTypeMap).sort(([,a],[,b])=>b-a).slice(0,8)
    .map(([k,v],i) => ({ value:v, label:k.slice(0,7), frontColor:PAL[i%PAL.length] }));

  // Bar Mood voyage
  const moodMap: Record<string,number> = {};
  trips.forEach(p => {
    const m = p.choices?.travelMood;
    if (m) moodMap[m] = (moodMap[m]||0)+1;
  });
  const moodBar = Object.entries(moodMap).sort(([,a],[,b])=>b-a).slice(0,8)
    .map(([k,v],i) => ({ value:v, label:k.slice(0,7), frontColor:PAL[i%PAL.length] }));

  // Bar Cadre activité
  const cadreMap: Record<string,number> = {};
  acts.forEach(p => {
    const c = p.choices?.cadre;
    if (c) cadreMap[c] = (cadreMap[c]||0)+1;
  });
  const cadreBar = Object.entries(cadreMap).sort(([,a],[,b])=>b-a).slice(0,8)
    .map(([k,v],i) => ({ value:v, label:k.slice(0,7), frontColor:PAL[i%PAL.length] }));

  // Bar Priority activité
  const prioMap: Record<string,number> = {};
  acts.forEach(p => {
    const pr = p.choices?.priority;
    if (pr) prioMap[pr] = (prioMap[pr]||0)+1;
  });
  const prioBar = Object.entries(prioMap).sort(([,a],[,b])=>b-a)
    .map(([k,v],i) => ({ value:v, label:k.slice(0,7), frontColor:PAL[i%PAL.length] }));

  // Bar Travelstyle
  const styleMap: Record<string,number> = {};
  trips.forEach(p => {
    const st = p.choices?.travelStyle;
    if (st) styleMap[st] = (styleMap[st]||0)+1;
  });
  const styleBar = Object.entries(styleMap).sort(([,a],[,b])=>b-a)
    .map(([k,v],i) => ({ value:v, label:k.slice(0,7), frontColor:PAL[i%PAL.length] }));

  // Bar Heure d'utilisation
  const hourMap: Record<number,number> = {};
  plans.forEach(p => {
    const h = p.engagement?.hourOfDay;
    if (h !== undefined) hourMap[h] = (hourMap[h]||0)+1;
  });
  const hourBar = Object.keys(hourMap).map(h => ({
    value: hourMap[Number(h)], label:`${h}h`, frontColor:C.cyan,
  })).sort((a,b)=>Number(a.label)-Number(b.label));

  // Complétion moyenne
  const avgComp = total>0 ? Math.round(
    plans.reduce((s,p)=>s+(p.results?.completionRate??0),0)/total) : 0;
  const avgRating = (() => {
    const r = plans.filter(p=>(p.results?.overallRating??0)>0);
    return r.length>0?(r.reduce((s,p)=>s+(p.results?.overallRating??0),0)/r.length).toFixed(1):"—";
  })();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>

      {/* KPIs */}
      <View style={s.kpiRow}>
        <KpiCard value={total}        label="Plans"       color={C.blue}   />
        <KpiCard value={done.length}  label="Terminés"    color={C.green}  />
        <KpiCard value={`${avgComp}%`} label="Complétion" color={C.amber}  />
        <KpiCard value={`${avgRating}★`} label="Note moy." color={C.purple}/>
      </View>
      <View style={[s.kpiRow,{marginTop:8}]}>
        <KpiCard value={trips.length} label="✈ Voyages"   color={C.blue}   />
        <KpiCard value={acts.length}  label="🏃 Activités" color={C.green}  />
        <KpiCard value={new Set(plans.map(p=>p.userProfile?.nationality)).size} label="Nationalités" color={C.cyan}/>
        <KpiCard value={Math.round(done.length/total*100)+"%"} label="Taux fin" color={C.purple}/>
      </View>

      {/* Type de plans */}
      {pieType.length > 0 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Voyages vs Activités</Text>
          <View style={s.pieRow}>
            <PieChart data={pieType} donut radius={70} innerRadius={46}
              centerLabelComponent={()=><Text style={s.pieCenter}>{total}</Text>}/>
            <Leg data={pieType}/>
          </View>
        </View>
      )}

      {/* Statut */}
      {pieStatus.length > 0 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Statut des plans</Text>
          <View style={s.pieRow}>
            <PieChart data={pieStatus} donut radius={70} innerRadius={46}
              centerLabelComponent={()=>(
                <Text style={s.pieCenter}>{Math.round(done.length/total*100)}%</Text>
              )}/>
            <Leg data={pieStatus}/>
          </View>
        </View>
      )}

      {/* Genre */}
      {pieGender.filter(d=>d.value>0).length > 0 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Répartition Genre</Text>
          <View style={s.pieRow}>
            <PieChart data={pieGender.filter(d=>d.value>0)} donut radius={70} innerRadius={46}
              centerLabelComponent={()=><Text style={s.pieCenter}>Genre</Text>}/>
            <Leg data={pieGender.filter(d=>d.value>0)}/>
          </View>
        </View>
      )}

      {/* Tranches d'âge */}
      {ageBar.some(d=>d.value>0) && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Tranches d âge</Text>
          <BarChart data={ageBar} barWidth={42} spacing={16} roundedTop
            xAxisThickness={1} yAxisThickness={0} xAxisColor={C.border}
            yAxisTextStyle={{color:C.muted,fontSize:10}}
            xAxisLabelTextStyle={{color:C.muted,fontSize:9}}
            noOfSections={4} maxValue={mx(ageBar)} width={W}/>
        </View>
      )}

      {/* Nationalités */}
      {natBar.length > 0 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Top Nationalités</Text>
          <BarChart data={natBar} barWidth={36} spacing={14} roundedTop
            xAxisThickness={1} yAxisThickness={0} xAxisColor={C.border}
            yAxisTextStyle={{color:C.muted,fontSize:10}}
            xAxisLabelTextStyle={{color:C.muted,fontSize:9}}
            noOfSections={4} maxValue={mx(natBar)} width={W}/>
        </View>
      )}

      {/* Thèmes voyage */}
      {tripThemeBar.length > 0 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Thèmes Voyage populaires</Text>
          <BarChart data={tripThemeBar} barWidth={36} spacing={14} roundedTop
            xAxisThickness={1} yAxisThickness={0} xAxisColor={C.border}
            yAxisTextStyle={{color:C.muted,fontSize:10}}
            xAxisLabelTextStyle={{color:C.muted,fontSize:9}}
            noOfSections={4} maxValue={mx(tripThemeBar)} width={W}/>
        </View>
      )}

      {/* Type destination */}
      {destTypeBar.length > 0 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Types de destination</Text>
          <BarChart data={destTypeBar} barWidth={36} spacing={14} roundedTop
            xAxisThickness={1} yAxisThickness={0} xAxisColor={C.border}
            yAxisTextStyle={{color:C.muted,fontSize:10}}
            xAxisLabelTextStyle={{color:C.muted,fontSize:9}}
            noOfSections={4} maxValue={mx(destTypeBar)} width={W}/>
        </View>
      )}

      {/* Mood voyage */}
      {moodBar.length > 0 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Humeur des voyageurs</Text>
          <BarChart data={moodBar} barWidth={36} spacing={14} roundedTop
            xAxisThickness={1} yAxisThickness={0} xAxisColor={C.border}
            yAxisTextStyle={{color:C.muted,fontSize:10}}
            xAxisLabelTextStyle={{color:C.muted,fontSize:9}}
            noOfSections={4} maxValue={mx(moodBar)} width={W}/>
        </View>
      )}

      {/* Budget */}
      {budgetBar.some(d=>d.value>0) && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Budget préféré</Text>
          <BarChart data={budgetBar} barWidth={52} spacing={20} roundedTop
            xAxisThickness={1} yAxisThickness={0} xAxisColor={C.border}
            yAxisTextStyle={{color:C.muted,fontSize:10}}
            xAxisLabelTextStyle={{color:C.muted,fontSize:10}}
            noOfSections={4} maxValue={mx(budgetBar)} width={W}/>
        </View>
      )}

      {/* Style de voyage */}
      {styleBar.length > 0 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Style de voyage</Text>
          <BarChart data={styleBar} barWidth={42} spacing={16} roundedTop
            xAxisThickness={1} yAxisThickness={0} xAxisColor={C.border}
            yAxisTextStyle={{color:C.muted,fontSize:10}}
            xAxisLabelTextStyle={{color:C.muted,fontSize:9}}
            noOfSections={4} maxValue={mx(styleBar)} width={W}/>
        </View>
      )}

      {/* Thèmes activité */}
      {actThemeBar.length > 0 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Thèmes Activité populaires</Text>
          <BarChart data={actThemeBar} barWidth={36} spacing={14} roundedTop
            xAxisThickness={1} yAxisThickness={0} xAxisColor={C.border}
            yAxisTextStyle={{color:C.muted,fontSize:10}}
            xAxisLabelTextStyle={{color:C.muted,fontSize:9}}
            noOfSections={4} maxValue={mx(actThemeBar)} width={W}/>
        </View>
      )}

      {/* Cadre activité */}
      {cadreBar.length > 0 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Cadre d activité préféré</Text>
          <BarChart data={cadreBar} barWidth={36} spacing={14} roundedTop
            xAxisThickness={1} yAxisThickness={0} xAxisColor={C.border}
            yAxisTextStyle={{color:C.muted,fontSize:10}}
            xAxisLabelTextStyle={{color:C.muted,fontSize:9}}
            noOfSections={4} maxValue={mx(cadreBar)} width={W}/>
        </View>
      )}

      {/* Priorité activité */}
      {prioBar.length > 0 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Priorité d activité</Text>
          <BarChart data={prioBar} barWidth={42} spacing={16} roundedTop
            xAxisThickness={1} yAxisThickness={0} xAxisColor={C.border}
            yAxisTextStyle={{color:C.muted,fontSize:10}}
            xAxisLabelTextStyle={{color:C.muted,fontSize:9}}
            noOfSections={4} maxValue={mx(prioBar)} width={W}/>
        </View>
      )}

      {/* Heures d'utilisation */}
      {hourBar.length > 0 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Heures d utilisation</Text>
          <BarChart data={hourBar} barWidth={28} spacing={8} roundedTop
            xAxisThickness={1} yAxisThickness={0} xAxisColor={C.border}
            yAxisTextStyle={{color:C.muted,fontSize:10}}
            xAxisLabelTextStyle={{color:C.muted,fontSize:8}}
            noOfSections={4} maxValue={mx(hourBar)} width={W}/>
        </View>
      )}

      <View style={{height:20}}/>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  center:   {paddingVertical:40,alignItems:"center"},
  kpiRow:   {flexDirection:"row",gap:8},
  kpiCard:  {flex:1,backgroundColor:C.card,borderRadius:10,padding:10,
             borderTopWidth:3,alignItems:"center",borderColor:C.border},
  kpiVal:   {fontSize:18,fontWeight:"700"},
  kpiLbl:   {fontSize:9,color:C.muted,marginTop:3,textAlign:"center"},
  card:     {backgroundColor:C.card,borderRadius:12,padding:14,
             marginTop:12,borderWidth:1,borderColor:C.border},
  cardTitle:{fontSize:14,fontWeight:"600",color:C.text,marginBottom:14},
  pieRow:   {flexDirection:"row",alignItems:"center",gap:20},
  pieCenter:{color:C.text,fontWeight:"700",fontSize:18},
  legend:   {flex:1,gap:10},
  legItem:  {flexDirection:"row",alignItems:"center",gap:8},
  dot:      {width:10,height:10,borderRadius:5},
  legTxt:   {fontSize:13,color:C.muted},
});