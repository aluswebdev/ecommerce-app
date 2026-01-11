// import React, { useState } from 'react';
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
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons } from '@expo/vector-icons';

// const AdminProductsScreen = ({ navigation }) => {
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [detailsModalVisible, setDetailsModalVisible] = useState(false);
//   const [moderationModalVisible, setModerationModalVisible] = useState(false);

//   // Mock products data with moderation status
//   const [products] = useState([
//     {
//       id: '1',
//       name: 'Traditional Gele Headwrap',
//       seller: 'Aminata Fashion House',
//       sellerId: '1',
//       price: 75000,
//       images: ['https://images.unsplash.com/photo-1594736797933-d0b1b80d0b6e?w=300'],
//       category: 'fashion',
//       stock: 15,
//       status: 'approved',
//       sales: 24,
//       views: 156,
//       rating: 4.8,
//       reviews: 12,
//       listedDate: '2024-01-15',
//       flags: 0,
//     },
//     {
//       id: '2',
//       name: 'Handmade Leather Bag',
//       seller: 'Kenema Leather Works',
//       sellerId: '3',
//       price: 150000,
//       images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300'],
//       category: 'fashion',
//       stock: 8,
//       status: 'approved',
//       sales: 15,
//       views: 89,
//       rating: 4.7,
//       reviews: 8,
//       listedDate: '2024-01-12',
//       flags: 0,
//     },
//     {
//       id: '3',
//       name: 'Suspicious Product Listing',
//       seller: 'Unknown Seller',
//       sellerId: '10',
//       price: 25000,
//       images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'],
//       category: 'electronics',
//       stock: 100,
//       status: 'flagged',
//       sales: 0,
//       views: 5,
//       rating: 0,
//       reviews: 0,
//       listedDate: '2024-03-10',
//       flags: 3,
//       flagReasons: ['Counterfeit', 'Misleading description', 'Inappropriate images'],
//     },
//     {
//       id: '4',
//       name: 'Fresh Cassava - 25kg Bag',
//       seller: 'Bo Farms Cooperative',
//       sellerId: '5',
//       price: 35000,
//       images: ['https://images.unsplash.com/photo-1518843875459-f738682238a6?w=300'],
//       category: 'food',
//       stock: 50,
//       status: 'pending',
//       sales: 0,
//       views: 12,
//       rating: 0,
//       reviews: 0,
//       listedDate: '2024-03-11',
//       flags: 0,
//     },
//     {
//       id: '5',
//       name: 'Palm Oil - Pure Quality',
//       seller: 'Bo Farms Cooperative',
//       sellerId: '5',
//       price: 45000,
//       images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300'],
//       category: 'food',
//       stock: 30,
//       status: 'approved',
//       sales: 67,
//       views: 234,
//       rating: 4.9,
//       reviews: 45,
//       listedDate: '2024-01-05',
//       flags: 0,
//     },
//   ]);

//   const onRefresh = async () => {
//     setRefreshing(true);
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
//       approved: '#10B981',
//       pending: '#F59E0B',
//       flagged: '#EF4444',
//       rejected: '#991B1B',
//     };
//     return colors[status] || '#6B7280';
//   };

//   const filterOptions = [
//     { id: 'all', name: 'All Products', count: products.length },
//     { id: 'approved', name: 'Approved', count: products.filter(p => p.status === 'approved').length },
//     { id: 'pending', name: 'Pending Review', count: products.filter(p => p.status === 'pending').length },
//     { id: 'flagged', name: 'Flagged', count: products.filter(p => p.status === 'flagged').length },
//     { id: 'low_stock', name: 'Low Stock', count: products.filter(p => p.stock < 10).length },
//   ];

//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    
//     const matchesFilter = selectedFilter === 'all' ||
//                          product.status === selectedFilter ||
//                          (selectedFilter === 'low_stock' && product.stock < 10);
    
//     return matchesSearch && matchesFilter;
//   });

//   const handleProductAction = (product, action) => {
//     setSelectedProduct(product);
    
//     switch (action) {
//       case 'approve':
//         Alert.alert('Approve Product', `Approve "${product.name}"?`, [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Approve', onPress: () => performAction('approved') },
//         ]);
//         break;
//       case 'reject':
//         setModerationModalVisible(true);
//         break;
//       case 'remove':
//         Alert.alert('Remove Product', `Remove "${product.name}" from platform?`, [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Remove', style: 'destructive', onPress: () => performAction('removed') },
//         ]);
//         break;
//       case 'details':
//         setDetailsModalVisible(true);
//         break;
//     }
//   };

