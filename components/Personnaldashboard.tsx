import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { BarChart, PieChart, LineChart } from "react-native-gifted-charts";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { auth, db } from "@/config";
import { useAppSelector } from "@/redux/stores";

const W = Dimensions.get("window").width - 64;
const C = {
  green:"#22c55e", blue:"#3b82f6", amber:"#f59e0b",
  purple:"#8b5cf6", red:"#ef4444", cyan:"#06b6d4",
  card:"#1e293b", border:"#334155", text:"#f1f5f9", muted:"#94a3b8",
};

const KpiCard = ({ value, label, color }: any) => (
  <View style={[s.kpiCard, { borderTopColor: color }]}>
    <Text style={[s.kpiVal, { color }]}>{value}</Text>
    <Text style={s.kpiLbl}>{label}</Text>
  </View>
);

export default function PersonalDashboard() {
  const user  = useAppSelector((s: any) => s.user.user);
  const uid   = auth.currentUser?.uid ?? (user as any)?.id;
  const [plans,   setPlans]   = useState<any[]>([]);
  const [chats,   setChats]   = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) { setLoading(false); return; }
    Promise.all([
      getDocs(query(collection(db, "users", uid, "plans"), orderBy("createdAt", "desc"))),
      getDocs(collection(db, "users", uid, "chats")),
    ]).then(([pSnap, cSnap]) => {
      setPlans(pSnap.docs.map(d => ({ ...d.data(), id: d.id })));
      setChats(cSnap.docs.map(d => d.data()));
    }).finally(() => setLoading(false));
  }, [uid]);

  if (loading) return <View style={s.center}><ActivityIndicator color={C.green} /></View>;

  if (!uid || plans.length === 0) return (
    <View style={s.center}>
      <Text style={{ color: C.muted, textAlign: "center", fontSize: 13 }}>
        Générez votre premier plan pour voir vos statistiques ✨
      </Text>
    </View>
  );

  // ── Stats ─────────────────────────────────────────────────────────────────
  const total     = plans.length;
  const trips     = plans.filter(p => p.type === "trip");
  const acts      = plans.filter(p => p.type === "activity");
  const completed = plans.filter(p => p.status === "completed");
  const active    = plans.filter(p => p.status === "active");
  const rated     = plans.filter(p => (p.overallRating ?? 0) > 0);
  const avgRating = rated.length > 0
    ? (rated.reduce((s, p) => s + p.overallRating, 0) / rated.length).toFixed(1) : "—";
  const allTasks  = plans.flatMap(p => p.tasks ?? []);
  const doneTasks = allTasks.filter((t: any) => t.done || t.rating > 0).length;
  const avgComp   = total > 0 ? Math.round(
    plans.reduce((s, p) => {
      const ts = p.tasks ?? []; if (!ts.length) return s;
      return s + ts.filter((t:any) => t.done || t.rating>0).length / ts.length * 100;
    }, 0) / total) : 0;

  // PieChart Type
  const pieType = [
    { value: trips.length, color: C.blue,  text: "Voyages"   },
    { value: acts.length,  color: C.green, text: "Activités" },
  ].filter(d => d.value > 0);

  // PieChart Statut
  const pieStatus = [
    { value: completed.length, color: C.green, text: "Terminés" },
    { value: active.length,    color: C.amber, text: "Actifs"   },
  ].filter(d => d.value > 0);

  // BarChart Thèmes voyage
  const tMap: Record<string,number> = {};
  trips.forEach(p => { const k = p.theme||p.themeKey||"other"; tMap[k]=(tMap[k]||0)+1; });
  const themeBar = Object.entries(tMap).sort(([,a],[,b])=>b-a).slice(0,6).map(([k,v])=>({
    value: v, label: k.replace(/_/g," ").slice(0,8), frontColor: C.blue,
  }));

  // BarChart Thèmes activité
  const aMap: Record<string,number> = {};
  acts.forEach(p => { const k = p.themeKey||p.theme||"other"; aMap[k]=(aMap[k]||0)+1; });
  const actBar = Object.entries(aMap).sort(([,a],[,b])=>b-a).slice(0,6).map(([k,v])=>({
    value: v, label: k.replace(/_/g," ").slice(0,8), frontColor: C.green,
  }));

  // LineChart Complétion
  const lineComp = [...plans].slice(0,8).reverse().map((p,i) => {
    const ts = p.tasks??[]; const done = ts.filter((t:any)=>t.done||t.rating>0).length;
    return { value: ts.length>0?Math.round(done/ts.length*100):0, label:`P${i+1}`, dataPointColor:C.green };
  });

  // BarChart Notes
  const ratingBar = [1,2,3,4,5].map(r => ({
    value: plans.filter(p=>p.overallRating===r).length,
    label: `${r}★`,
    frontColor: r>=4?C.green:r===3?C.amber:C.red,
  }));

  const mx = (arr:any[]) => Math.max(...arr.map(d=>d.value),1)+1;

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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>

      {/* KPIs ligne 1 */}
      <View style={s.kpiRow}>
        <KpiCard value={total}            label="Plans"       color={C.blue}   />
        <KpiCard value={completed.length} label="Terminés"    color={C.green}  />
        <KpiCard value={`${avgComp}%`}    label="Complétion"  color={C.amber}  />
        <KpiCard value={`${avgRating}★`}  label="Note moy."   color={C.purple} />
      </View>
      {/* KPIs ligne 2 */}
      <View style={[s.kpiRow,{marginTop:8}]}>
        <KpiCard value={trips.length}     label="✈ Voyages"   color={C.blue}   />
        <KpiCard value={acts.length}      label="🏃 Activités" color={C.green}  />
        <KpiCard value={chats.length}     label="💬 Chats"     color={C.cyan}   />
        <KpiCard value={`${doneTasks}/${allTasks.length}`} label="Tâches" color={C.purple}/>
      </View>

      {/* Type */}
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
                <Text style={s.pieCenter}>
                  {total>0?`${Math.round(completed.length/total*100)}%`:"0%"}
                </Text>
              )}/>
            <Leg data={pieStatus}/>
          </View>
        </View>
      )}

      {/* Thèmes voyage */}
      {themeBar.length > 0 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Mes thèmes de voyage</Text>
          <BarChart data={themeBar} barWidth={36} spacing={14} roundedTop
            xAxisThickness={1} yAxisThickness={0} xAxisColor={C.border}
            yAxisTextStyle={{color:C.muted,fontSize:10}}
            xAxisLabelTextStyle={{color:C.muted,fontSize:9}}
            noOfSections={4} maxValue={mx(themeBar)} width={W}/>
        </View>
      )}

      {/* Thèmes activité */}
      {actBar.length > 0 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Mes thèmes d activité</Text>
          <BarChart data={actBar} barWidth={36} spacing={14} roundedTop
            xAxisThickness={1} yAxisThickness={0} xAxisColor={C.border}
            yAxisTextStyle={{color:C.muted,fontSize:10}}
            xAxisLabelTextStyle={{color:C.muted,fontSize:9}}
            noOfSections={4} maxValue={mx(actBar)} width={W}/>
        </View>
      )}

      {/* Évolution complétion */}
      {lineComp.length > 1 && (
        <View style={s.card}>
          <Text style={s.cardTitle}>Taux de complétion</Text>
          <LineChart data={lineComp} color={C.green} thickness={2}
            dataPointsColor={C.green} dataPointsRadius={4}
            startFillColor={C.green} startOpacity={0.2} endOpacity={0} areaChart
            xAxisColor={C.border} yAxisColor={C.border}
            yAxisTextStyle={{color:C.muted,fontSize:10}}
            xAxisLabelTextStyle={{color:C.muted,fontSize:10}}
            noOfSections={5} maxValue={100} yAxisSuffix="%" width={W}/>
        </View>
      )}

      {/* Notes */}
      <View style={s.card}>
        <Text style={s.cardTitle}>Distribution des notes</Text>
        <BarChart data={ratingBar} barWidth={44} spacing={18} roundedTop
          xAxisThickness={1} yAxisThickness={0} xAxisColor={C.border}
          yAxisTextStyle={{color:C.muted,fontSize:10}}
          xAxisLabelTextStyle={{color:C.muted,fontSize:11}}
          noOfSections={Math.max(...ratingBar.map(d=>d.value),2)}
          maxValue={mx(ratingBar)} width={W}/>
      </View>

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