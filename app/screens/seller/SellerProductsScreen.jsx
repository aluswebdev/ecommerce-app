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
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { useAuth } from '../../contexts/AuthContext';
// import { fetchProducts } from '../../store/slices/productSlice';

// const SellerProductsScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { user } = useAuth();
//   const { items: products, loading } = useSelector(state => state.products);
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [showFilters, setShowFilters] = useState(false);

//   // Mock seller products - replace with actual API call
//   const [sellerProducts] = useState([
//     {
//       id: '1',
//       name: 'Traditional Gele Headwrap',
//       description: 'Beautiful handwoven gele headwrap',
//       price: 75000,
//       images: ['https://images.unsplash.com/photo-1594736797933-d0b1b80d0b6e?w=300'],
//       category: 'fashion',
//       stock: 15,
//       status: 'active',
//       sales: 24,
//       views: 156,
//       rating: 4.8,
//       reviews: 12,
//       createdAt: '2024-01-15T00:00:00Z',
//       variants: [
//         { id: 'v1', name: 'Red & Gold', price: 75000, stock: 5 },
//         { id: 'v2', name: 'Blue & Silver', price: 80000, stock: 10 }
//       ]
//     },
//     {
//       id: '2',
//       name: 'Handmade Leather Bag',
//       description: 'Authentic leather handbag crafted by local artisans',
//       price: 150000,
//       images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300'],
//       category: 'fashion',
//       stock: 8,
//       status: 'active',
//       sales: 15,
//       views: 89,
//       rating: 4.7,
//       reviews: 8,
//       createdAt: '2024-01-12T00:00:00Z',
//       variants: [
//         { id: 'v3', name: 'Brown', price: 150000, stock: 4 },
//         { id: 'v4', name: 'Black', price: 160000, stock: 4 }
//       ]
//     },
//     {
//       id: '3',
//       name: 'Custom Embroidered Dress',
//       description: 'Traditional Sierra Leonean dress with custom embroidery',
//       price: 120000,
//       images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300'],
//       category: 'fashion',
//       stock: 0,
//       status: 'out_of_stock',
//       sales: 12,
//       views: 67,
//       rating: 4.9,
//       reviews: 5,
//       createdAt: '2024-01-10T00:00:00Z',
//       variants: []
//     }
//   ]);

//   useEffect(() => {
//     onRefresh();
//   }, []);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     // Mock API call to fetch seller's products
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1000);
//   };

//   const formatPrice = (price) => {
//     return `Le ${price.toLocaleString()}`;
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       active: '#10B981',
//       inactive: '#6B7280',
//       out_of_stock: '#EF4444',
//       pending: '#F59E0B',
//     };
//     return colors[status] || '#6B7280';
//   };

//   const getStatusText = (status) => {
//     const texts = {
//       active: 'Active',
//       inactive: 'Inactive',
//       out_of_stock: 'Out of Stock',
//       pending: 'Pending Review',
//     };
//     return texts[status] || status;
//   };

//   const handleProductAction = (product, action) => {
//     switch (action) {
//       case 'edit':
//         // Navigate to edit product screen
//         break;
//       case 'duplicate':
//         Alert.alert('Duplicate Product', `Create a copy of "${product.name}"?`, [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Duplicate', onPress: () => duplicateProduct(product) },
//         ]);
//         break;
//       case 'delete':
//         Alert.alert('Delete Product', `Are you sure you want to delete "${product.name}"?`, [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Delete', style: 'destructive', onPress: () => deleteProduct(product.id) },
//         ]);
//         break;
//       case 'toggle_status':
//         toggleProductStatus(product);
//         break;
//     }
//   };

//   const duplicateProduct = (product) => {
//     // Mock duplicate functionality
//     Alert.alert('Success', 'Product duplicated successfully!');
//   };

//   const deleteProduct = (productId) => {
//     // Mock delete functionality
//     Alert.alert('Success', 'Product deleted successfully!');
//   };

//   const toggleProductStatus = (product) => {
//     const newStatus = product.status === 'active' ? 'inactive' : 'active';
//     // Mock toggle functionality
//     Alert.alert('Success', `Product ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
//   };

//   const filterOptions = [
//     { id: 'all', name: 'All Products', count: sellerProducts.length },
//     { id: 'active', name: 'Active', count: sellerProducts.filter(p => p.status === 'active').length },
//     { id: 'inactive', name: 'Inactive', count: sellerProducts.filter(p => p.status === 'inactive').length },
//     { id: 'out_of_stock', name: 'Out of Stock', count: sellerProducts.filter(p => p.status === 'out_of_stock').length },
//     { id: 'low_stock', name: 'Low Stock', count: sellerProducts.filter(p => p.stock < 5 && p.stock > 0).length },
//   ];

