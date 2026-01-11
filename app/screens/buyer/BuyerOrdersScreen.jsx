// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   RefreshControl,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { useAuth } from '../../contexts/AuthContext';
// import { fetchOrders } from '../../store/slices/orderSlice';

// const BuyerOrdersScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { user, userRole } = useAuth();
//   const { items: orders, orderStatuses, loading } = useSelector(state => state.orders);
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     if (user) {
//       dispatch(fetchOrders({ userId: user.id, userRole, status: selectedStatus }));
//     }
//   }, [dispatch, user, userRole, selectedStatus]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     if (user) {
//       await dispatch(fetchOrders({ userId: user.id, userRole, status: selectedStatus }));
//     }
//     setRefreshing(false);
//   };

//   const formatPrice = (price) => {
//     return `Le ${price.toLocaleString()}`;
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   const getStatusColor = (status) => {
//     const statusConfig = orderStatuses.find(s => s.id === status);
//     return statusConfig ? statusConfig.color : '#6B7280';
//   };

//   const getStatusIcon = (status) => {
//     const icons = {
//       pending: 'schedule',
//       processing: 'inventory',
//       shipped: 'local-shipping',
//       delivered: 'check-circle',
//       cancelled: 'cancel',
//     };
//     return icons[status] || 'help';
//   };

//   const renderOrder = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.orderCard}
//       onPress={() => {
//         // Navigate to order details
//         // navigation.navigate('OrderDetails', { orderId: item.id });
//       }}
//     >
//       <View style={styles.orderHeader}>
//         <View style={styles.orderInfo}>
//           <Text style={styles.orderId}>Order #{item.trackingNumber}</Text>
//           <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
//         </View>
//         <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
//           <MaterialIcons 
//             name={getStatusIcon(item.status)} 
//             size={16} 
//             color="#FFFFFF" 
//           />
//           <Text style={styles.statusText}>
//             {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.orderItems}>
//         {item.items.slice(0, 2).map((orderItem, index) => (
//           <View key={index} style={styles.orderItem}>
//             <Image source={{ uri: orderItem.image }} style={styles.itemImage} />
//             <View style={styles.itemInfo}>
//               <Text style={styles.itemName} numberOfLines={1}>
//                 {orderItem.productName}
//               </Text>
//               {orderItem.variant && (
//                 <Text style={styles.itemVariant}>{orderItem.variant.name}</Text>
//               )}
//               <Text style={styles.itemPrice}>
//                 {formatPrice(orderItem.price)} x {orderItem.quantity}
//               </Text>
//             </View>
//           </View>
//         ))}
        
//         {item.items.length > 2 && (
//           <Text style={styles.moreItems}>
//             +{item.items.length - 2} more {item.items.length - 2 === 1 ? 'item' : 'items'}
//           </Text>
//         )}
//       </View>

//       <View style={styles.orderFooter}>
//         <View style={styles.orderTotal}>
//           <Text style={styles.totalLabel}>Total: </Text>
//           <Text style={styles.totalAmount}>{formatPrice(item.total)}</Text>
//         </View>
        
//         <View style={styles.orderActions}>
//           {item.status === 'delivered' && (
//             <TouchableOpacity style={styles.actionButton}>
//               <Text style={styles.actionButtonText}>Rate & Review</Text>
//             </TouchableOpacity>
//           )}
          
//           {item.status === 'pending' && (
//             <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
//               <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
//             </TouchableOpacity>
//           )}
          
//           <TouchableOpacity style={styles.trackButton}>
//             <MaterialIcons name="visibility" size={16} color="#1E40AF" />
//             <Text style={styles.trackButtonText}>Track</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderStatusFilter = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.statusFilter,
//         selectedStatus === item.id && styles.activeStatusFilter,
//         { borderColor: item.color }
//       ]}
//       onPress={() => setSelectedStatus(item.id)}
//     >
//       <Text style={[
//         styles.statusFilterText,
//         selectedStatus === item.id && { color: item.color }
//       ]}>
//         {item.name}
//       </Text>
//     </TouchableOpacity>
//   );

//   const renderEmptyState = () => (
//     <View style={styles.emptyContainer}>
//       <MaterialIcons name="receipt-long" size={80} color="#E5E7EB" />
//       <Text style={styles.emptyTitle}>No orders found</Text>
//       <Text style={styles.emptySubtitle}>
//         {selectedStatus === 'all' 
//           ? "You haven't placed any orders yet"
//           : `No ${selectedStatus} orders found`
//         }
//       </Text>
//       {selectedStatus === 'all' && (
//         <TouchableOpacity style={styles.shopButton}>
//           <Text style={styles.shopButtonText}>Start Shopping</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>My Orders</Text>
//         <TouchableOpacity style={styles.headerButton}>
//           <MaterialIcons name="search" size={24} color="#374151" />
//         </TouchableOpacity>
//       </View>

//       {/* Status Filters */}
//       <View style={styles.filtersContainer}>
//         <FlatList
//           data={orderStatuses}
//           renderItem={renderStatusFilter}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.filtersList}
//         />
//       </View>

//       {/* Orders List */}
//       <FlatList
//         data={orders}
//         renderItem={renderOrder}
//         keyExtractor={(item) => item.id}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         contentContainerStyle={orders.length === 0 ? styles.emptyList : styles.ordersList}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={renderEmptyState}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   headerButton: {
//     padding: 8,
//   },
//   filtersContainer: {
//     backgroundColor: '#F9FAFB',
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   filtersList: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   statusFilter: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 8,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   activeStatusFilter: {
//     backgroundColor: '#F9FAFB',
//   },
//   statusFilterText: {
//     fontSize: 14,
//     color: '#6B7280',
//     fontWeight: '500',
//   },
//   ordersList: {
//     paddingVertical: 8,
//   },
//   emptyList: {
//     flex: 1,
//   },
//   orderCard: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginVertical: 6,
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   orderHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   orderInfo: {
//     flex: 1,
//   },
//   orderId: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 2,
//   },
//   orderDate: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   statusText: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontWeight: '600',
//     marginLeft: 4,
//   },
//   orderItems: {
//     marginBottom: 12,
//   },
//   orderItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   itemImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 6,
//     marginRight: 12,
//   },
//   itemInfo: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#111827',
//     marginBottom: 2,
//   },
//   itemVariant: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginBottom: 2,
//   },
//   itemPrice: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   moreItems: {
//     fontSize: 14,
//     color: '#6B7280',
//     fontStyle: 'italic',
//     textAlign: 'center',
//     paddingVertical: 8,
//   },
//   orderFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6',
//     paddingTop: 12,
//   },
//   orderTotal: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   totalLabel: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   totalAmount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1E40AF',
//   },
//   orderActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     backgroundColor: '#1E40AF',
//     borderRadius: 8,
//     marginRight: 8,
//   },
//   actionButtonText: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   cancelButton: {
//     backgroundColor: '#EF4444',
//   },
//   cancelButtonText: {
//     color: '#FFFFFF',
//   },
//   trackButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//   },
//   trackButtonText: {
//     color: '#1E40AF',
//     fontSize: 12,
//     fontWeight: '600',
//     marginLeft: 4,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 32,
//   },
//   emptyTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#374151',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptySubtitle: {
//     fontSize: 14,
//     color: '#6B7280',
//     textAlign: 'center',
//     marginBottom: 24,
//     lineHeight: 20,
//   },
//   shopButton: {
//     backgroundColor: '#1E40AF',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   shopButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });

// export default BuyerOrdersScreen;