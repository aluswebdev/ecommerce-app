// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   RefreshControl,
//   TextInput,
//   Modal,
//   Alert,
//   Switch,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons } from '@expo/vector-icons';

// const AdminUsersScreen = ({ navigation }) => {
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [detailsModalVisible, setDetailsModalVisible] = useState(false);
//   const [actionModalVisible, setActionModalVisible] = useState(false);

//   // Mock users data
//   const [users] = useState([
//     {
//       id: '1',
//       name: 'Aminata Kamara',
//       email: 'aminata@example.sl',
//       phone: '+232 78 234567',
//       role: 'seller',
//       avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100',
//       status: 'active',
//       verified: true,
//       joinDate: '2024-01-15',
//       lastActive: '2024-03-10',
//       stats: {
//         orders: 89,
//         products: 45,
//         revenue: 2850000,
//         rating: 4.8,
//         reviews: 67,
//       },
//       location: 'Freetown, Western Area',
//       businessName: 'Aminata Fashion House',
//     },
//     {
//       id: '2',
//       name: 'Mohamed Sesay',
//       email: 'mohamed@example.sl',
//       phone: '+232 76 123456',
//       role: 'buyer',
//       avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
//       status: 'active',
//       verified: true,
//       joinDate: '2024-02-01',
//       lastActive: '2024-03-12',
//       stats: {
//         orders: 23,
//         totalSpent: 1250000,
//         reviews: 12,
//       },
//       location: 'Bo, Southern Province',
//     },
//     {
//       id: '3',
//       name: 'Fatu Koroma',
//       email: 'fatu@example.sl',
//       phone: '+232 77 987654',
//       role: 'seller',
//       avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
//       status: 'pending',
//       verified: false,
//       joinDate: '2024-03-08',
//       lastActive: '2024-03-11',
//       stats: {
//         orders: 0,
//         products: 12,
//         revenue: 0,
//       },
//       location: 'Kenema, Eastern Province',
//       businessName: 'Kenema Crafts',
//     },
//     {
//       id: '4',
//       name: 'Ibrahim Bangura',
//       email: 'ibrahim@example.sl',
//       phone: '+232 78 555444',
//       role: 'buyer',
//       avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
//       status: 'suspended',
//       verified: true,
//       joinDate: '2024-01-20',
//       lastActive: '2024-03-01',
//       stats: {
//         orders: 8,
//         totalSpent: 450000,
//         reviews: 3,
//       },
//       location: 'Makeni, Northern Province',
//       suspensionReason: 'Multiple payment disputes',
//     },
//     {
//       id: '5',
//       name: 'Mariama Conteh',
//       email: 'mariama@example.sl',
//       phone: '+232 76 789012',
//       role: 'seller',
//       avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
//       status: 'active',
//       verified: true,
//       joinDate: '2023-12-10',
//       lastActive: '2024-03-12',
//       stats: {
//         orders: 156,
//         products: 78,
//         revenue: 4500000,
//         rating: 4.9,
//         reviews: 124,
//       },
//       location: 'Bo, Southern Province',
//       businessName: 'Bo Farms Cooperative',
//     },
//   ]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     // Mock API call
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1000);
//   };

//   const formatPrice = (price) => {
//     return `Le ${price.toLocaleString()}`;
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       active: '#10B981',
//       pending: '#F59E0B',
//       suspended: '#EF4444',
//       banned: '#991B1B',
//     };
//     return colors[status] || '#6B7280';
//   };

//   const getRoleBadgeColor = (role) => {
//     const colors = {
//       buyer: '#3B82F6',
//       seller: '#10B981',
//       admin: '#8B5CF6',
//     };
//     return colors[role] || '#6B7280';
//   };

//   const filterOptions = [
//     { id: 'all', name: 'All Users', count: users.length },
//     { id: 'buyer', name: 'Buyers', count: users.filter(u => u.role === 'buyer').length },
//     { id: 'seller', name: 'Sellers', count: users.filter(u => u.role === 'seller').length },
//     { id: 'active', name: 'Active', count: users.filter(u => u.status === 'active').length },
//     { id: 'pending', name: 'Pending', count: users.filter(u => u.status === 'pending').length },
//     { id: 'suspended', name: 'Suspended', count: users.filter(u => u.status === 'suspended').length },
//     { id: 'verified', name: 'Verified', count: users.filter(u => u.verified).length },
//   ];

