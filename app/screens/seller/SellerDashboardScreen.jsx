// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   RefreshControl,
//   Dimensions,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons } from '@expo/vector-icons';
// import { LineChart, BarChart } from 'react-native-chart-kit';
// import { useAuth } from '../../contexts/AuthContext';
// import { useNotifications } from '../../contexts/NotificationContext';

// const { width } = Dimensions.get('window');

// const SellerDashboardScreen = ({ navigation }) => {
//   const { user } = useAuth();
//   const { getUnreadCount } = useNotifications();
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedPeriod, setSelectedPeriod] = useState('week');

//   // Mock dashboard data
//   const [dashboardData, setDashboardData] = useState({
//     todayStats: {
//       sales: 125000,
//       orders: 8,
//       views: 156,
//       messages: 3,
//     },
//     weeklyStats: {
//       revenue: [85000, 120000, 95000, 140000, 110000, 125000, 135000],
//       orders: [5, 8, 6, 9, 7, 8, 9],
//     },
//     recentOrders: [
//       {
//         id: '1',
//         customer: 'Fatima K.',
//         product: 'Traditional Gele Headwrap',
//         amount: 75000,
//         status: 'pending',
//         time: '2 hours ago',
//       },
//       {
//         id: '2',
//         customer: 'Mohamed S.',
//         product: 'Handmade Leather Bag',
//         amount: 150000,
//         status: 'processing',
//         time: '4 hours ago',
//       },
//       {
//         id: '3',
//         customer: 'Aminata B.',
//         product: 'Traditional Gele Headwrap',
//         amount: 80000,
//         status: 'shipped',
//         time: '6 hours ago',
//       },
//     ],
//     topProducts: [
//       { name: 'Traditional Gele Headwrap', sales: 24, revenue: 1800000 },
//       { name: 'Handmade Leather Bag', sales: 15, revenue: 2250000 },
//       { name: 'Custom Embroidered Dress', sales: 12, revenue: 1440000 },
//     ],
//   });

//   const onRefresh = async () => {
//     setRefreshing(true);
//     // Mock API call to refresh data
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1000);
//   };

//   const formatPrice = (price) => {
//     return `Le ${price.toLocaleString()}`;
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       pending: '#F59E0B',
//       processing: '#3B82F6',
//       shipped: '#8B5CF6',
//       delivered: '#10B981',
//       cancelled: '#EF4444',
//     };
//     return colors[status] || '#6B7280';
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
//       r: '6',
//       strokeWidth: '2',
//       stroke: '#10B981',
//     },
//   };

//   const StatCard = ({ icon, title, value, change, color = '#10B981' }) => (
//     <View style={styles.statCard}>
//       <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
//         <MaterialIcons name={icon} size={24} color={color} />
//       </View>
//       <View style={styles.statContent}>
//         <Text style={styles.statTitle}>{title}</Text>
//         <Text style={styles.statValue}>{value}</Text>
//         {change && (
//           <View style={styles.statChange}>
//             <MaterialIcons 
//               name={change.type === 'up' ? 'trending-up' : 'trending-down'} 
//               size={16} 
//               color={change.type === 'up' ? '#10B981' : '#EF4444'} 
//             />
//             <Text style={[
//               styles.statChangeText,
//               { color: change.type === 'up' ? '#10B981' : '#EF4444' }
//             ]}>
//               {change.value}%
//             </Text>
//           </View>
//         )}
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <Text style={styles.greeting}>Good morning,</Text>
//           <Text style={styles.businessName}>Aminata Fashion</Text>
//         </View>
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.headerButton}>
//             <MaterialIcons name="notifications" size={24} color="#374151" />
//             {getUnreadCount() > 0 && <View style={styles.badge} />}
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerButton}>
//             <MaterialIcons name="add" size={24} color="#374151" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       >
//         {/* Quick Stats */}
//         <View style={styles.statsSection}>
//           <Text style={styles.sectionTitle}>Today's Overview</Text>
//           <View style={styles.statsGrid}>
//             <StatCard
//               icon="attach-money"
//               title="Sales"
//               value={formatPrice(dashboardData.todayStats.sales)}
//               change={{ type: 'up', value: 12.5 }}
//               color="#10B981"
//             />
//             <StatCard
//               icon="receipt"
//               title="Orders"
//               value={dashboardData.todayStats.orders.toString()}
//               change={{ type: 'up', value: 8.3 }}
//               color="#3B82F6"
//             />
//             <StatCard
//               icon="visibility"
//               title="Views"
//               value={dashboardData.todayStats.views.toString()}
//               change={{ type: 'up', value: 15.2 }}
//               color="#8B5CF6"
//             />
//             <StatCard
//               icon="chat"
//               title="Messages"
//               value={dashboardData.todayStats.messages.toString()}
//               change={{ type: 'down', value: 2.1 }}
//               color="#F59E0B"
//             />
//           </View>
//         </View>

