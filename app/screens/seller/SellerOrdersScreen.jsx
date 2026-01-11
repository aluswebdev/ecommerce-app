// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   RefreshControl,
//   Alert,
//   Modal,
//   TextInput,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { useAuth } from '../../contexts/AuthContext';
// import { fetchOrders, updateOrderStatus } from '../../store/slices/orderSlice';

// const SellerOrdersScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { user, userRole } = useAuth();
//   const { items: orders, orderStatuses, loading } = useSelector(state => state.orders);
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [refreshing, setRefreshing] = useState(false);
//   const [updateModalVisible, setUpdateModalVisible] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [newStatus, setNewStatus] = useState('');
//   const [statusNotes, setStatusNotes] = useState('');

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
//       hour: '2-digit',
//       minute: '2-digit',
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

//   const handleUpdateOrderStatus = (order) => {
//     setSelectedOrder(order);
//     setNewStatus(order.status);
//     setStatusNotes('');
//     setUpdateModalVisible(true);
//   };

//   const confirmStatusUpdate = async () => {
//     if (selectedOrder && newStatus !== selectedOrder.status) {
//       try {
//         await dispatch(updateOrderStatus({
//           orderId: selectedOrder.id,
//           status: newStatus,
//           notes: statusNotes,
//         }));
//         Alert.alert('Success', 'Order status updated successfully!');
//         setUpdateModalVisible(false);
//         onRefresh();
//       } catch (error) {
//         Alert.alert('Error', 'Failed to update order status');
//       }
//     } else {
//       setUpdateModalVisible(false);
//     }
//   };

//   const getAvailableStatuses = (currentStatus) => {
//     const statusFlow = {
//       pending: ['processing', 'cancelled'],
//       processing: ['shipped', 'cancelled'],
//       shipped: ['delivered'],
//       delivered: [],
//       cancelled: [],
//     };
//     return statusFlow[currentStatus] || [];
//   };

//   const renderOrder = ({ item }) => (
//     <TouchableOpacity style={styles.orderCard}>
//       <View style={styles.orderHeader}>
//         <View style={styles.orderInfo}>
//           <Text style={styles.orderId}>#{item.trackingNumber}</Text>
//           <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
//         </View>
//         <View style={[styles.statusContainer, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
//           <MaterialIcons 
//             name={getStatusIcon(item.status)} 
//             size={16} 
//             color={getStatusColor(item.status)} 
//           />
//           <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
//             {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//           </Text>
//         </View>
//       </View>

//       {/* Customer Info */}
//       <View style={styles.customerSection}>
//         <View style={styles.customerInfo}>
//           <MaterialIcons name="person" size={16} color="#6B7280" />
//           <Text style={styles.customerName}>{item.deliveryAddress.name}</Text>
//         </View>
//         <View style={styles.customerInfo}>
//           <MaterialIcons name="phone" size={16} color="#6B7280" />
//           <Text style={styles.customerPhone}>{item.deliveryAddress.phone}</Text>
//         </View>
//         <View style={styles.customerInfo}>
//           <MaterialIcons name="location-on" size={16} color="#6B7280" />
//           <Text style={styles.customerAddress} numberOfLines={1}>
//             {item.deliveryAddress.address}, {item.deliveryAddress.city}
//           </Text>
//         </View>
//       </View>

//       {/* Order Items */}
//       <View style={styles.itemsSection}>
//         <Text style={styles.sectionTitle}>Items ({item.items.length})</Text>
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
//             <Text style={styles.itemTotal}>
//               {formatPrice(orderItem.price * orderItem.quantity)}
//             </Text>
//           </View>
//         ))}
        
//         {item.items.length > 2 && (
//           <Text style={styles.moreItems}>
//             +{item.items.length - 2} more {item.items.length - 2 === 1 ? 'item' : 'items'}
//           </Text>
//         )}
//       </View>

//       {/* Payment & Delivery */}
//       <View style={styles.paymentSection}>
//         <View style={styles.paymentRow}>
//           <Text style={styles.paymentLabel}>Payment Method:</Text>
//           <Text style={styles.paymentValue}>{item.paymentMethod}</Text>
//         </View>
//         <View style={styles.paymentRow}>
//           <Text style={styles.paymentLabel}>Delivery Fee:</Text>
//           <Text style={styles.paymentValue}>{formatPrice(item.deliveryFee)}</Text>
//         </View>
//         <View style={[styles.paymentRow, styles.totalRow]}>
//           <Text style={styles.totalLabel}>Total:</Text>
//           <Text style={styles.totalAmount}>{formatPrice(item.total)}</Text>
//         </View>
//       </View>

//       {/* Actions */}
//       <View style={styles.actionsSection}>
//         <TouchableOpacity 
//           style={styles.actionButton}
//           onPress={() => handleUpdateOrderStatus(item)}
//         >
//           <MaterialIcons name="edit" size={16} color="#10B981" />
//           <Text style={[styles.actionText, { color: '#10B981' }]}>Update Status</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.actionButton}>
//           <MaterialIcons name="chat" size={16} color="#3B82F6" />
//           <Text style={[styles.actionText, { color: '#3B82F6' }]}>Message Customer</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.actionButton}>
//           <MaterialIcons name="print" size={16} color="#6B7280" />
//           <Text style={[styles.actionText, { color: '#6B7280' }]}>Print Label</Text>
//         </TouchableOpacity>
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
//           ? "You haven't received any orders yet"
//           : `No ${selectedStatus} orders found`
//         }
//       </Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Orders</Text>
//         <View style={styles.headerActions}>
//           <TouchableOpacity style={styles.headerButton}>
//             <MaterialIcons name="search" size={24} color="#374151" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerButton}>
//             <MaterialIcons name="filter-list" size={24} color="#374151" />
//           </TouchableOpacity>
//         </View>
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