//   const filteredUsers = users.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          (user.businessName && user.businessName.toLowerCase().includes(searchQuery.toLowerCase()));
    
//     const matchesFilter = selectedFilter === 'all' ||
//                          user.role === selectedFilter ||
//                          user.status === selectedFilter ||
//                          (selectedFilter === 'verified' && user.verified);
    
//     return matchesSearch && matchesFilter;
//   });

//   const handleUserAction = (user, action) => {
//     setSelectedUser(user);
//     setActionModalVisible(true);
//   };

//   const showUserDetails = (user) => {
//     setSelectedUser(user);
//     setDetailsModalVisible(true);
//   };

//   const performAction = (action) => {
//     Alert.alert('Confirm Action', `${action} user "${selectedUser.name}"?`, [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Confirm',
//         onPress: () => {
//           // Mock action
//           Alert.alert('Success', `User ${action.toLowerCase()} successfully!`);
//           setActionModalVisible(false);
//         },
//       },
//     ]);
//   };

//   const renderUser = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.userCard}
//       onPress={() => showUserDetails(item)}
//     >
//       <View style={styles.userHeader}>
//         <Image source={{ uri: item.avatar }} style={styles.avatar} />
        
//         <View style={styles.userInfo}>
//           <View style={styles.userNameRow}>
//             <Text style={styles.userName}>{item.name}</Text>
//             {item.verified && (
//               <MaterialIcons name="verified" size={16} color="#10B981" />
//             )}
//           </View>
          
//           <Text style={styles.userEmail}>{item.email}</Text>
          
//           <View style={styles.badgesRow}>
//             <View style={[styles.roleBadge, { backgroundColor: `${getRoleBadgeColor(item.role)}20` }]}>
//               <Text style={[styles.roleText, { color: getRoleBadgeColor(item.role) }]}>
//                 {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
//               </Text>
//             </View>
            
//             <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
//               <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
//                 {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//               </Text>
//             </View>
//           </View>
//         </View>

//         <TouchableOpacity 
//           style={styles.moreButton}
//           onPress={() => handleUserAction(item)}
//         >
//           <MaterialIcons name="more-vert" size={24} color="#6B7280" />
//         </TouchableOpacity>
//       </View>

//       {item.businessName && (
//         <View style={styles.businessInfo}>
//           <MaterialIcons name="business" size={14} color="#6B7280" />
//           <Text style={styles.businessName}>{item.businessName}</Text>
//         </View>
//       )}

//       <View style={styles.userMeta}>
//         <View style={styles.metaItem}>
//           <MaterialIcons name="location-on" size={14} color="#6B7280" />
//           <Text style={styles.metaText}>{item.location}</Text>
//         </View>
//         <View style={styles.metaItem}>
//           <MaterialIcons name="event" size={14} color="#6B7280" />
//           <Text style={styles.metaText}>Joined {formatDate(item.joinDate)}</Text>
//         </View>
//       </View>

//       {/* User Stats */}
//       <View style={styles.statsRow}>
//         {item.role === 'seller' ? (
//           <>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{item.stats.products}</Text>
//               <Text style={styles.statLabel}>Products</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{item.stats.orders}</Text>
//               <Text style={styles.statLabel}>Orders</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{formatPrice(item.stats.revenue)}</Text>
//               <Text style={styles.statLabel}>Revenue</Text>
//             </View>
//             {item.stats.rating && (
//               <View style={styles.statItem}>
//                 <Text style={styles.statValue}>{item.stats.rating}</Text>
//                 <Text style={styles.statLabel}>Rating</Text>
//               </View>
//             )}
//           </>
//         ) : (
//           <>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{item.stats.orders}</Text>
//               <Text style={styles.statLabel}>Orders</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{formatPrice(item.stats.totalSpent)}</Text>
//               <Text style={styles.statLabel}>Total Spent</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{item.stats.reviews}</Text>
//               <Text style={styles.statLabel}>Reviews</Text>
//             </View>
//           </>
//         )}
//       </View>
//     </TouchableOpacity>
//   );