//   const performAction = (newStatus) => {
//     Alert.alert('Success', `Product ${newStatus} successfully!`);
//     setModerationModalVisible(false);
//     setDetailsModalVisible(false);
//   };

//   const renderProduct = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.productCard}
//       onPress={() => handleProductAction(item, 'details')}
//     >
//       <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      
//       {item.flags > 0 && (
//         <View style={styles.flagBadge}>
//           <MaterialIcons name="flag" size={12} color="#FFFFFF" />
//           <Text style={styles.flagCount}>{item.flags}</Text>
//         </View>
//       )}

//       <View style={styles.productInfo}>
//         <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
//         <Text style={styles.sellerName} numberOfLines={1}>{item.seller}</Text>
//         <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>

//         <View style={styles.productMeta}>
//           <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
//             <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
//               {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//             </Text>
//           </View>
//           <Text style={styles.stockInfo}>Stock: {item.stock}</Text>
//         </View>

//         <View style={styles.productStats}>
//           <View style={styles.statItem}>
//             <MaterialIcons name="shopping-cart" size={12} color="#6B7280" />
//             <Text style={styles.statText}>{item.sales}</Text>
//           </View>
//           <View style={styles.statItem}>
//             <MaterialIcons name="visibility" size={12} color="#6B7280" />
//             <Text style={styles.statText}>{item.views}</Text>
//           </View>
//           {item.rating > 0 && (
//             <View style={styles.statItem}>
//               <MaterialIcons name="star" size={12} color="#F59E0B" />
//               <Text style={styles.statText}>{item.rating}</Text>
//             </View>
//           )}
//         </View>

//         {item.status === 'pending' && (
//           <View style={styles.quickActions}>
//             <TouchableOpacity 
//               style={[styles.quickActionButton, { backgroundColor: '#DCFCE7' }]}
//               onPress={() => handleProductAction(item, 'approve')}
//             >
//               <MaterialIcons name="check" size={16} color="#16A34A" />
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={[styles.quickActionButton, { backgroundColor: '#FEE2E2' }]}
//               onPress={() => handleProductAction(item, 'reject')}
//             >
//               <MaterialIcons name="close" size={16} color="#DC2626" />
//             </TouchableOpacity>
//           </View>
//         )}

//         {item.status === 'flagged' && (
//           <TouchableOpacity 
//             style={styles.reviewButton}
//             onPress={() => handleProductAction(item, 'details')}
//           >
//             <Text style={styles.reviewButtonText}>Review Flags</Text>
//           </TouchableOpacity>
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
//         <Text style={styles.headerTitle}>Product Management</Text>
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
//             placeholder="Search products or sellers..."
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
//           <MaterialIcons name="inventory" size={20} color="#8B5CF6" />
//           <Text style={styles.summaryValue}>{products.length}</Text>
//           <Text style={styles.summaryLabel}>Total</Text>
//         </View>
//         <View style={styles.summaryItem}>
//           <MaterialIcons name="pending-actions" size={20} color="#F59E0B" />
//           <Text style={styles.summaryValue}>{products.filter(p => p.status === 'pending').length}</Text>
//           <Text style={styles.summaryLabel}>Pending</Text>
//         </View>
//         <View style={styles.summaryItem}>
//           <MaterialIcons name="flag" size={20} color="#EF4444" />
//           <Text style={styles.summaryValue}>{products.filter(p => p.flags > 0).length}</Text>
//           <Text style={styles.summaryLabel}>Flagged</Text>
//         </View>
//         <View style={styles.summaryItem}>
//           <MaterialIcons name="warning" size={20} color="#F59E0B" />
//           <Text style={styles.summaryValue}>{products.filter(p => p.stock < 10).length}</Text>
//           <Text style={styles.summaryLabel}>Low Stock</Text>
//         </View>
//       </View>

//       {/* Products Grid */}
//       <FlatList
//         data={filteredProducts}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         contentContainerStyle={styles.productsList}
//         showsVerticalScrollIndicator={false}
//         numColumns={2}
//         columnWrapperStyle={styles.productRow}
//         ListEmptyComponent={() => (
//           <View style={styles.emptyContainer}>
//             <MaterialIcons name="inventory-2" size={80} color="#E5E7EB" />
//             <Text style={styles.emptyTitle}>No products found</Text>
//             <Text style={styles.emptySubtitle}>
//               {searchQuery ? 'Try adjusting your search' : 'No products match the selected filter'}
//             </Text>
//           </View>
//         )}
//       />