//   const filteredProducts = sellerProducts.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesFilter = selectedFilter === 'all' || 
//                          (selectedFilter === 'low_stock' ? product.stock < 5 && product.stock > 0 : product.status === selectedFilter);
//     return matchesSearch && matchesFilter;
//   });

//   const renderProduct = ({ item }) => (
//     <TouchableOpacity style={styles.productCard}>
//       <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      
//       <View style={styles.productInfo}>
//         <View style={styles.productHeader}>
//           <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
//           <TouchableOpacity 
//             style={styles.moreButton}
//             onPress={() => showProductActions(item)}
//           >
//             <MaterialIcons name="more-vert" size={20} color="#6B7280" />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>

//         <View style={styles.productMeta}>
//           <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
//             <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
//           </View>
//           <Text style={styles.stockInfo}>Stock: {item.stock}</Text>
//         </View>

//         <View style={styles.productStats}>
//           <View style={styles.statItem}>
//             <MaterialIcons name="shopping-cart" size={16} color="#6B7280" />
//             <Text style={styles.statText}>{item.sales} sold</Text>
//           </View>
//           <View style={styles.statItem}>
//             <MaterialIcons name="visibility" size={16} color="#6B7280" />
//             <Text style={styles.statText}>{item.views} views</Text>
//           </View>
//           <View style={styles.statItem}>
//             <MaterialIcons name="star" size={16} color="#F59E0B" />
//             <Text style={styles.statText}>{item.rating} ({item.reviews})</Text>
//           </View>
//         </View>

//         <View style={styles.productActions}>
//           <TouchableOpacity 
//             style={styles.actionButton}
//             onPress={() => handleProductAction(item, 'edit')}
//           >
//             <MaterialIcons name="edit" size={16} color="#10B981" />
//             <Text style={[styles.actionText, { color: '#10B981' }]}>Edit</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={styles.actionButton}
//             onPress={() => handleProductAction(item, 'toggle_status')}
//           >
//             <MaterialIcons 
//               name={item.status === 'active' ? 'visibility-off' : 'visibility'} 
//               size={16} 
//               color="#3B82F6" 
//             />
//             <Text style={[styles.actionText, { color: '#3B82F6' }]}>
//               {item.status === 'active' ? 'Hide' : 'Show'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const showProductActions = (product) => {
//     Alert.alert(
//       product.name,
//       'Choose an action',
//       [
//         { text: 'Edit', onPress: () => handleProductAction(product, 'edit') },
//         { text: 'Duplicate', onPress: () => handleProductAction(product, 'duplicate') },
//         { text: 'Delete', style: 'destructive', onPress: () => handleProductAction(product, 'delete') },
//         { text: 'Cancel', style: 'cancel' },
//       ]
//     );
//   };

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
//         <Text style={styles.headerTitle}>My Products</Text>
//         <View style={styles.headerActions}>
//           <TouchableOpacity 
//             style={styles.headerButton}
//             onPress={() => setShowFilters(!showFilters)}
//           >
//             <MaterialIcons name="filter-list" size={24} color="#374151" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.addButton}>
//             <MaterialIcons name="add" size={24} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <MaterialIcons name="search" size={20} color="#9CA3AF" />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search products..."
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

//       {/* Products List */}
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
//               {searchQuery ? 'Try adjusting your search' : 'Start by adding your first product'}
//             </Text>
//             {!searchQuery && (
//               <TouchableOpacity style={styles.addFirstButton}>
//                 <Text style={styles.addFirstButtonText}>Add Product</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         )}
//       />
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
//     alignItems: 'center',
//   },
//   headerButton: {
//     padding: 8,
//     marginRight: 8,
//   },
//   addButton: {
//     backgroundColor: '#10B981',
//     padding: 8,
//     borderRadius: 8,
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
//     backgroundColor: '#F9FAFB',
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   activeFilterTab: {
//     backgroundColor: '#10B981',
//     borderColor: '#10B981',
//   },
//   filterTabText: {
//     fontSize: 14,
//     color: '#6B7280',
//     fontWeight: '500',
//   },
//   activeFilterTabText: {
//     color: '#FFFFFF',
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
//   },
//   productImage: {
//     width: '100%',
//     height: 120,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   productInfo: {
//     padding: 12,
//   },
//   productHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 4,
//   },
//   productName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111827',
//     flex: 1,
//     marginRight: 8,
//   },
//   moreButton: {
//     padding: 4,
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#10B981',
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
//     color: '#FFFFFF',
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   stockInfo: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   productStats: {
//     marginBottom: 8,
//   },
//   statItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   statText: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginLeft: 4,
//   },
//   productActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6',
//     paddingTop: 8,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 4,
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
//     marginBottom: 24,
//     lineHeight: 20,
//   },
//   addFirstButton: {
//     backgroundColor: '#10B981',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   addFirstButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });

// export default SellerProductsScreen;