//   const renderFilterTab = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.filterTab,
//         selectedFilter === item.id && styles.activeFilterTab
//       ]}
//       onPress={() => setSelectedFilter(item.id)}
//     >
//       <Text style={[
//         styles.filterTabText,
//         selectedFilter === item.id && styles.activeFilterTabText
//       ]}>
//         {item.name} ({item.count})
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>User Management</Text>
//         <View style={styles.headerActions}>
//           <TouchableOpacity style={styles.headerButton}>
//             <MaterialIcons name="file-download" size={24} color="#374151" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerButton}>
//             <MaterialIcons name="filter-list" size={24} color="#374151" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <MaterialIcons name="search" size={20} color="#9CA3AF" />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search users by name, email, or business..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchQuery('')}>
//               <MaterialIcons name="clear" size={20} color="#9CA3AF" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {/* Filter Tabs */}
//       <View style={styles.filtersContainer}>
//         <FlatList
//           data={filterOptions}
//           renderItem={renderFilterTab}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.filtersList}
//         />
//       </View>

//       {/* Summary Stats */}
//       <View style={styles.summaryContainer}>
//         <View style={styles.summaryItem}>
//           <MaterialIcons name="people" size={20} color="#8B5CF6" />
//           <Text style={styles.summaryValue}>{users.length}</Text>
//           <Text style={styles.summaryLabel}>Total Users</Text>
//         </View>
//         <View style={styles.summaryItem}>
//           <MaterialIcons name="verified-user" size={20} color="#10B981" />
//           <Text style={styles.summaryValue}>{users.filter(u => u.verified).length}</Text>
//           <Text style={styles.summaryLabel}>Verified</Text>
//         </View>
//         <View style={styles.summaryItem}>
//           <MaterialIcons name="pending" size={20} color="#F59E0B" />
//           <Text style={styles.summaryValue}>{users.filter(u => u.status === 'pending').length}</Text>
//           <Text style={styles.summaryLabel}>Pending</Text>
//         </View>
//         <View style={styles.summaryItem}>
//           <MaterialIcons name="block" size={20} color="#EF4444" />
//           <Text style={styles.summaryValue}>{users.filter(u => u.status === 'suspended').length}</Text>
//           <Text style={styles.summaryLabel}>Suspended</Text>
//         </View>
//       </View>

//       {/* Users List */}
//       <FlatList
//         data={filteredUsers}
//         renderItem={renderUser}
//         keyExtractor={(item) => item.id}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         contentContainerStyle={styles.usersList}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={() => (
//           <View style={styles.emptyContainer}>
//             <MaterialIcons name="people-outline" size={80} color="#E5E7EB" />
//             <Text style={styles.emptyTitle}>No users found</Text>
//             <Text style={styles.emptySubtitle}>
//               {searchQuery ? 'Try adjusting your search' : 'No users match the selected filter'}
//             </Text>
//           </View>
//         )}
//       />

//       {/* User Details Modal */}
//       <Modal
//         visible={detailsModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setDetailsModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>User Details</Text>
//               <TouchableOpacity onPress={() => setDetailsModalVisible(false)}>
//                 <MaterialIcons name="close" size={24} color="#6B7280" />
//               </TouchableOpacity>
//             </View>

