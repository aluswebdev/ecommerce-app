// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   RefreshControl,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../../store/slices/productSlice';

// const BuyerSearchScreen = () => {
//   const dispatch = useDispatch();
//   const { items: products, categories, loading } = useSelector(state => state.products);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('popular');
//   const [showFilters, setShowFilters] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     handleSearch();
//   }, [searchQuery, selectedCategory, sortBy]);

//   const handleSearch = () => {
//     dispatch(fetchProducts({
//       search: searchQuery,
//       category: selectedCategory,
//       sortBy: sortBy,
//     }));
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await handleSearch();
//     setRefreshing(false);
//   };

//   const formatPrice = (price) => {
//     return `Le ${price.toLocaleString()}`;
//   };

//   const renderProduct = ({ item }) => (
//     <TouchableOpacity style={styles.productCard}>
//       <Image source={{ uri: item.images[0] }} style={styles.productImage} />
//       <View style={styles.productInfo}>
//         <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
//         <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
//         <View style={styles.productMeta}>
//           <View style={styles.rating}>
//             <MaterialIcons name="star" size={14} color="#F59E0B" />
//             <Text style={styles.ratingText}>{item.rating}</Text>
//           </View>
//           <Text style={styles.location}>{item.location}</Text>
//         </View>
//         <Text style={styles.sellerName}>{item.sellerName}</Text>
//       </View>
//       <TouchableOpacity style={styles.favoriteButton}>
//         <MaterialIcons name="favorite-border" size={20} color="#6B7280" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   const renderCategory = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.categoryChip,
//         selectedCategory === item.id && styles.categoryChipActive
//       ]}
//       onPress={() => setSelectedCategory(item.id)}
//     >
//       <MaterialIcons 
//         name={item.icon} 
//         size={16} 
//         color={selectedCategory === item.id ? '#FFFFFF' : '#6B7280'} 
//       />
//       <Text style={[
//         styles.categoryChipText,
//         selectedCategory === item.id && styles.categoryChipTextActive
//       ]}>
//         {item.name}
//       </Text>
//     </TouchableOpacity>
//   );

//   const sortOptions = [
//     { id: 'popular', name: 'Most Popular', icon: 'trending-up' },
//     { id: 'price-low', name: 'Price: Low to High', icon: 'arrow-upward' },
//     { id: 'price-high', name: 'Price: High to Low', icon: 'arrow-downward' },
//     { id: 'newest', name: 'Newest First', icon: 'schedule' },
//     { id: 'rating', name: 'Highest Rated', icon: 'star' },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Search Products</Text>
//         <TouchableOpacity
//           style={styles.filterButton}
//           onPress={() => setShowFilters(!showFilters)}
//         >
//           <MaterialIcons 
//             name="tune" 
//             size={24} 
//             color={showFilters ? '#1E40AF' : '#6B7280'} 
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <MaterialIcons name="search" size={20} color="#9CA3AF" />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search for products, brands, or sellers..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             returnKeyType="search"
//             onSubmitEditing={handleSearch}
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchQuery('')}>
//               <MaterialIcons name="clear" size={20} color="#9CA3AF" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {/* Categories */}
//       <View style={styles.categoriesSection}>
//         <FlatList
//           data={categories}
//           renderItem={renderCategory}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categoriesList}
//         />
//       </View>

//       {/* Filters */}
//       {showFilters && (
//         <View style={styles.filtersContainer}>
//           <Text style={styles.filtersTitle}>Sort by</Text>
//           <View style={styles.sortOptions}>
//             {sortOptions.map((option) => (
//               <TouchableOpacity
//                 key={option.id}
//                 style={[
//                   styles.sortOption,
//                   sortBy === option.id && styles.sortOptionActive
//                 ]}
//                 onPress={() => setSortBy(option.id)}
//               >
//                 <MaterialIcons 
//                   name={option.icon} 
//                   size={16} 
//                   color={sortBy === option.id ? '#1E40AF' : '#6B7280'} 
//                 />
//                 <Text style={[
//                   styles.sortOptionText,
//                   sortBy === option.id && styles.sortOptionTextActive
//                 ]}>
//                   {option.name}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       )}

//       {/* Results */}
//       <View style={styles.resultsHeader}>
//         <Text style={styles.resultsCount}>
//           {products.length} {products.length === 1 ? 'product' : 'products'} found
//         </Text>
//         {searchQuery.length > 0 && (
//           <Text style={styles.searchQuery}>for "{searchQuery}"</Text>
//         )}
//       </View>

//       {/* Products List */}
//       <FlatList
//         data={products}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         contentContainerStyle={styles.productsList}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={() => (
//           <View style={styles.emptyContainer}>
//             <MaterialIcons name="search-off" size={64} color="#E5E7EB" />
//             <Text style={styles.emptyTitle}>No products found</Text>
//             <Text style={styles.emptySubtitle}>
//               Try adjusting your search or filters
//             </Text>
//           </View>
//         )}
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
//   filterButton: {
//     padding: 8,
//   },
//   searchContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
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
//   categoriesSection: {
//     marginBottom: 8,
//   },
//   categoriesList: {
//     paddingHorizontal: 16,
//   },
//   categoryChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginRight: 8,
//     backgroundColor: '#F9FAFB',
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   categoryChipActive: {
//     backgroundColor: '#1E40AF',
//     borderColor: '#1E40AF',
//   },
//   categoryChipText: {
//     marginLeft: 6,
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#6B7280',
//   },
//   categoryChipTextActive: {
//     color: '#FFFFFF',
//   },
//   filtersContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#F9FAFB',
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   filtersTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 12,
//   },
//   sortOptions: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   sortOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   sortOptionActive: {
//     borderColor: '#1E40AF',
//     backgroundColor: '#EBF4FF',
//   },
//   sortOptionText: {
//     marginLeft: 6,
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   sortOptionTextActive: {
//     color: '#1E40AF',
//     fontWeight: '500',
//   },
//   resultsHeader: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   resultsCount: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   searchQuery: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   productsList: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   productCard: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//   },
//   productInfo: {
//     flex: 1,
//     padding: 12,
//   },
//   productName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 4,
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1E40AF',
//     marginBottom: 8,
//   },
//   productMeta: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   rating: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   ratingText: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginLeft: 4,
//   },
//   location: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   sellerName: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   favoriteButton: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     padding: 8,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 64,
//   },
//   emptyTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#374151',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptySubtitle: {
//     fontSize: 14,
//     color: '#6B7280',
//     textAlign: 'center',
//   },
// });

// export default BuyerSearchScreen;