// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   RefreshControl,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons } from '@expo/vector-icons';
// import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

// const { width } = Dimensions.get('window');

// const SellerAnalyticsScreen = ({ navigation }) => {
//   const [selectedPeriod, setSelectedPeriod] = useState('month');
//   const [refreshing, setRefreshing] = useState(false);

//   // Mock analytics data
//   const [analyticsData] = useState({
//     summary: {
//       totalRevenue: 2850000,
//       totalOrders: 89,
//       totalProducts: 45,
//       averageOrderValue: 32022,
//       conversionRate: 3.2,
//       customerSatisfaction: 4.8,
//     },
//     revenue: {
//       week: [85000, 120000, 95000, 140000, 110000, 125000, 135000],
//       month: [450000, 520000, 380000, 680000, 590000, 720000],
//       year: [2400000, 2850000, 3200000],
//     },
//     orders: {
//       week: [5, 8, 6, 9, 7, 8, 9],
//       month: [23, 28, 18, 34, 29, 36],
//       year: [156, 189, 201],
//     },
//     topProducts: [
//       { name: 'Traditional Gele', sales: 24, revenue: 1800000, percentage: 32 },
//       { name: 'Leather Bags', sales: 15, revenue: 2250000, percentage: 28 },
//       { name: 'Embroidered Dress', sales: 12, revenue: 1440000, percentage: 22 },
//       { name: 'Custom Jewelry', sales: 8, revenue: 960000, percentage: 18 },
//     ],
//     categoryDistribution: [
//       { name: 'Fashion', population: 45, color: '#10B981', legendFontColor: '#111827' },
//       { name: 'Accessories', population: 25, color: '#3B82F6', legendFontColor: '#111827' },
//       { name: 'Jewelry', population: 20, color: '#F59E0B', legendFontColor: '#111827' },
//       { name: 'Others', population: 10, color: '#EF4444', legendFontColor: '#111827' },
//     ],
//     customerInsights: {
//       newCustomers: 23,
//       returningCustomers: 66,
//       averageRating: 4.8,
//       totalReviews: 67,
//     },
//     recentActivities: [
//       { type: 'sale', description: 'New order from Fatima K.', amount: 75000, time: '2 hours ago' },
//       { type: 'review', description: 'New 5-star review received', time: '4 hours ago' },
//       { type: 'product', description: 'Product "Gele Headwrap" low stock', time: '6 hours ago' },
//       { type: 'message', description: 'New message from customer', time: '8 hours ago' },
//     ],
//   });

//   const onRefresh = async () => {
//     setRefreshing(true);
//     // Mock API call to refresh analytics data
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1000);
//   };

//   const formatPrice = (price) => {
//     if (price >= 1000000) {
//       return `Le ${(price / 1000000).toFixed(1)}M`;
//     } else if (price >= 1000) {
//       return `Le ${(price / 1000).toFixed(0)}K`;
//     }
//     return `Le ${price.toLocaleString()}`;
//   };

//   const getPercentageChange = (current, previous) => {
//     const change = ((current - previous) / previous) * 100;
//     return {
//       value: Math.abs(change).toFixed(1),
//       type: change >= 0 ? 'up' : 'down',
//     };
//   };

//   const chartConfig = {
//     backgroundColor: '#FFFFFF',
//     backgroundGradientFrom: '#FFFFFF',
//     backgroundGradientTo: '#FFFFFF',
//     decimalPlaces: 0,
//     color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
//     labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
//     style: {
//       borderRadius: 16,
//     },
//     propsForDots: {
//       r: '4',
//       strokeWidth: '2',
//       stroke: '#10B981',
//     },
//   };

//   const MetricCard = ({ icon, title, value, subtitle, change, color = '#10B981' }) => (
//     <View style={styles.metricCard}>
//       <View style={styles.metricHeader}>
//         <View style={[styles.metricIcon, { backgroundColor: `${color}20` }]}>
//           <MaterialIcons name={icon} size={20} color={color} />
//         </View>
//         {change && (
//           <View style={[styles.changeIndicator, { backgroundColor: change.type === 'up' ? '#DCFCE7' : '#FEE2E2' }]}>
//             <MaterialIcons 
//               name={change.type === 'up' ? 'trending-up' : 'trending-down'} 
//               size={14} 
//               color={change.type === 'up' ? '#16A34A' : '#DC2626'} 
//             />
//             <Text style={[
//               styles.changeText,
//               { color: change.type === 'up' ? '#16A34A' : '#DC2626' }
//             ]}>
//               {change.value}%
//             </Text>
//           </View>
//         )}
//       </View>
//       <Text style={styles.metricValue}>{value}</Text>
//       <Text style={styles.metricTitle}>{title}</Text>
//       {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
//     </View>
//   );

//   const getChartLabels = () => {
//     if (selectedPeriod === 'week') {
//       return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//     } else if (selectedPeriod === 'month') {
//       return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
//     } else {
//       return ['2022', '2023', '2024'];
//     }
//   };

