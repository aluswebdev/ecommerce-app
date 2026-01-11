// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useCart } from '../../contexts/CartContext';

// const BuyerCartScreen = ({ navigation }) => {
//   const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
//   const [selectedItems, setSelectedItems] = useState(new Set());

//   const formatPrice = (price) => {
//     return `Le ${price.toLocaleString()}`;
//   };

//   const handleSelectItem = (itemId) => {
//     const newSelected = new Set(selectedItems);
//     if (newSelected.has(itemId)) {
//       newSelected.delete(itemId);
//     } else {
//       newSelected.add(itemId);
//     }
//     setSelectedItems(newSelected);
//   };

//   const handleSelectAll = () => {
//     if (selectedItems.size === cartItems.length) {
//       setSelectedItems(new Set());
//     } else {
//       setSelectedItems(new Set(cartItems.map(item => item.id)));
//     }
//   };

//   const handleRemoveSelected = () => {
//     Alert.alert(
//       'Remove Items',
//       `Remove ${selectedItems.size} selected ${selectedItems.size === 1 ? 'item' : 'items'} from cart?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Remove',
//           style: 'destructive',
//           onPress: () => {
//             selectedItems.forEach(itemId => removeFromCart(itemId));
//             setSelectedItems(new Set());
//           },
//         },
//       ]
//     );
//   };

//   const getSelectedTotal = () => {
//     return cartItems
//       .filter(item => selectedItems.has(item.id))
//       .reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const handleCheckout = () => {
//     if (selectedItems.size === 0) {
//       Alert.alert('No Items Selected', 'Please select items to checkout');
//       return;
//     }
    
//     const selectedCartItems = cartItems.filter(item => selectedItems.has(item.id));
//     // Navigate to checkout with selected items
//     // navigation.navigate('Checkout', { items: selectedCartItems });
//   };

//   const renderCartItem = ({ item }) => {
//     const isSelected = selectedItems.has(item.id);
    
//     return (
//       <View style={styles.cartItem}>
//         <TouchableOpacity
//           style={styles.checkbox}
//           onPress={() => handleSelectItem(item.id)}
//         >
//           <MaterialIcons
//             name={isSelected ? "check-box" : "check-box-outline-blank"}
//             size={24}
//             color={isSelected ? "#1E40AF" : "#9CA3AF"}
//           />
//         </TouchableOpacity>

//         <Image source={{ uri: item.product.images[0] }} style={styles.itemImage} />

//         <View style={styles.itemInfo}>
//           <Text style={styles.itemName} numberOfLines={2}>
//             {item.product.name}
//           </Text>
//           {item.variant && (
//             <Text style={styles.itemVariant}>{item.variant.name}</Text>
//           )}
//           <Text style={styles.itemSeller}>{item.product.sellerName}</Text>
//           <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
//         </View>

//         <View style={styles.itemActions}>
//           <View style={styles.quantityContainer}>
//             <TouchableOpacity
//               style={styles.quantityButton}
//               onPress={() => updateQuantity(item.id, item.quantity - 1)}
//             >
//               <MaterialIcons name="remove" size={16} color="#6B7280" />
//             </TouchableOpacity>
            
//             <Text style={styles.quantity}>{item.quantity}</Text>
            
//             <TouchableOpacity
//               style={styles.quantityButton}
//               onPress={() => updateQuantity(item.id, item.quantity + 1)}
//             >
//               <MaterialIcons name="add" size={16} color="#6B7280" />
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity
//             style={styles.removeButton}
//             onPress={() => removeFromCart(item.id)}
//           >
//             <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   const renderEmptyCart = () => (
//     <View style={styles.emptyContainer}>
//       <MaterialIcons name="shopping-cart" size={80} color="#E5E7EB" />
//       <Text style={styles.emptyTitle}>Your cart is empty</Text>
//       <Text style={styles.emptySubtitle}>
//         Add some products to get started
//       </Text>
//       <TouchableOpacity style={styles.shopButton}>
//         <Text style={styles.shopButtonText}>Start Shopping</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   if (cartItems.length === 0) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Shopping Cart</Text>
//         </View>
//         {renderEmptyCart()}
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Shopping Cart</Text>
//         <TouchableOpacity onPress={clearCart}>
//           <Text style={styles.clearAll}>Clear All</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Select All */}
//       <View style={styles.selectAllContainer}>
//         <TouchableOpacity
//           style={styles.selectAllButton}
//           onPress={handleSelectAll}
//         >
//           <MaterialIcons
//             name={selectedItems.size === cartItems.length ? "check-box" : "check-box-outline-blank"}
//             size={24}
//             color={selectedItems.size === cartItems.length ? "#1E40AF" : "#9CA3AF"}
//           />
//           <Text style={styles.selectAllText}>
//             Select All ({cartItems.length} items)
//           </Text>
//         </TouchableOpacity>