//             {selectedUser && (
//               <View style={styles.detailsContent}>
//                 <View style={styles.detailsHeader}>
//                   <Image source={{ uri: selectedUser.avatar }} style={styles.detailsAvatar} />
//                   <View style={styles.detailsInfo}>
//                     <View style={styles.detailsNameRow}>
//                       <Text style={styles.detailsName}>{selectedUser.name}</Text>
//                       {selectedUser.verified && (
//                         <MaterialIcons name="verified" size={20} color="#10B981" />
//                       )}
//                     </View>
//                     <Text style={styles.detailsEmail}>{selectedUser.email}</Text>
//                     <Text style={styles.detailsPhone}>{selectedUser.phone}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.detailsSection}>
//                   <Text style={styles.detailsSectionTitle}>Account Information</Text>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>User ID:</Text>
//                     <Text style={styles.detailValue}>{selectedUser.id}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Role:</Text>
//                     <Text style={styles.detailValue}>
//                       {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
//                     </Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Status:</Text>
//                     <Text style={[styles.detailValue, { color: getStatusColor(selectedUser.status) }]}>
//                       {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
//                     </Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Join Date:</Text>
//                     <Text style={styles.detailValue}>{formatDate(selectedUser.joinDate)}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Last Active:</Text>
//                     <Text style={styles.detailValue}>{formatDate(selectedUser.lastActive)}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Location:</Text>
//                     <Text style={styles.detailValue}>{selectedUser.location}</Text>
//                   </View>
//                 </View>

//                 {selectedUser.businessName && (
//                   <View style={styles.detailsSection}>
//                     <Text style={styles.detailsSectionTitle}>Business Information</Text>
//                     <View style={styles.detailRow}>
//                       <Text style={styles.detailLabel}>Business Name:</Text>
//                       <Text style={styles.detailValue}>{selectedUser.businessName}</Text>
//                     </View>
//                   </View>
//                 )}

//                 {selectedUser.suspensionReason && (
//                   <View style={[styles.detailsSection, { backgroundColor: '#FEE2E2', borderRadius: 8, padding: 12 }]}>
//                     <Text style={[styles.detailsSectionTitle, { color: '#991B1B' }]}>Suspension Reason</Text>
//                     <Text style={[styles.detailValue, { color: '#DC2626' }]}>
//                       {selectedUser.suspensionReason}
//                     </Text>
//                   </View>
//                 )}

//                 <View style={styles.modalActions}>
//                   <TouchableOpacity 
//                     style={styles.actionBtn}
//                     onPress={() => {
//                       setDetailsModalVisible(false);
//                       setActionModalVisible(true);
//                     }}
//                   >
//                     <MaterialIcons name="edit" size={20} color="#8B5CF6" />
//                     <Text style={[styles.actionBtnText, { color: '#8B5CF6' }]}>Edit User</Text>
//                   </TouchableOpacity>
                  
//                   <TouchableOpacity style={styles.actionBtn}>
//                     <MaterialIcons name="email" size={20} color="#3B82F6" />
//                     <Text style={[styles.actionBtnText, { color: '#3B82F6' }]}>Send Email</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//           </View>
//         </View>
//       </Modal>

//       {/* Action Modal */}
//       <Modal
//         visible={actionModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setActionModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.actionModalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>User Actions</Text>
//               <TouchableOpacity onPress={() => setActionModalVisible(false)}>
//                 <MaterialIcons name="close" size={24} color="#6B7280" />
//               </TouchableOpacity>
//             </View>

//             {selectedUser && (
//               <View style={styles.actionsList}>
//                 {selectedUser.status !== 'active' && (
//                   <TouchableOpacity 
//                     style={styles.actionItem}
//                     onPress={() => performAction('Activate')}
//                   >
//                     <MaterialIcons name="check-circle" size={24} color="#10B981" />
//                     <Text style={styles.actionItemText}>Activate User</Text>
//                   </TouchableOpacity>
//                 )}

//                 {selectedUser.status === 'active' && (
//                   <TouchableOpacity 
//                     style={styles.actionItem}
//                     onPress={() => performAction('Suspend')}
//                   >
//                     <MaterialIcons name="block" size={24} color="#F59E0B" />
//                     <Text style={styles.actionItemText}>Suspend User</Text>
//                   </TouchableOpacity>
//                 )}

//                 {!selectedUser.verified && selectedUser.role === 'seller' && (
//                   <TouchableOpacity 
//                     style={styles.actionItem}
//                     onPress={() => performAction('Verify')}
//                   >
//                     <MaterialIcons name="verified" size={24} color="#3B82F6" />
//                     <Text style={styles.actionItemText}>Verify Seller</Text>
//                   </TouchableOpacity>
//                 )}