//       {/* Product Details Modal */}
//       <Modal
//         visible={detailsModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setDetailsModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Product Details</Text>
//               <TouchableOpacity onPress={() => setDetailsModalVisible(false)}>
//                 <MaterialIcons name="close" size={24} color="#6B7280" />
//               </TouchableOpacity>
//             </View>

//             {selectedProduct && (
//               <View style={styles.detailsContent}>
//                 <Image source={{ uri: selectedProduct.images[0] }} style={styles.detailsImage} />
                
//                 <Text style={styles.detailsProductName}>{selectedProduct.name}</Text>
//                 <Text style={styles.detailsPrice}>{formatPrice(selectedProduct.price)}</Text>

//                 <View style={styles.detailsSection}>
//                   <Text style={styles.detailsSectionTitle}>Product Information</Text>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Product ID:</Text>
//                     <Text style={styles.detailValue}>{selectedProduct.id}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Category:</Text>
//                     <Text style={styles.detailValue}>{selectedProduct.category}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Stock:</Text>
//                     <Text style={styles.detailValue}>{selectedProduct.stock} units</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Listed Date:</Text>
//                     <Text style={styles.detailValue}>{formatDate(selectedProduct.listedDate)}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Status:</Text>
//                     <Text style={[styles.detailValue, { color: getStatusColor(selectedProduct.status) }]}>
//                       {selectedProduct.status.charAt(0).toUpperCase() + selectedProduct.status.slice(1)}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={styles.detailsSection}>
//                   <Text style={styles.detailsSectionTitle}>Seller Information</Text>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Seller:</Text>
//                     <Text style={styles.detailValue}>{selectedProduct.seller}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Seller ID:</Text>
//                     <Text style={styles.detailValue}>{selectedProduct.sellerId}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.detailsSection}>
//                   <Text style={styles.detailsSectionTitle}>Performance</Text>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Total Sales:</Text>
//                     <Text style={styles.detailValue}>{selectedProduct.sales}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Views:</Text>
//                     <Text style={styles.detailValue}>{selectedProduct.views}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Rating:</Text>
//                     <Text style={styles.detailValue}>
//                       {selectedProduct.rating > 0 ? `${selectedProduct.rating} (${selectedProduct.reviews} reviews)` : 'No ratings yet'}
//                     </Text>
//                   </View>
//                 </View>

//                 {selectedProduct.flagReasons && selectedProduct.flagReasons.length > 0 && (
//                   <View style={[styles.detailsSection, { backgroundColor: '#FEE2E2', padding: 12, borderRadius: 8 }]}>
//                     <Text style={[styles.detailsSectionTitle, { color: '#991B1B' }]}>
//                       Flag Reasons ({selectedProduct.flags})
//                     </Text>
//                     {selectedProduct.flagReasons.map((reason, index) => (
//                       <View key={index} style={styles.flagReasonItem}>
//                         <MaterialIcons name="error" size={16} color="#DC2626" />
//                         <Text style={styles.flagReasonText}>{reason}</Text>
//                       </View>
//                     ))}
//                   </View>
//                 )}

//                 <View style={styles.modalActions}>
//                   {selectedProduct.status === 'pending' || selectedProduct.status === 'flagged' ? (
//                     <>
//                       <TouchableOpacity 
//                         style={[styles.modalActionButton, { backgroundColor: '#10B981' }]}
//                         onPress={() => handleProductAction(selectedProduct, 'approve')}
//                       >
//                         <Text style={styles.modalActionButtonText}>Approve</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity 
//                         style={[styles.modalActionButton, { backgroundColor: '#EF4444' }]}
//                         onPress={() => handleProductAction(selectedProduct, 'reject')}
//                       >
//                         <Text style={styles.modalActionButtonText}>Reject</Text>
//                       </TouchableOpacity>
//                     </>
//                   ) : (
//                     <TouchableOpacity 
//                       style={[styles.modalActionButton, { backgroundColor: '#EF4444', flex: 1 }]}
//                       onPress={() => handleProductAction(selectedProduct, 'remove')}
//                     >
//                       <Text style={styles.modalActionButtonText}>Remove Product</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </View>
//             )}
//           </View>
//         </View>
//       </Modal>

