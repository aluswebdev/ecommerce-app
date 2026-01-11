// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   RefreshControl,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons } from '@expo/vector-icons';
// // import { LineChart, BarChart } from 'react-native-chart-kit';
// // import { useAuth } from '../../contexts/AuthContext';
// // import { useNotifications } from '../../contexts/NotificationContext';

// const { width } = Dimensions.get('window');

// const AdminDashboardScreen = ({ navigation }) => {
//   // const { user } = useAuth();
//   // const { getUnreadCount } = useNotifications();
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedPeriod, setSelectedPeriod] = useState('week');

//   // Mock admin dashboard data
//   const [dashboardData] = useState({
//     platformStats: {
//       totalUsers: 2847,
//       totalSellers: 156,
//       totalBuyers: 2691,
//       totalProducts: 1234,
//       totalOrders: 5678,
//       totalRevenue: 45000000,
//       platformFee: 2250000,
//       activeUsers: 1823,
//     },
//     growth: {
//       usersGrowth: 12.5,
//       sellersGrowth: 8.3,
//       ordersGrowth: 15.7,
//       revenueGrowth: 22.4,
//     },
//     recentActivities: [
//       {
//         id: '1',
//         type: 'user_signup',
//         description: 'New seller registration: Kenema Crafts',
//         time: '2 minutes ago',
//         priority: 'high',
//       },
//       {
//         id: '2',
//         type: 'product_reported',
//         description: 'Product reported for inappropriate content',
//         time: '15 minutes ago',
//         priority: 'high',
//       },
//       {
//         id: '3',
//         type: 'large_order',
//         description: 'Large order placed: Le 450,000',
//         time: '1 hour ago',
//         priority: 'medium',
//       },
//       {
//         id: '4',
//         type: 'seller_verification',
//         description: 'Seller verification request pending',
//         time: '2 hours ago',
//         priority: 'medium',
//       },
//       {
//         id: '5',
//         type: 'system_alert',
//         description: 'Payment gateway latency detected',
//         time: '3 hours ago',
//         priority: 'low',
//       },
//     ],
//     pendingActions: [
//       { id: '1', title: 'Seller Verifications', count: 12, color: '#F59E0B' },
//       { id: '2', title: 'Product Reports', count: 3, color: '#EF4444' },
//       { id: '3', title: 'Refund Requests', count: 7, color: '#3B82F6' },
//       { id: '4', title: 'Account Appeals', count: 2, color: '#8B5CF6' },
//     ],
//     topSellersByRevenue: [
//       { name: 'Aminata Fashion', revenue: 2850000, orders: 89, growth: 15.2 },
//       { name: 'Bo Farms Cooperative', revenue: 2200000, orders: 156, growth: 22.1 },
//       { name: 'Kenema Leather Works', revenue: 1890000, orders: 67, growth: 8.7 },
//       { name: 'Freetown Electronics', revenue: 1650000, orders: 45, growth: -2.3 },
//     ],
//     systemHealth: {
//       serverUptime: 99.98,
//       apiResponseTime: 245,
//       databaseConnections: 87,
//       errorRate: 0.02,
//     },
//   });

//   const onRefresh = async () => {
//     setRefreshing(true);
//     // Mock API call to refresh admin data
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

//   const getActivityIcon = (type) => {
//     const icons = {
//       user_signup: 'person-add',
//       product_reported: 'report',
//       large_order: 'shopping-cart',
//       seller_verification: 'verified',
//       system_alert: 'warning',
//     };
//     return icons[type] || 'info';
//   };

//   const getActivityColor = (priority) => {
//     const colors = {
//       high: '#EF4444',
//       medium: '#F59E0B',
//       low: '#6B7280',
//     };
//     return colors[priority] || '#6B7280';
//   };

//   const handleQuickAction = (action) => {
//     switch (action) {
//       case 'verify_sellers':
//         Alert.alert('Seller Verification', 'Navigate to pending seller verifications?', [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Go', onPress: () => navigation.navigate('Users') },
//         ]);
//         break;
//       case 'moderate_content':
//         Alert.alert('Content Moderation', 'Navigate to reported products?', [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Go', onPress: () => navigation.navigate('Products') },
//         ]);
//         break;
//       case 'manage_refunds':
//         Alert.alert('Refund Management', 'Navigate to refund requests?', [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Go', onPress: () => navigation.navigate('Orders') },
//         ]);
//         break;
//       case 'system_settings':
//         navigation.navigate('Settings');
//         break;
//     }
//   };