//                 <TouchableOpacity 
//                   style={styles.actionItem}
//                   onPress={() => performAction('Reset Password')}
//                 >
//                   <MaterialIcons name="lock-reset" size={24} color="#6B7280" />
//                   <Text style={styles.actionItemText}>Reset Password</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity 
//                   style={styles.actionItem}
//                   onPress={() => performAction('View Activity')}
//                 >
//                   <MaterialIcons name="timeline" size={24} color="#8B5CF6" />
//                   <Text style={styles.actionItemText}>View Activity Log</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity 
//                   style={[styles.actionItem, { borderTopWidth: 1, borderTopColor: '#F3F4F6', marginTop: 8, paddingTop: 16 }]}
//                   onPress={() => performAction('Delete')}
//                 >
//                   <MaterialIcons name="delete" size={24} color="#EF4444" />
//                   <Text style={[styles.actionItemText, { color: '#EF4444' }]}>Delete User</Text>
//                 </TouchableOpacity>
//               </View>
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
//   searchContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#FFFFFF',
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#F9FAFB',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: '#111827',
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
//   filterTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 8,
//     borderRadius: 20,
//     backgroundColor: '#F9FAFB',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   activeFilterTab: {
//     backgroundColor: '#8B5CF6',
//     borderColor: '#8B5CF6',
//   },
//   filterTabText: {
//     fontSize: 14,
//     color: '#6B7280',
//     fontWeight: '500',
//   },
//   activeFilterTabText: {
//     color: '#FFFFFF',
//   },
//   summaryContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   summaryItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   summaryValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginTop: 4,
//   },
//   summaryLabel: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   usersList: {
//     padding: 16,
//   },
//   userCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   userHeader: {
//     flexDirection: 'row',
//     marginBottom: 12,
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 12,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   userNameRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginRight: 6,
//   },
//   userEmail: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 6,
//   },
//   badgesRow: {
//     flexDirection: 'row',
//     gap: 6,
//   },
//   roleBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 10,
//   },
//   roleText: {
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 10,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   moreButton: {
//     padding: 4,
//   },
//   businessInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     paddingVertical: 6,
//     paddingHorizontal: 8,
//     backgroundColor: '#F0FDF4',
//     borderRadius: 6,
//   },
//   businessName: {
//     fontSize: 14,
//     color: '#059669',
//     marginLeft: 6,
//     fontWeight: '500',
//   },
//   userMeta: {
//     marginBottom: 12,
//   },
//   metaItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   metaText: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginLeft: 6,
//   },
//   statsRow: {
//     flexDirection: 'row',
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6',
//     paddingTop: 12,
//   },
//   statItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   statValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#8B5CF6',
//     marginBottom: 2,
//   },
//   statLabel: {
//     fontSize: 10,
//     color: '#6B7280',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 64,
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
//     maxHeight: '90%',
//   },
//   actionModalContent: {
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 24,
//     maxHeight: '60%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   detailsContent: {
//     flex: 1,
//   },
//   detailsHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   detailsAvatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginRight: 16,
//   },
//   detailsInfo: {
//     flex: 1,
//   },
//   detailsNameRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   detailsName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginRight: 8,
//   },
//   detailsEmail: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 2,
//   },
//   detailsPhone: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   detailsSection: {
//     marginBottom: 20,
//   },
//   detailsSectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 12,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   detailLabel: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   detailValue: {
//     fontSize: 14,
//     color: '#111827',
//     fontWeight: '500',
//   },
//   modalActions: {
//     flexDirection: 'row',
//     gap: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6',
//     paddingTop: 16,
//   },
//   actionBtn: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   actionBtnText: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginLeft: 6,
//   },
//   actionsList: {
//     marginTop: 8,
//   },
//   actionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     marginBottom: 8,
//     backgroundColor: '#F9FAFB',
//   },
//   actionItemText: {
//     fontSize: 16,
//     color: '#111827',
//     marginLeft: 16,
//     fontWeight: '500',
//   },
// });

// export default AdminUsersScreen;