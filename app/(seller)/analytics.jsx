import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
} from "lucide-react-native";

import useSellerAnalyticsStore from "../zustand/seller/getAnalyticsStore";

import { Canvas, Path, Skia } from "@shopify/react-native-skia";

// ================= Constants =================
const PRIMARY = "#1e40af";
const screenWidth = Dimensions.get("window").width;

const labels = {
  weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  monthly: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

// ================= Reusable Components =================
const StatCard = ({ icon: Icon, label, value, theme }) => (
  <View style={[styles.card, { backgroundColor: theme.card }]}>
    <View>
      <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
      <Text style={[styles.value, { color: PRIMARY }]}>{value}</Text>
    </View>
    <Icon size={26} color={PRIMARY} />
  </View>
);

const FilterTabs = ({ active, onChange, theme }) => (
  <View style={styles.tabs}>
    {["weekly", "monthly"].map((key) => (
      <TouchableOpacity
        key={key}
        onPress={() => onChange(key)}
        style={[
          styles.tab,
          {
            backgroundColor: active === key ? PRIMARY : theme.card,
          },
        ]}
      >
        <Text
          style={{
            color: active === key ? "#fff" : theme.text,
            fontWeight: "600",
          }}
        >
          {key.toUpperCase()}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

// ================= Skia Mini Chart =================
const SkiaMiniChart = () => {
  const path = Skia.Path.Make();
  path.moveTo(10, 40);
  path.cubicTo(60, 10, 120, 80, 200, 30);

  return (
    <Canvas style={{ height: 60, width: "100%" }}>
      <Path path={path} color={PRIMARY} style="stroke" strokeWidth={3} />
    </Canvas>
  );
};

// ================= Main Module =================
export default function SellerAnalyticsModule() {
  const scheme = useColorScheme();
  const dark = scheme === "dark";
  const [range, setRange] = useState("monthly");

  const theme = {
    background: dark ? "#020617" : "#f8f9fb",
    card: dark ? "#020617" : "#ffffff",
    text: dark ? "#e5e7eb" : "#111827",
    muted: dark ? "#94a3b8" : "#64748b",
  };

  const {
    stats,
    sales,
    orderStatus,
    topProducts,
    loading,
    error,
    fetchAnalytics,
  } = useSellerAnalyticsStore();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={{ marginTop: 10, color: theme.text }}>
          Loading Analytics...
        </Text>
      </View>
    );
  }

  if (error) {
    return <Text style={{ padding: 20, color: "red" }}>{error}</Text>;
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.title, { color: PRIMARY }]}>Seller Analytics</Text>
      {/* Stats  */}
      <View style={styles.row}>
        <StatCard
          label="Revenue"
          value={`Le ${stats.revenue.toLocaleString()}`}
          icon={DollarSign}
          theme={theme}
        />
        <StatCard
          label="Orders"
          value={stats.orders}
          icon={ShoppingCart}
          theme={theme}
        />
      </View>
      <View style={styles.row}>
        <StatCard
          label="Customers"
          value={stats.customers}
          icon={Users}
          theme={theme}
        />
        <StatCard
          label="Conversion"
          value={`${stats.conversion}%`}
          icon={TrendingUp}
          theme={theme}
        />
      </View>
      {/* Filters */}
      <FilterTabs active={range} onChange={setRange} theme={theme} />
      {/* Line Chart */}
      <View style={[styles.chartCard, { backgroundColor: theme.card }]}>
        <LineChart
          data={{
            labels: labels[range],
            datasets: [{ data: sales[range] || [0] }],
          }}
          width={screenWidth - 24}
          height={220}
          yAxisLabel="Le"
          chartConfig={chartConfig(dark)}
          bezier
          style={{ borderRadius: 12 }}
          paddingLeft={8}
          xLabelsOffset={-5}
        />
      </View>
      {/* Skia Premium Mini Chart */}
      <View style={[styles.chartCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Performance Trend
        </Text>
        <SkiaMiniChart />
      </View>
      ;{/* Order Status Pie Chart */}
      <View style={[styles.chartCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Order Status
        </Text>
        <PieChart
          data={orderStatus.map((item) => ({
            name: item.name,
            count: item.count,
            color:
              item.name === "Delivered"
                ? PRIMARY
                : item.name === "Pending"
                  ? "#f59e0b"
                  : "#ef4444",
            legendFontColor: item.legendFontColor,
            legendFontSize: item.legendFontSize,
          }))}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig(dark)}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
      {/* Top Products */}
      <View style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Top Products</Text>
        {topProducts.map((item) => (
          <View key={item._id} style={styles.productRow}>
            <Text style={styles.productName}>{item.title}</Text>
            <Text style={styles.productSold}>{item.unitsSold} sold</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ================= Chart Config =================
const chartConfig = (dark) => ({
  backgroundGradientFrom: dark ? "#020617" : "#ffffff",
  backgroundGradientTo: dark ? "#020617" : "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(30, 64, 175, ${opacity})`,
  labelColor: () => (dark ? "#cbd5f5" : "#6b7280"),
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: PRIMARY,
  },
});

// ================= Styles =================
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginBottom: 60 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 16 },
  row: { flexDirection: "row", gap: 12, marginBottom: 12 },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  label: { fontSize: 13 },
  value: { fontSize: 18, fontWeight: "700", marginTop: 4 },
  tabs: { flexDirection: "row", marginBottom: 16, gap: 8 },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    // padding: 16,
    marginBottom: 24,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1e40af",
  },

  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#e5e7eb",
  },
  productName: {
    fontSize: 14,
    color: "#111827",
  },
  productSold: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e40af",
  },
});