//         {selectedItems.size > 0 && (
//           <TouchableOpacity
//             style={styles.removeSelectedButton}
//             onPress={handleRemoveSelected}
//           >
//             <MaterialIcons name="delete" size={20} color="#EF4444" />
//             <Text style={styles.removeSelectedText}>Remove ({selectedItems.size})</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Cart Items */}
//       <FlatList
//         data={cartItems}
//         renderItem={renderCartItem}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.cartList}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* Bottom Summary */}
//       <View style={styles.bottomContainer}>
//         <View style={styles.summaryContainer}>
//           <View style={styles.summaryRow}>
//             <Text style={styles.summaryLabel}>
//               Subtotal ({selectedItems.size} {selectedItems.size === 1 ? 'item' : 'items'}):
//             </Text>
//             <Text style={styles.summaryValue}>
//               {formatPrice(getSelectedTotal())}
//             </Text>
//           </View>
          
//           <View style={styles.summaryRow}>
//             <Text style={styles.summaryLabel}>Delivery Fee:</Text>
//             <Text style={styles.summaryValue}>
//               {selectedItems.size > 0 ? formatPrice(15000) : formatPrice(0)}
//             </Text>
//           </View>
          
//           <View style={[styles.summaryRow, styles.totalRow]}>
//             <Text style={styles.totalLabel}>Total:</Text>
//             <Text style={styles.totalValue}>
//               {formatPrice(getSelectedTotal() + (selectedItems.size > 0 ? 15000 : 0))}
//             </Text>
//           </View>
//         </View>

//         <TouchableOpacity
//           style={[
//             styles.checkoutButton,
//             selectedItems.size === 0 && styles.checkoutButtonDisabled
//           ]}
//           onPress={handleCheckout}
//           disabled={selectedItems.size === 0}
//         >
//           <Text style={styles.checkoutButtonText}>
//             Proceed to Checkout
//           </Text>
//         </TouchableOpacity>
//       </View>
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
//   clearAll: {
//     fontSize: 14,
//     color: '#EF4444',
//     fontWeight: '600',
//   },
//   selectAllContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#F9FAFB',
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   selectAllButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   selectAllText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#374151',
//     fontWeight: '500',
//   },
//   removeSelectedButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   removeSelectedText: {
//     marginLeft: 4,
//     fontSize: 14,
//     color: '#EF4444',
//     fontWeight: '500',
//   },
//   cartList: {
//     paddingBottom: 20,
//   },
//   cartItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   checkbox: {
//     marginRight: 12,
//   },
//   itemImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   itemInfo: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 2,
//   },
//   itemVariant: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginBottom: 2,
//   },
//   itemSeller: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   itemPrice: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#1E40AF',
//   },
//   itemActions: {
//     alignItems: 'center',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     backgroundColor: '#F9FAFB',
//     borderRadius: 8,
//   },
//   quantityButton: {
//     padding: 8,
//   },
//   quantity: {
//     paddingHorizontal: 12,
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   removeButton: {
//     padding: 4,
//   },
//   bottomContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   summaryContainer: {
//     marginBottom: 16,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   summaryLabel: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   summaryValue: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111827',
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
//   totalValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1E40AF',
//   },
//   checkoutButton: {
//     backgroundColor: '#1E40AF',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   checkoutButtonDisabled: {
//     backgroundColor: '#9CA3AF',
//   },
//   checkoutButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
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

// export default BuyerCartScreen;