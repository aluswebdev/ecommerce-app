// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Switch,
//   Alert,
//   TextInput,
//   Modal,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useAuth } from '../../contexts/AuthContext';
// import { useNotifications } from '../../contexts/NotificationContext';

// const SellerProfileScreen = ({ navigation }) => {
//   const { user, logout } = useAuth();
//   const { getUnreadCount } = useNotifications();
//   const [notificationsEnabled, setNotificationsEnabled] = useState(true);
//   const [autoAcceptOrders, setAutoAcceptOrders] = useState(false);
//   const [vacationMode, setVacationMode] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [editField, setEditField] = useState('');
//   const [editValue, setEditValue] = useState('');

//   // Mock business data
//   const [businessData] = useState({
//     businessName: 'Aminata Fashion House',
//     description: 'Traditional Sierra Leonean clothing and accessories specializing in gele headwraps, traditional dresses, and ceremonial wear.',
//     address: '15 Kissy Street, Freetown',
//     phone: '+232 78 234567',
//     email: 'aminata@fashion.sl',
//     license: 'SL-BL-2023-1234',
//     taxId: 'SL-TAX-5678',
//     bankDetails: {
//       bankName: 'Sierra Leone Commercial Bank',
//       accountNumber: '****1234',
//       accountName: 'Aminata Fashion House',
//     },
//     socialMedia: {
//       facebook: '@aminatafashion',
//       instagram: '@aminata_fashion_sl',
//       whatsapp: '+232 78 234567',
//     },
//     stats: {
//       totalProducts: 45,
//       totalSales: 2850000,
//       totalOrders: 89,
//       rating: 4.8,
//       reviews: 67,
//       joinDate: '2023-12-15',
//     },
//   });

//   const handleLogout = () => {
//     Alert.alert(
//       'Sign Out',
//       'Are you sure you want to sign out?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Sign Out', style: 'destructive', onPress: logout },
//       ]
//     );
//   };

//   const handleEdit = (field, currentValue) => {
//     setEditField(field);
//     setEditValue(currentValue);
//     setEditModalVisible(true);
//   };

//   const saveEdit = () => {
//     // Mock save functionality
//     Alert.alert('Success', `${editField} updated successfully!`);
//     setEditModalVisible(false);
//   };