//   const getChartData = () => {
//     const revenue = analyticsData.revenue[selectedPeriod] || [];
//     return revenue.map(r => r / 1000); // Convert to thousands
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Analytics</Text>
//         <View style={styles.headerActions}>
//           <TouchableOpacity style={styles.headerButton}>
//             <MaterialIcons name="file-download" size={24} color="#374151" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerButton}>
//             <MaterialIcons name="share" size={24} color="#374151" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       >
//         {/* Period Selector */}
//         <View style={styles.periodSection}>
//           <View style={styles.periodSelector}>
//             {['week', 'month', 'year'].map((period) => (
//               <TouchableOpacity
//                 key={period}
//                 style={[
//                   styles.periodButton,
//                   selectedPeriod === period && styles.activePeriodButton
//                 ]}
//                 onPress={() => setSelectedPeriod(period)}
//               >
//                 <Text style={[
//                   styles.periodButtonText,
//                   selectedPeriod === period && styles.activePeriodButtonText
//                 ]}>
//                   {period.charAt(0).toUpperCase() + period.slice(1)}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Key Metrics */}
//         <View style={styles.metricsSection}>
//           <View style={styles.metricsGrid}>
//             <MetricCard
//               icon="attach-money"
//               title="Total Revenue"
//               value={formatPrice(analyticsData.summary.totalRevenue)}
//               change={getPercentageChange(2850000, 2400000)}
//               color="#10B981"
//             />
//             <MetricCard
//               icon="receipt"
//               title="Total Orders"
//               value={analyticsData.summary.totalOrders.toString()}
//               change={getPercentageChange(89, 78)}
//               color="#3B82F6"
//             />
//             <MetricCard
//               icon="inventory"
//               title="Products Listed"
//               value={analyticsData.summary.totalProducts.toString()}
//               color="#8B5CF6"
//             />
//             <MetricCard
//               icon="trending-up"
//               title="Avg. Order Value"
//               value={formatPrice(analyticsData.summary.averageOrderValue)}
//               change={getPercentageChange(32022, 28500)}
//               color="#F59E0B"
//             />
//           </View>
//         </View>

//         {/* Revenue Chart */}
//         <View style={styles.chartSection}>
//           <View style={styles.chartHeader}>
//             <Text style={styles.sectionTitle}>Revenue Trend</Text>
//             <TouchableOpacity style={styles.chartAction}>
//               <MaterialIcons name="fullscreen" size={20} color="#6B7280" />
//             </TouchableOpacity>
//           </View>
//           <LineChart
//             data={{
//               labels: getChartLabels(),
//               datasets: [{ data: getChartData() }],
//             }}
//             width={width - 32}
//             height={220}
//             chartConfig={chartConfig}
//             bezier
//             style={styles.chart}
//           />
//         </View>

//         {/* Top Products */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Top Selling Products</Text>
//             <TouchableOpacity>
//               <Text style={styles.seeAll}>View All</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.productsList}>
//             {analyticsData.topProducts.map((product, index) => (
//               <View key={index} style={styles.productItem}>
//                 <View style={styles.productRank}>
//                   <Text style={styles.rankNumber}>{index + 1}</Text>
//                 </View>
//                 <View style={styles.productInfo}>
//                   <Text style={styles.productName}>{product.name}</Text>
//                   <Text style={styles.productStats}>
//                     {product.sales} sales • {formatPrice(product.revenue)}
//                   </Text>
//                 </View>
//                 <View style={styles.productPercentage}>
//                   <Text style={styles.percentageText}>{product.percentage}%</Text>
//                   <View style={styles.progressBar}>
//                     <View 
//                       style={[
//                         styles.progressFill, 
//                         { width: `${product.percentage}%` }
//                       ]} 
//                     />
//                   </View>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* Category Distribution */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Sales by Category</Text>
//           <PieChart
//             data={analyticsData.categoryDistribution}
//             width={width - 32}
//             height={200}
//             chartConfig={chartConfig}
//             accessor="population"
//             backgroundColor="transparent"
//             paddingLeft="15"
//             absolute
//             style={styles.pieChart}
//           />
//         </View>

//         {/* Customer Insights */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Customer Insights</Text>
//           <View style={styles.insightsGrid}>
//             <View style={styles.insightItem}>
//               <MaterialIcons name="person-add" size={24} color="#10B981" />
//               <Text style={styles.insightValue}>{analyticsData.customerInsights.newCustomers}</Text>
//               <Text style={styles.insightLabel}>New Customers</Text>
//             </View>
//             <View style={styles.insightItem}>
//               <MaterialIcons name="repeat" size={24} color="#3B82F6" />
//               <Text style={styles.insightValue}>{analyticsData.customerInsights.returningCustomers}</Text>
//               <Text style={styles.insightLabel}>Returning</Text>
//             </View>
//             <View style={styles.insightItem}>
//               <MaterialIcons name="star" size={24} color="#F59E0B" />
//               <Text style={styles.insightValue}>{analyticsData.customerInsights.averageRating}</Text>
//               <Text style={styles.insightLabel}>Avg. Rating</Text>
//             </View>
//             <View style={styles.insightItem}>
//               <MaterialIcons name="rate-review" size={24} color="#8B5CF6" />
//               <Text style={styles.insightValue}>{analyticsData.customerInsights.totalReviews}</Text>
//               <Text style={styles.insightLabel}>Reviews</Text>
//             </View>
//           </View>
//         </View>