//       {/* Moderation Modal */}
//       <Modal
//         visible={moderationModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModerationModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.moderationModal}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Reject Product</Text>
//               <TouchableOpacity onPress={() => setModerationModalVisible(false)}>
//                 <MaterialIcons name="close" size={24} color="#6B7280" />
//               </TouchableOpacity>
//             </View>

//             {selectedProduct && (
//               <>
//                 <Text style={styles.modalSubtitle}>
//                   Product: {selectedProduct.name}
//                 </Text>

//                 <View style={styles.reasonsList}>
//                   <Text style={styles.reasonsTitle}>Select rejection reason:</Text>
                  
//                   {[
//                     'Counterfeit Product',
//                     'Prohibited Item',
//                     'Misleading Description',
//                     'Inappropriate Images',
//                     'Policy Violation',
//                     'Quality Issues',
//                     'Other',
//                   ].map((reason, index) => (
//                     <TouchableOpacity key={index} style={styles.reasonItem}>
//                       <MaterialIcons name="radio-button-unchecked" size={20} color="#6B7280" />
//                       <Text style={styles.reasonText}>{reason}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>

//                 <TextInput
//                   style={styles.notesInput}
//                   placeholder="Additional notes for seller..."
//                   multiline
//                   numberOfLines={4}
//                   textAlignVertical="top"
//                 />

//                 <View style={styles.modalActions}>
//                   <TouchableOpacity 
//                     style={[styles.modalActionButton, { backgroundColor: '#E5E7EB' }]}
//                     onPress={() => setModerationModalVisible(false)}
//                   >
//                     <Text style={[styles.modalActionButtonText, { color: '#6B7280' }]}>Cancel</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity 
//                     style={[styles.modalActionButton, { backgroundColor: '#EF4444' }]}
//                     onPress={() => performAction('rejected')}
//                   >
//                     <Text style={styles.modalActionButtonText}>Reject Product</Text>
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
//   productsList: {
//     padding: 8,
//   },
//   productRow: {
//     justifyContent: 'space-between',
//     paddingHorizontal: 8,
//   },
//   productCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     marginHorizontal: 8,
//     marginVertical: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     width: '45%',
//     position: 'relative',
//   },
//   productImage: {
//     width: '100%',
//     height: 120,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   flagBadge: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: '#EF4444',
//     borderRadius: 12,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   flagCount: {
//     color: '#FFFFFF',
//     fontSize: 10,
//     fontWeight: 'bold',
//     marginLeft: 2,
//   },
//   productInfo: {
//     padding: 12,
//   },
//   productName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 4,
//   },
//   sellerName: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#8B5CF6',
//     marginBottom: 8,
//   },
//   productMeta: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   statusBadge: {
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 10,
//   },
//   statusText: {
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   stockInfo: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   productStats: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   statItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   statText: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginLeft: 4,
//   },
//   quickActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   quickActionButton: {
//     flex: 1,
//     padding: 8,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginHorizontal: 4,
//   },
//   reviewButton: {
//     backgroundColor: '#FEF3C7',
//     padding: 8,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   reviewButtonText: {
//     fontSize: 12,
//     color: '#D97706',
//     fontWeight: '600',
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
//   moderationModal: {
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
//   modalSubtitle: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 16,
//   },
//   detailsContent: {
//     flex: 1,
//   },
//   detailsImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 12,
//     marginBottom: 16,
//   },
//   detailsProductName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 8,
//   },
//   detailsPrice: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#8B5CF6',
//     marginBottom: 16,
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
//   flagReasonItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 4,
//   },
//   flagReasonText: {
//     fontSize: 14,
//     color: '#DC2626',
//     marginLeft: 8,
//   },
//   modalActions: {
//     flexDirection: 'row',
//     gap: 12,
//     marginTop: 16,
//   },
//   modalActionButton: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   modalActionButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   reasonsList: {
//     marginBottom: 16,
//   },
//   reasonsTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 12,
//   },
//   reasonItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 12,
//     backgroundColor: '#F9FAFB',
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   reasonText: {
//     fontSize: 14,
//     color: '#111827',
//     marginLeft: 12,
//   },
//   notesInput: {
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 14,
//     marginBottom: 16,
//     height: 80,
//   },
// });

// export default AdminProductsScreen;