//   const chartConfig = {
//     backgroundColor: '#FFFFFF',
//     backgroundGradientFrom: '#FFFFFF',
//     backgroundGradientTo: '#FFFFFF',
//     decimalPlaces: 0,
//     color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
//     labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
//     style: {
//       borderRadius: 16,
//     },
//     propsForDots: {
//       r: '4',
//       strokeWidth: '2',
//       stroke: '#8B5CF6',
//     },
//   };

//   const StatCard = ({ icon, title, value, subtitle, growth, color = '#8B5CF6' }) => (
//     <View style={styles.statCard}>
//       <View style={styles.statHeader}>
//         <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
//           <MaterialIcons name={icon} size={20} color={color} />
//         </View>
//         {growth !== undefined && (
//           <View style={[
//             styles.growthIndicator, 
//             { backgroundColor: growth >= 0 ? '#DCFCE7' : '#FEE2E2' }
//           ]}>
//             <MaterialIcons 
//               name={growth >= 0 ? 'trending-up' : 'trending-down'} 
//               size={12} 
//               color={growth >= 0 ? '#16A34A' : '#DC2626'} 
//             />
//             <Text style={[
//               styles.growthText,
//               { color: growth >= 0 ? '#16A34A' : '#DC2626' }
//             ]}>
//               {Math.abs(growth).toFixed(1)}%
//             </Text>
//           </View>
//         )}
//       </View>
//       <Text style={styles.statValue}>{value}</Text>
//       <Text style={styles.statTitle}>{title}</Text>
//       {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <Text style={styles.greeting}>Admin Dashboard</Text>
//           <Text style={styles.platformName}>SaloneMarket Control Center</Text>
//         </View>
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.headerButton}>
//             <MaterialIcons name="notifications" size={24} color="#374151" />
//             {/* {getUnreadCount() > 0 && <View style={styles.badge} />} */}
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerButton}>
//             <MaterialIcons name="settings" size={24} color="#374151" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       >
//         {/* System Health Alert */}
//         <View style={styles.healthAlert}>
//           <View style={styles.healthIcon}>
//             <MaterialIcons name="health-and-safety" size={20} color="#10B981" />
//           </View>
//           <View style={styles.healthInfo}>
//             <Text style={styles.healthTitle}>System Status: All Good</Text>
//             <Text style={styles.healthSubtitle}>
//               {dashboardData.systemHealth.serverUptime}% uptime • {dashboardData.systemHealth.apiResponseTime}ms avg response
//             </Text>
//           </View>
//           <TouchableOpacity style={styles.healthAction}>
//             <MaterialIcons name="chevron-right" size={20} color="#6B7280" />
//           </TouchableOpacity>
//         </View>

//         {/* Key Metrics */}
//         <View style={styles.metricsSection}>
//           <Text style={styles.sectionTitle}>Platform Overview</Text>
//           <View style={styles.metricsGrid}>
//             <StatCard
//               icon="people"
//               title="Total Users"
//               value={dashboardData.platformStats.totalUsers.toLocaleString()}
//               growth={dashboardData.growth.usersGrowth}
//               color="#8B5CF6"
//             />
//             <StatCard
//               icon="store"
//               title="Active Sellers"
//               value={dashboardData.platformStats.totalSellers.toString()}
//               growth={dashboardData.growth.sellersGrowth}
//               color="#10B981"
//             />
//             <StatCard
//               icon="inventory"
//               title="Total Products"
//               value={dashboardData.platformStats.totalProducts.toLocaleString()}
//               color="#3B82F6"
//             />
//             <StatCard
//               icon="receipt"
//               title="Total Orders"
//               value={dashboardData.platformStats.totalOrders.toLocaleString()}
//               growth={dashboardData.growth.ordersGrowth}
//               color="#F59E0B"
//             />
//           </View>
//         </View>