//         {/* Recent Activities */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Recent Activities</Text>
//           <View style={styles.activitiesList}>
//             {analyticsData.recentActivities.map((activity, index) => (
//               <View key={index} style={styles.activityItem}>
//                 <View style={[
//                   styles.activityIcon,
//                   { backgroundColor: activity.type === 'sale' ? '#DCFCE7' :
//                                    activity.type === 'review' ? '#FEF3C7' :
//                                    activity.type === 'product' ? '#DBEAFE' : '#F3E8FF' }
//                 ]}>
//                   <MaterialIcons 
//                     name={
//                       activity.type === 'sale' ? 'attach-money' :
//                       activity.type === 'review' ? 'star' :
//                       activity.type === 'product' ? 'inventory' : 'message'
//                     } 
//                     size={16} 
//                     color={
//                       activity.type === 'sale' ? '#16A34A' :
//                       activity.type === 'review' ? '#D97706' :
//                       activity.type === 'product' ? '#2563EB' : '#7C3AED'
//                     }
//                   />
//                 </View>
//                 <View style={styles.activityInfo}>
//                   <Text style={styles.activityDescription}>{activity.description}</Text>
//                   <Text style={styles.activityTime}>{activity.time}</Text>
//                 </View>
//                 {activity.amount && (
//                   <Text style={styles.activityAmount}>{formatPrice(activity.amount)}</Text>
//                 )}
//               </View>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   headerActions: {
//     flexDirection: 'row',
//   },
//   headerButton: {
//     padding: 8,
//     marginLeft: 8,
//   },
//   content: {
//     flex: 1,
//   },
//   periodSection: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   periodSelector: {
//     flexDirection: 'row',
//     backgroundColor: '#F3F4F6',
//     borderRadius: 8,
//     padding: 2,
//   },
//   periodButton: {
//     flex: 1,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 6,
//     alignItems: 'center',
//   },
//   activePeriodButton: {
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   periodButtonText: {
//     fontSize: 14,
//     color: '#6B7280',
//     fontWeight: '500',
//   },
//   activePeriodButtonText: {
//     color: '#111827',
//     fontWeight: '600',
//   },
//   metricsSection: {
//     backgroundColor: '#FFFFFF',
//     margin: 16,
//     borderRadius: 12,
//     padding: 16,
//   },
//   metricsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginHorizontal: -8,
//   },
//   metricCard: {
//     width: '50%',
//     paddingHorizontal: 8,
//     marginBottom: 16,
//   },
//   metricHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   metricIcon: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   changeIndicator: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 12,
//   },
//   changeText: {
//     fontSize: 10,
//     fontWeight: '600',
//     marginLeft: 2,
//   },
//   metricValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 2,
//   },
//   metricTitle: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginBottom: 2,
//   },
//   metricSubtitle: {
//     fontSize: 10,
//     color: '#9CA3AF',
//   },
//   section: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginBottom: 16,
//     borderRadius: 12,
//     padding: 16,
//   },
//   chartSection: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginBottom: 16,
//     borderRadius: 12,
//     padding: 16,
//   },
//   chartHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   chartAction: {
//     padding: 4,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   seeAll: {
//     fontSize: 14,
//     color: '#10B981',
//     fontWeight: '600',
//   },
//   chart: {
//     marginVertical: 8,
//     borderRadius: 16,
//   },
//   pieChart: {
//     marginVertical: 8,
//   },
//   productsList: {
//     marginTop: -8,
//   },
//   productItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   productRank: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#10B981',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   rankNumber: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   productInfo: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 2,
//   },
//   productStats: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   productPercentage: {
//     alignItems: 'flex-end',
//     minWidth: 60,
//   },
//   percentageText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#10B981',
//     marginBottom: 4,
//   },
//   progressBar: {
//     width: 50,
//     height: 4,
//     backgroundColor: '#E5E7EB',
//     borderRadius: 2,
//   },
//   progressFill: {
//     height: 4,
//     backgroundColor: '#10B981',
//     borderRadius: 2,
//   },
//   insightsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginHorizontal: -8,
//     marginTop: 8,
//   },
//   insightItem: {
//     width: '50%',
//     paddingHorizontal: 8,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   insightValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginTop: 8,
//     marginBottom: 4,
//   },
//   insightLabel: {
//     fontSize: 12,
//     color: '#6B7280',
//     textAlign: 'center',
//   },
//   activitiesList: {
//     marginTop: 8,
//   },
//   activityItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   activityIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   activityInfo: {
//     flex: 1,
//   },
//   activityDescription: {
//     fontSize: 14,
//     color: '#111827',
//     marginBottom: 2,
//   },
//   activityTime: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   activityAmount: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#10B981',
//   },
// });

// export default SellerAnalyticsScreen;