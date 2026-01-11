// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   RefreshControl,
//   TextInput,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { useAuth } from '../../contexts/AuthContext';
// import { fetchChatRooms } from '../../store/slices/chatSlice';

// const SellerChatScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { user } = useAuth();
//   const { rooms, loading } = useSelector(state => state.chat);
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState('all');

//   useEffect(() => {
//     if (user) {
//       dispatch(fetchChatRooms(user.id));
//     }
//   }, [dispatch, user]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     if (user) {
//       await dispatch(fetchChatRooms(user.id));
//     }
//     setRefreshing(false);
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffTime = Math.abs(now - date);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays === 1) {
//       return date.toLocaleTimeString('en-US', { 
//         hour: '2-digit', 
//         minute: '2-digit',
//         hour12: false 
//       });
//     } else if (diffDays <= 7) {
//       return date.toLocaleDateString('en-US', { weekday: 'short' });
//     } else {
//       return date.toLocaleDateString('en-US', { 
//         month: 'short', 
//         day: 'numeric' 
//       });
//     }
//   };

//   const getBuyerFromRoom = (room) => {
//     return room.participants.find(p => p.role === 'buyer');
//   };

//   const getUnreadCount = (room) => {
//     // Mock unread count calculation
//     return room.lastMessage && !room.lastMessage.read && 
//            room.lastMessage.senderId !== user?.id ? 1 : 0;
//   };

//   const filteredRooms = rooms.filter(room => {
//     const buyer = getBuyerFromRoom(room);
//     const matchesSearch = !searchQuery || 
//                          buyer?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          room.productContext?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
//     const matchesFilter = selectedFilter === 'all' ||
//                          (selectedFilter === 'unread' && getUnreadCount(room) > 0) ||
//                          (selectedFilter === 'orders' && room.hasOrder);
    
//     return matchesSearch && matchesFilter;
//   });

//   const filterOptions = [
//     { id: 'all', name: 'All Chats', count: rooms.length },
//     { id: 'unread', name: 'Unread', count: rooms.filter(room => getUnreadCount(room) > 0).length },
//     { id: 'orders', name: 'With Orders', count: rooms.filter(room => room.hasOrder).length },
//   ];

//   const renderChatRoom = ({ item }) => {
//     const buyer = getBuyerFromRoom(item);
//     const unreadCount = getUnreadCount(item);

//     return (
//       <TouchableOpacity 
//         style={styles.chatRoom}
//         onPress={() => {
//           // Navigate to chat conversation
//           // navigation.navigate('ChatConversation', { roomId: item.id, participant: buyer });
//         }}
//       >
//         <View style={styles.avatarContainer}>
//           <Image 
//             source={{ uri: buyer?.avatar }} 
//             style={styles.avatar}
//           />
//           <View style={[
//             styles.onlineIndicator,
//             // Online status would come from socket context
//             { backgroundColor: '#10B981' } // Mock online status
//           ]} />
//         </View>

//         <View style={styles.chatInfo}>
//           <View style={styles.chatHeader}>
//             <Text style={styles.buyerName} numberOfLines={1}>
//               {buyer?.name}
//             </Text>
//             <View style={styles.chatMeta}>
//               <Text style={styles.timestamp}>
//                 {item.lastMessage && formatTime(item.lastMessage.timestamp)}
//               </Text>
//               {unreadCount > 0 && (
//                 <View style={styles.unreadBadge}>
//                   <Text style={styles.unreadCount}>{unreadCount}</Text>
//                 </View>
//               )}
//             </View>
//           </View>

//           {item.productContext && (
//             <View style={styles.productContext}>
//               <Image 
//                 source={{ uri: item.productContext.image }} 
//                 style={styles.productImage}
//               />
//               <Text style={styles.productName} numberOfLines={1}>
//                 Product: {item.productContext.name}
//               </Text>
//               {item.hasOrder && (
//                 <View style={styles.orderBadge}>
//                   <MaterialIcons name="shopping-cart" size={12} color="#FFFFFF" />
//                 </View>
//               )}
//             </View>
//           )}

//           <View style={styles.lastMessageContainer}>
//             <Text 
//               style={[
//                 styles.lastMessage,
//                 unreadCount > 0 && styles.unreadMessage
//               ]} 
//               numberOfLines={2}
//             >
//               {item.lastMessage?.senderId === user?.id && 'You: '}
//               {item.lastMessage?.text || 'No messages yet'}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.actionButtons}>
//           <TouchableOpacity style={styles.quickActionButton}>
//             <MaterialIcons name="call" size={16} color="#10B981" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.quickActionButton}>
//             <MaterialIcons name="more-vert" size={16} color="#6B7280" />
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
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

//   const renderEmptyState = () => (
//     <View style={styles.emptyContainer}>
//       <MaterialIcons name="chat-bubble-outline" size={80} color="#E5E7EB" />
//       <Text style={styles.emptyTitle}>No customer messages</Text>
//       <Text style={styles.emptySubtitle}>
//         When customers message you about products, conversations will appear here
//       </Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Customer Messages</Text>
//         <View style={styles.headerActions}>
//           <TouchableOpacity style={styles.headerButton}>
//             <MaterialIcons name="search" size={24} color="#374151" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerButton}>
//             <MaterialIcons name="more-vert" size={24} color="#374151" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <MaterialIcons name="search" size={20} color="#9CA3AF" />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search customers or products..."
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
//       <View style={styles.filterTabs}>
//         <FlatList
//           data={filterOptions}
//           renderItem={renderFilterTab}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.filtersList}
//         />
//       </View>

//       {/* Quick Stats */}
//       <View style={styles.statsContainer}>
//         <View style={styles.statItem}>
//           <MaterialIcons name="chat" size={20} color="#10B981" />
//           <View style={styles.statInfo}>
//             <Text style={styles.statValue}>{rooms.length}</Text>
//             <Text style={styles.statLabel}>Total Chats</Text>
//           </View>
//         </View>
        
//         <View style={styles.statItem}>
//           <MaterialIcons name="mark-chat-unread" size={20} color="#F59E0B" />
//           <View style={styles.statInfo}>
//             <Text style={styles.statValue}>
//               {rooms.filter(room => getUnreadCount(room) > 0).length}
//             </Text>
//             <Text style={styles.statLabel}>Unread</Text>
//           </View>
//         </View>
        
//         <View style={styles.statItem}>
//           <MaterialIcons name="shopping-cart" size={20} color="#3B82F6" />
//           <View style={styles.statInfo}>
//             <Text style={styles.statValue}>
//               {rooms.filter(room => room.hasOrder).length}
//             </Text>
//             <Text style={styles.statLabel}>With Orders</Text>
//           </View>
//         </View>
//       </View>

//       {/* Chat Rooms List */}
//       <FlatList
//         data={filteredRooms}
//         renderItem={renderChatRoom}
//         keyExtractor={(item) => item.id}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         contentContainerStyle={filteredRooms.length === 0 ? styles.emptyList : styles.chatList}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={renderEmptyState}
//       />

//       {/* Quick Response Templates */}
//       <View style={styles.quickResponsesContainer}>
//         <Text style={styles.quickResponsesTitle}>Quick Responses</Text>
//         <View style={styles.quickResponses}>
//           <TouchableOpacity style={styles.quickResponseButton}>
//             <Text style={styles.quickResponseText}>Thank you for your interest!</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.quickResponseButton}>
//             <Text style={styles.quickResponseText}>Product is available</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.quickResponseButton}>
//             <Text style={styles.quickResponseText}>Shipping info</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
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
//   filterTabs: {
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
//   statsContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   statItem: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//   },
//   statInfo: {
//     marginLeft: 8,
//   },
//   statValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   chatList: {
//     paddingVertical: 8,
//   },
//   emptyList: {
//     flex: 1,
//   },
//   chatRoom: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   avatarContainer: {
//     position: 'relative',
//     marginRight: 12,
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   onlineIndicator: {
//     position: 'absolute',
//     bottom: 2,
//     right: 2,
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//   },
//   chatInfo: {
//     flex: 1,
//   },
//   chatHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   buyerName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//     flex: 1,
//   },
//   chatMeta: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   timestamp: {
//     fontSize: 12,
//     color: '#9CA3AF',
//     marginRight: 8,
//   },
//   unreadBadge: {
//     backgroundColor: '#10B981',
//     borderRadius: 10,
//     minWidth: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   unreadCount: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   productContext: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     backgroundColor: '#F0FDF4',
//     borderRadius: 8,
//     position: 'relative',
//   },
//   productImage: {
//     width: 20,
//     height: 20,
//     borderRadius: 4,
//     marginRight: 8,
//   },
//   productName: {
//     fontSize: 12,
//     color: '#059669',
//     flex: 1,
//     fontWeight: '500',
//   },
//   orderBadge: {
//     position: 'absolute',
//     top: -4,
//     right: -4,
//     backgroundColor: '#3B82F6',
//     borderRadius: 8,
//     width: 16,
//     height: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   lastMessageContainer: {
//     flex: 1,
//   },
//   lastMessage: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   unreadMessage: {
//     fontWeight: '600',
//     color: '#111827',
//   },
//   actionButtons: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginLeft: 8,
//   },
//   quickActionButton: {
//     padding: 8,
//     marginBottom: 4,
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
//   quickResponsesContainer: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6',
//   },
//   quickResponsesTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 8,
//   },
//   quickResponses: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   quickResponseButton: {
//     backgroundColor: '#F0FDF4',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: '#BBF7D0',
//   },
//   quickResponseText: {
//     fontSize: 12,
//     color: '#059669',
//     fontWeight: '500',
//   },
// });

// export default SellerChatScreen;