//         {/* Revenue Chart */}
//         <View style={styles.chartSection}>
//           <View style={styles.chartHeader}>
//             <Text style={styles.sectionTitle}>Revenue Trend</Text>
//             <View style={styles.periodSelector}>
//               {['week', 'month', 'year'].map((period) => (
//                 <TouchableOpacity
//                   key={period}
//                   style={[
//                     styles.periodButton,
//                     selectedPeriod === period && styles.activePeriodButton
//                   ]}
//                   onPress={() => setSelectedPeriod(period)}
//                 >
//                   <Text style={[
//                     styles.periodButtonText,
//                     selectedPeriod === period && styles.activePeriodButtonText
//                   ]}>
//                     {period.charAt(0).toUpperCase() + period.slice(1)}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//           <LineChart
//             data={{
//               labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//               datasets: [
//                 {
//                   data: dashboardData.weeklyStats.revenue.map(r => r / 1000), // Convert to thousands
//                 },
//               ],
//             }}
//             width={width - 32}
//             height={220}
//             chartConfig={chartConfig}
//             bezier
//             style={styles.chart}
//           />
//         </View>

//         {/* Recent Orders */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Recent Orders</Text>
//             <TouchableOpacity>
//               <Text style={styles.seeAll}>See All</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.ordersList}>
//             {dashboardData.recentOrders.map((order) => (
//               <TouchableOpacity key={order.id} style={styles.orderItem}>
//                 <View style={styles.orderInfo}>
//                   <Text style={styles.customerName}>{order.customer}</Text>
//                   <Text style={styles.productName} numberOfLines={1}>
//                     {order.product}
//                   </Text>
//                   <Text style={styles.orderTime}>{order.time}</Text>
//                 </View>
//                 <View style={styles.orderRight}>
//                   <Text style={styles.orderAmount}>{formatPrice(order.amount)}</Text>
//                   <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
//                     <Text style={styles.statusText}>
//                       {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                     </Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Top Products */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Top Selling Products</Text>
//           <View style={styles.productsList}>
//             {dashboardData.topProducts.map((product, index) => (
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
//                 <MaterialIcons name="trending-up" size={20} color="#10B981" />
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* Quick Actions */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//           <View style={styles.actionsGrid}>
//             <TouchableOpacity style={styles.actionButton}>
//               <MaterialIcons name="add-box" size={32} color="#10B981" />
//               <Text style={styles.actionText}>Add Product</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.actionButton}>
//               <MaterialIcons name="inventory" size={32} color="#3B82F6" />
//               <Text style={styles.actionText}>Manage Stock</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.actionButton}>
//               <MaterialIcons name="local-offer" size={32} color="#F59E0B" />
//               <Text style={styles.actionText}>Create Offer</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.actionButton}>
//               <MaterialIcons name="campaign" size={32} color="#8B5CF6" />
//               <Text style={styles.actionText}>Promote</Text>
//             </TouchableOpacity>
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
//   headerLeft: {
//     flex: 1,
//   },
//   greeting: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   businessName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerButton: {
//     padding: 8,
//     marginLeft: 8,
//     position: 'relative',
//   },
//   badge: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#EF4444',
//   },
//   content: {
//     flex: 1,
//   },
//   section: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginBottom: 16,
//     borderRadius: 12,
//     padding: 16,
//   },
//   statsSection: {
//     backgroundColor: '#FFFFFF',
//     margin: 16,
//     borderRadius: 12,
//     padding: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 16,
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
//   statsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginHorizontal: -8,
//   },
//   statCard: {
//     width: '50%',
//     paddingHorizontal: 8,
//     marginBottom: 16,
//   },
//   statIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   statContent: {
//     backgroundColor: '#F9FAFB',
//     padding: 12,
//     borderRadius: 8,
//   },
//   statTitle: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 4,
//   },
//   statChange: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statChangeText: {
//     fontSize: 12,
//     fontWeight: '600',
//     marginLeft: 4,
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
//   periodSelector: {
//     flexDirection: 'row',
//     backgroundColor: '#F3F4F6',
//     borderRadius: 8,
//     padding: 2,
//   },
//   periodButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   activePeriodButton: {
//     backgroundColor: '#FFFFFF',
//   },
//   periodButtonText: {
//     fontSize: 12,
//     color: '#6B7280',
//     fontWeight: '500',
//   },
//   activePeriodButtonText: {
//     color: '#111827',
//   },
//   chart: {
//     marginVertical: 8,
//     borderRadius: 16,
//   },
//   ordersList: {
//     marginTop: -8,
//   },
//   orderItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   orderInfo: {
//     flex: 1,
//   },
//   customerName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 2,
//   },
//   productName: {
//     fontSize: 13,
//     color: '#6B7280',
//     marginBottom: 2,
//   },
//   orderTime: {
//     fontSize: 12,
//     color: '#9CA3AF',
//   },
//   orderRight: {
//     alignItems: 'flex-end',
//   },
//   orderAmount: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#10B981',
//     marginBottom: 4,
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 12,
//   },
//   statusText: {
//     color: '#FFFFFF',
//     fontSize: 10,
//     fontWeight: '600',
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
//   productStats: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   actionsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginHorizontal: -8,
//   },
//   actionButton: {
//     width: '50%',
//     paddingHorizontal: 8,
//     marginBottom: 16,
//     alignItems: 'center',
//   },
//   actionText: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 8,
//     textAlign: 'center',
//   },
// });

// export default SellerDashboardScreen;