//         {/* Revenue Overview */}
//         <View style={styles.revenueSection}>
//           <View style={styles.revenueHeader}>
//             <View>
//               <Text style={styles.sectionTitle}>Revenue Overview</Text>
//               <Text style={styles.revenueSubtitle}>Platform fees and commissions</Text>
//             </View>
//             <View style={styles.revenueStats}>
//               <Text style={styles.revenueTotal}>
//                 {formatPrice(dashboardData.platformStats.totalRevenue)}
//               </Text>
//               <Text style={styles.revenueGrowth}>
//                 +{dashboardData.growth.revenueGrowth}% this month
//               </Text>
//             </View>
//           </View>
//           <View style={styles.revenueSplit}>
//             <View style={styles.revenueItem}>
//               <Text style={styles.revenueLabel}>Platform Fee</Text>
//               <Text style={styles.revenueAmount}>
//                 {formatPrice(dashboardData.platformStats.platformFee)}
//               </Text>
//             </View>
//             <View style={styles.revenueItem}>
//               <Text style={styles.revenueLabel}>Seller Earnings</Text>
//               <Text style={styles.revenueAmount}>
//                 {formatPrice(dashboardData.platformStats.totalRevenue - dashboardData.platformStats.platformFee)}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Pending Actions */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Pending Actions</Text>
//             <TouchableOpacity>
//               <Text style={styles.seeAll}>View All</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.pendingGrid}>
//             {dashboardData.pendingActions.map((action) => (
//               <TouchableOpacity key={action.id} style={styles.pendingCard}>
//                 <View style={[styles.pendingIcon, { backgroundColor: `${action.color}20` }]}>
//                   <Text style={[styles.pendingCount, { color: action.color }]}>
//                     {action.count}
//                   </Text>
//                 </View>
//                 <Text style={styles.pendingTitle}>{action.title}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Top Sellers */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Top Performing Sellers</Text>
//             <TouchableOpacity>
//               <Text style={styles.seeAll}>View All</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.sellersList}>
//             {dashboardData.topSellersByRevenue.map((seller, index) => (
//               <View key={index} style={styles.sellerItem}>
//                 <View style={styles.sellerRank}>
//                   <Text style={styles.rankNumber}>{index + 1}</Text>
//                 </View>
//                 <View style={styles.sellerInfo}>
//                   <Text style={styles.sellerName}>{seller.name}</Text>
//                   <Text style={styles.sellerStats}>
//                     {formatPrice(seller.revenue)} • {seller.orders} orders
//                   </Text>
//                 </View>
//                 <View style={styles.sellerGrowth}>
//                   <MaterialIcons 
//                     name={seller.growth >= 0 ? 'trending-up' : 'trending-down'} 
//                     size={16} 
//                     color={seller.growth >= 0 ? '#10B981' : '#EF4444'} 
//                   />
//                   <Text style={[
//                     styles.growthValue,
//                     { color: seller.growth >= 0 ? '#10B981' : '#EF4444' }
//                   ]}>
//                     {Math.abs(seller.growth).toFixed(1)}%
//                   </Text>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* Recent Activities */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Recent Activities</Text>
//             <TouchableOpacity>
//               <Text style={styles.seeAll}>View All</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.activitiesList}>
//             {dashboardData.recentActivities.map((activity) => (
//               <View key={activity.id} style={styles.activityItem}>
//                 <View style={[
//                   styles.activityIcon,
//                   { backgroundColor: `${getActivityColor(activity.priority)}20` }
//                 ]}>
//                   <MaterialIcons 
//                     name={getActivityIcon(activity.type)} 
//                     size={16} 
//                     color={getActivityColor(activity.priority)}
//                   />
//                 </View>
//                 <View style={styles.activityInfo}>
//                   <Text style={styles.activityDescription}>{activity.description}</Text>
//                   <Text style={styles.activityTime}>{activity.time}</Text>
//                 </View>
//                 <View style={[
//                   styles.priorityBadge,
//                   { backgroundColor: getActivityColor(activity.priority) }
//                 ]}>
//                   <Text style={styles.priorityText}>
//                     {activity.priority.toUpperCase()}
//                   </Text>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* Quick Actions */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//           <View style={styles.actionsGrid}>
//             <TouchableOpacity 
//               style={styles.actionButton}
//               onPress={() => handleQuickAction('verify_sellers')}
//             >
//               <MaterialIcons name="verified-user" size={28} color="#10B981" />
//               <Text style={styles.actionText}>Verify Sellers</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={styles.actionButton}
//               onPress={() => handleQuickAction('moderate_content')}
//             >
//               <MaterialIcons name="gavel" size={28} color="#F59E0B" />
//               <Text style={styles.actionText}>Moderate Content</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={styles.actionButton}
//               onPress={() => handleQuickAction('manage_refunds')}
//             >
//               <MaterialIcons name="account-balance-wallet" size={28} color="#3B82F6" />
//               <Text style={styles.actionText}>Manage Refunds</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={styles.actionButton}
//               onPress={() => handleQuickAction('system_settings')}
//             >
//               <MaterialIcons name="settings" size={28} color="#8B5CF6" />
//               <Text style={styles.actionText}>System Settings</Text>
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
//   platformName: {
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
//   healthAlert: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F0FDF4',
//     marginHorizontal: 16,
//     marginTop: 16,
//     marginBottom: 8,
//     padding: 12,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#BBF7D0',
//   },
//   healthIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#DCFCE7',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   healthInfo: {
//     flex: 1,
//   },
//   healthTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#166534',
//     marginBottom: 2,
//   },
//   healthSubtitle: {
//     fontSize: 12,
//     color: '#16A34A',
//   },
//   healthAction: {
//     padding: 4,
//   },
//   section: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginBottom: 16,
//     borderRadius: 12,
//     padding: 16,
//   },
//   metricsSection: {
//     backgroundColor: '#FFFFFF',
//     margin: 16,
//     borderRadius: 12,
//     padding: 16,
//   },
//   revenueSection: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginBottom: 16,
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
//     color: '#8B5CF6',
//     fontWeight: '600',
//   },
//   metricsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginHorizontal: -8,
//   },
//   statCard: {
//     width: '50%',
//     paddingHorizontal: 8,
//     marginBottom: 16,
//   },
//   statHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   statIcon: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   growthIndicator: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 10,
//   },
//   growthText: {
//     fontSize: 10,
//     fontWeight: '600',
//     marginLeft: 2,
//   },
//   statValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 2,
//   },
//   statTitle: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginBottom: 2,
//   },
//   statSubtitle: {
//     fontSize: 10,
//     color: '#9CA3AF',
//   },
//   revenueHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   revenueSubtitle: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   revenueStats: {
//     alignItems: 'flex-end',
//   },
//   revenueTotal: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#8B5CF6',
//   },
//   revenueGrowth: {
//     fontSize: 12,
//     color: '#10B981',
//     fontWeight: '600',
//   },
//   revenueSplit: {
//     flexDirection: 'row',
//     backgroundColor: '#F9FAFB',
//     borderRadius: 12,
//     padding: 16,
//   },
//   revenueItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   revenueLabel: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   revenueAmount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   pendingGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginHorizontal: -8,
//   },
//   pendingCard: {
//     width: '50%',
//     paddingHorizontal: 8,
//     marginBottom: 12,
//     alignItems: 'center',
//   },
//   pendingIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   pendingCount: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   pendingTitle: {
//     fontSize: 12,
//     color: '#6B7280',
//     textAlign: 'center',
//   },
//   sellersList: {
//     marginTop: -8,
//   },
//   sellerItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   sellerRank: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#8B5CF6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   rankNumber: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   sellerInfo: {
//     flex: 1,
//   },
//   sellerName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 2,
//   },
//   sellerStats: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   sellerGrowth: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   growthValue: {
//     fontSize: 12,
//     fontWeight: '600',
//     marginLeft: 4,
//   },
//   activitiesList: {
//     marginTop: -8,
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
//   priorityBadge: {
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 8,
//   },
//   priorityText: {
//     color: '#FFFFFF',
//     fontSize: 8,
//     fontWeight: 'bold',
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

// export default AdminDashboardScreen;