//       {/* Update Status Modal */}
//       <Modal
//         visible={updateModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setUpdateModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Update Order Status</Text>
//               <TouchableOpacity onPress={() => setUpdateModalVisible(false)}>
//                 <MaterialIcons name="close" size={24} color="#6B7280" />
//               </TouchableOpacity>
//             </View>

//             {selectedOrder && (
//               <>
//                 <Text style={styles.orderReference}>
//                   Order #{selectedOrder.trackingNumber}
//                 </Text>

//                 <View style={styles.statusOptions}>
//                   <Text style={styles.sectionLabel}>New Status:</Text>
//                   {getAvailableStatuses(selectedOrder.status).map((status) => {
//                     const statusConfig = orderStatuses.find(s => s.id === status);
//                     return (
//                       <TouchableOpacity
//                         key={status}
//                         style={[
//                           styles.statusOption,
//                           newStatus === status && styles.selectedStatusOption,
//                           { borderColor: statusConfig?.color }
//                         ]}
//                         onPress={() => setNewStatus(status)}
//                       >
//                         <MaterialIcons 
//                           name={getStatusIcon(status)} 
//                           size={20} 
//                           color={statusConfig?.color} 
//                         />
//                         <Text style={[styles.statusOptionText, { color: statusConfig?.color }]}>
//                           {status.charAt(0).toUpperCase() + status.slice(1)}
//                         </Text>
//                       </TouchableOpacity>
//                     );
//                   })}
//                 </View>

//                 <View style={styles.notesSection}>
//                   <Text style={styles.sectionLabel}>Notes (Optional):</Text>
//                   <TextInput
//                     style={styles.notesInput}
//                     placeholder="Add notes about this status update..."
//                     value={statusNotes}
//                     onChangeText={setStatusNotes}
//                     multiline
//                     numberOfLines={3}
//                   />
//                 </View>

//                 <View style={styles.modalActions}>
//                   <TouchableOpacity 
//                     style={styles.cancelButton}
//                     onPress={() => setUpdateModalVisible(false)}
//                   >
//                     <Text style={styles.cancelButtonText}>Cancel</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity 
//                     style={[
//                       styles.confirmButton,
//                       newStatus === selectedOrder.status && styles.disabledButton
//                     ]}
//                     onPress={confirmStatusUpdate}
//                     disabled={newStatus === selectedOrder.status}
//                   >
//                     <Text style={styles.confirmButtonText}>Update Status</Text>
//                   </TouchableOpacity>
//                 </View>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>
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
//   filtersContainer: {
//     backgroundColor: '#FFFFFF',
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
//     padding: 16,
//   },
//   emptyList: {
//     flex: 1,
//   },
//   orderCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     marginBottom: 16,
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
//     paddingBottom: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   orderInfo: {
//     flex: 1,
//   },
//   orderId: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 2,
//   },
//   orderDate: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '600',
//     marginLeft: 4,
//   },
//   customerSection: {
//     marginBottom: 12,
//   },
//   customerInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   customerName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111827',
//     marginLeft: 8,
//   },
//   customerPhone: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginLeft: 8,
//   },
//   customerAddress: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginLeft: 8,
//     flex: 1,
//   },
//   itemsSection: {
//     marginBottom: 12,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 8,
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
//   itemTotal: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#10B981',
//   },
//   moreItems: {
//     fontSize: 14,
//     color: '#6B7280',
//     fontStyle: 'italic',
//     textAlign: 'center',
//     paddingVertical: 8,
//   },
//   paymentSection: {
//     marginBottom: 12,
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6',
//   },
//   paymentRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 4,
//   },
//   paymentLabel: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   paymentValue: {
//     fontSize: 14,
//     color: '#111827',
//     fontWeight: '500',
//   },
//   totalRow: {
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6',
//     paddingTop: 8,
//     marginTop: 8,
//   },
//   totalLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   totalAmount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#10B981',
//   },
//   actionsSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6',
//     paddingTop: 12,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 8,
//   },
//   actionText: {
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
//     lineHeight: 20,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 24,
//     maxHeight: '80%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   orderReference: {
//     fontSize: 16,
//     color: '#6B7280',
//     marginBottom: 20,
//   },
//   statusOptions: {
//     marginBottom: 20,
//   },
//   sectionLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 12,
//   },
//   statusOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   selectedStatusOption: {
//     backgroundColor: '#F9FAFB',
//   },
//   statusOptionText: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginLeft: 12,
//   },
//   notesSection: {
//     marginBottom: 24,
//   },
//   notesInput: {
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     textAlignVertical: 'top',
//     height: 80,
//   },
//   modalActions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     gap: 12,
//   },
//   cancelButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   cancelButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#6B7280',
//   },
//   confirmButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//     backgroundColor: '#10B981',
//   },
//   disabledButton: {
//     backgroundColor: '#9CA3AF',
//   },
//   confirmButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
// });

// export default SellerOrdersScreen;