//   const formatPrice = (price) => {
//     return `Le ${price.toLocaleString()}`;
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   const businessMenuItems = [
//     {
//       id: 'business-info',
//       icon: 'business',
//       title: 'Business Information',
//       subtitle: 'Edit business details and description',
//       showArrow: true,
//     },
//     {
//       id: 'bank-details',
//       icon: 'account-balance',
//       title: 'Bank Details',
//       subtitle: 'Payment and withdrawal settings',
//       showArrow: true,
//     },
//     {
//       id: 'verification',
//       icon: 'verified',
//       title: 'Business Verification',
//       subtitle: 'Upload documents and get verified',
//       showArrow: true,
//       badge: 'Verified',
//       badgeColor: '#10B981',
//     },
//     {
//       id: 'shipping',
//       icon: 'local-shipping',
//       title: 'Shipping Settings',
//       subtitle: 'Delivery zones and pricing',
//       showArrow: true,
//     },
//   ];

//   const sellingMenuItems = [
//     {
//       id: 'auto-accept',
//       icon: 'auto-awesome',
//       title: 'Auto Accept Orders',
//       subtitle: 'Automatically accept new orders',
//       showToggle: true,
//       toggleValue: autoAcceptOrders,
//       onToggle: setAutoAcceptOrders,
//     },
//     {
//       id: 'vacation-mode',
//       icon: 'beach-access',
//       title: 'Vacation Mode',
//       subtitle: 'Temporarily pause all sales',
//       showToggle: true,
//       toggleValue: vacationMode,
//       onToggle: setVacationMode,
//     },
//     {
//       id: 'promotion',
//       icon: 'campaign',
//       title: 'Promotion Tools',
//       subtitle: 'Discounts, coupons, and featured listings',
//       showArrow: true,
//     },
//     {
//       id: 'inventory',
//       icon: 'inventory',
//       title: 'Inventory Management',
//       subtitle: 'Stock alerts and bulk updates',
//       showArrow: true,
//     },
//   ];

//   const supportMenuItems = [
//     {
//       id: 'seller-support',
//       icon: 'support-agent',
//       title: 'Seller Support',
//       subtitle: 'Get help with selling on SaloneMarket',
//       showArrow: true,
//     },
//     {
//       id: 'guidelines',
//       icon: 'rule',
//       title: 'Seller Guidelines',
//       subtitle: 'Policies and best practices',
//       showArrow: true,
//     },
//     {
//       id: 'feedback',
//       icon: 'feedback',
//       title: 'Send Feedback',
//       subtitle: 'Help us improve the seller experience',
//       showArrow: true,
//     },
//   ];

//   const renderMenuItem = (item) => (
//     <TouchableOpacity key={item.id} style={styles.menuItem}>
//       <View style={styles.menuItemLeft}>
//         <View style={[styles.menuIcon, { backgroundColor: `${item.badgeColor || '#10B981'}20` }]}>
//           <MaterialIcons name={item.icon} size={24} color={item.badgeColor || '#10B981'} />
//         </View>
//         <View style={styles.menuContent}>
//           <View style={styles.menuTitleRow}>
//             <Text style={styles.menuTitle}>{item.title}</Text>
//             {item.badge && (
//               <View style={[styles.badge, { backgroundColor: item.badgeColor }]}>
//                 <Text style={styles.badgeText}>{item.badge}</Text>
//               </View>
//             )}
//           </View>
//           <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
//         </View>
//       </View>
      
//       {item.showToggle && (
//         <Switch
//           value={item.toggleValue}
//           onValueChange={item.onToggle}
//           trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
//           thumbColor={item.toggleValue ? '#10B981' : '#F3F4F6'}
//         />
//       )}
      
//       {item.showArrow && (
//         <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
//       )}
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Business Profile</Text>
//         <TouchableOpacity style={styles.headerButton}>
//           <MaterialIcons name="settings" size={24} color="#374151" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Business Profile Card */}
//         <View style={styles.profileCard}>
//           <View style={styles.profileHeader}>
//             <TouchableOpacity style={styles.avatarContainer}>
//               <Image 
//                 source={{ 
//                   uri: user?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100'
//                 }} 
//                 style={styles.avatar}
//               />
//               <View style={styles.editAvatarButton}>
//                 <MaterialIcons name="camera-alt" size={16} color="#FFFFFF" />
//               </View>
//             </TouchableOpacity>
            
//             <View style={styles.profileInfo}>
//               <View style={styles.businessNameRow}>
//                 <Text style={styles.businessName}>{businessData.businessName}</Text>
//                 <View style={styles.verifiedBadge}>
//                   <MaterialIcons name="verified" size={16} color="#10B981" />
//                 </View>
//               </View>
//               <Text style={styles.businessEmail}>{businessData.email}</Text>
//               <Text style={styles.businessAddress}>{businessData.address}</Text>
//               <Text style={styles.joinDate}>
//                 Member since {formatDate(businessData.stats.joinDate)}
//               </Text>
//             </View>
//           </View>

//           {/* Business Stats */}
//           <View style={styles.statsContainer}>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{businessData.stats.totalProducts}</Text>
//               <Text style={styles.statLabel}>Products</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{businessData.stats.totalOrders}</Text>
//               <Text style={styles.statLabel}>Orders</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{formatPrice(businessData.stats.totalSales)}</Text>
//               <Text style={styles.statLabel}>Sales</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{businessData.stats.rating}</Text>
//               <Text style={styles.statLabel}>Rating</Text>
//             </View>
//           </View>

//           {/* Quick Actions */}
//           <View style={styles.quickActions}>
//             <TouchableOpacity style={styles.quickAction}>
//               <MaterialIcons name="edit" size={20} color="#10B981" />
//               <Text style={styles.quickActionText}>Edit Profile</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity style={styles.quickAction}>
//               <MaterialIcons name="visibility" size={20} color="#3B82F6" />
//               <Text style={styles.quickActionText}>View Public</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity style={styles.quickAction}>
//               <MaterialIcons name="share" size={20} color="#8B5CF6" />
//               <Text style={styles.quickActionText}>Share Store</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Business Settings */}
//         <View style={styles.menuSection}>
//           <Text style={styles.sectionTitle}>Business Settings</Text>
//           {businessMenuItems.map(renderMenuItem)}
//         </View>

//         {/* Selling Tools */}
//         <View style={styles.menuSection}>
//           <Text style={styles.sectionTitle}>Selling Tools</Text>
//           {sellingMenuItems.map(renderMenuItem)}
//         </View>

//         {/* Performance Insights */}
//         <View style={styles.insightsCard}>
//           <Text style={styles.sectionTitle}>This Month's Performance</Text>
//           <View style={styles.insightsList}>
//             <View style={styles.insightItem}>
//               <MaterialIcons name="trending-up" size={20} color="#10B981" />
//               <Text style={styles.insightText}>Sales increased by 15%</Text>
//             </View>
//             <View style={styles.insightItem}>
//               <MaterialIcons name="star" size={20} color="#F59E0B" />
//               <Text style={styles.insightText}>3 new 5-star reviews</Text>
//             </View>
//             <View style={styles.insightItem}>
//               <MaterialIcons name="visibility" size={20} color="#3B82F6" />
//               <Text style={styles.insightText}>Product views up 22%</Text>
//             </View>
//           </View>
//         </View>

//         {/* Support & Help */}
//         <View style={styles.menuSection}>
//           <Text style={styles.sectionTitle}>Support & Help</Text>
//           {supportMenuItems.map(renderMenuItem)}
//         </View>

//         {/* Logout */}
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <MaterialIcons name="logout" size={24} color="#EF4444" />
//           <Text style={styles.logoutText}>Sign Out</Text>
//         </TouchableOpacity>

//         {/* Footer */}
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>SaloneMarket Seller v1.0.0</Text>
//         </View>
//       </ScrollView>

//       {/* Edit Modal */}
//       <Modal
//         visible={editModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setEditModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Edit {editField}</Text>
//               <TouchableOpacity onPress={() => setEditModalVisible(false)}>
//                 <MaterialIcons name="close" size={24} color="#6B7280" />
//               </TouchableOpacity>
//             </View>
            
//             <TextInput
//               style={styles.editInput}
//               value={editValue}
//               onChangeText={setEditValue}
//               placeholder={`Enter ${editField.toLowerCase()}`}
//               multiline={editField.includes('description')}
//               numberOfLines={editField.includes('description') ? 4 : 1}
//             />
            
//             <View style={styles.modalActions}>
//               <TouchableOpacity 
//                 style={styles.cancelButton}
//                 onPress={() => setEditModalVisible(false)}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
//                 <Text style={styles.saveButtonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
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
//   headerButton: {
//     padding: 8,
//   },
//   content: {
//     flex: 1,
//   },
//   profileCard: {
//     backgroundColor: '#FFFFFF',
//     margin: 16,
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   profileHeader: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   avatarContainer: {
//     position: 'relative',
//     marginRight: 16,
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   editAvatarButton: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#10B981',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//   },
//   profileInfo: {
//     flex: 1,
//   },
//   businessNameRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   businessName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginRight: 8,
//   },
//   verifiedBadge: {
//     marginLeft: 4,
//   },
//   businessEmail: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 2,
//   },
//   businessAddress: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   joinDate: {
//     fontSize: 12,
//     color: '#9CA3AF',
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#F9FAFB',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//   },
//   statItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#10B981',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   statDivider: {
//     width: 1,
//     backgroundColor: '#E5E7EB',
//     marginHorizontal: 12,
//   },
//   quickActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   quickAction: {
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   quickActionText: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 4,
//   },
//   menuSection: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginBottom: 16,
//     borderRadius: 12,
//     padding: 4,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#111827',
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 12,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   menuItemLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   menuIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   menuContent: {
//     flex: 1,
//   },
//   menuTitleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 2,
//   },
//   menuTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//     flex: 1,
//   },
//   menuSubtitle: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   badge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 10,
//     marginLeft: 8,
//   },
//   badgeText: {
//     color: '#FFFFFF',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   insightsCard: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginBottom: 16,
//     borderRadius: 12,
//     padding: 16,
//   },
//   insightsList: {
//     marginTop: 8,
//   },
//   insightItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   insightText: {
//     fontSize: 14,
//     color: '#374151',
//     marginLeft: 12,
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginBottom: 16,
//     paddingVertical: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#FEE2E2',
//   },
//   logoutText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#EF4444',
//     marginLeft: 8,
//   },
//   footer: {
//     alignItems: 'center',
//     paddingVertical: 24,
//   },
//   footerText: {
//     fontSize: 12,
//     color: '#9CA3AF',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   modalContent: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 24,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   editInput: {
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     marginBottom: 20,
//     textAlignVertical: 'top',
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
//   saveButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//     backgroundColor: '#10B981',
//   },
//   saveButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
// });

// export default SellerProfileScreen;