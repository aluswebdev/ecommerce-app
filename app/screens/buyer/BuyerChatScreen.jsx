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
// import { fetchChatRooms } from '../../store/slices/chatSlice';

// const BuyerChatScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { user } = useAuth();
//   const { rooms, loading } = useSelector(state => state.chat);
//   const [refreshing, setRefreshing] = useState(false);

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

//   const getOtherParticipant = (room) => {
//     return room.participants.find(p => p.id !== user?.id);
//   };

//   const renderChatRoom = ({ item }) => {
//     const otherParticipant = getOtherParticipant(item);
//     const hasUnreadMessages = item.lastMessage && !item.lastMessage.read && 
//                               item.lastMessage.senderId !== user?.id;

//     return (
//       <TouchableOpacity 
//         style={styles.chatRoom}
//         onPress={() => {
//           // Navigate to chat conversation
//           // navigation.navigate('ChatConversation', { roomId: item.id, participant: otherParticipant });
//         }}
//       >
//         <View style={styles.avatarContainer}>
//           <Image 
//             source={{ uri: otherParticipant?.avatar }} 
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
//             <Text style={styles.participantName} numberOfLines={1}>
//               {otherParticipant?.name}
//             </Text>
//             <Text style={styles.timestamp}>
//               {item.lastMessage && formatTime(item.lastMessage.timestamp)}
//             </Text>
//           </View>

//           {item.productContext && (
//             <View style={styles.productContext}>
//               <Image 
//                 source={{ uri: item.productContext.image }} 
//                 style={styles.productImage}
//               />
//               <Text style={styles.productName} numberOfLines={1}>
//                 {item.productContext.name}
//               </Text>
//             </View>
//           )}

//           <View style={styles.lastMessageContainer}>
//             <Text 
//               style={[
//                 styles.lastMessage,
//                 hasUnreadMessages && styles.unreadMessage
//               ]} 
//               numberOfLines={2}
//             >
//               {item.lastMessage?.senderId === user?.id && 'You: '}
//               {item.lastMessage?.text || 'No messages yet'}
//             </Text>
//             {hasUnreadMessages && <View style={styles.unreadBadge} />}
//           </View>
//         </View>

//         <TouchableOpacity style={styles.moreButton}>
//           <MaterialIcons name="more-vert" size={20} color="#9CA3AF" />
//         </TouchableOpacity>
//       </TouchableOpacity>
//     );
//   };

//   const renderEmptyState = () => (
//     <View style={styles.emptyContainer}>
//       <MaterialIcons name="chat-bubble-outline" size={80} color="#E5E7EB" />
//       <Text style={styles.emptyTitle}>No conversations yet</Text>
//       <Text style={styles.emptySubtitle}>
//         Start chatting with sellers about products you're interested in
//       </Text>
//       <TouchableOpacity style={styles.startChatButton}>
//         <Text style={styles.startChatButtonText}>Browse Products</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Messages</Text>
//         <View style={styles.headerActions}>
//           <TouchableOpacity style={styles.headerButton}>
//             <MaterialIcons name="search" size={24} color="#374151" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerButton}>
//             <MaterialIcons name="add" size={24} color="#374151" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Chat Filter Tabs */}
//       <View style={styles.filterTabs}>
//         <TouchableOpacity style={[styles.filterTab, styles.activeFilterTab]}>
//           <Text style={[styles.filterTabText, styles.activeFilterTabText]}>
//             All
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.filterTab}>
//           <Text style={styles.filterTabText}>Unread</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.filterTab}>
//           <Text style={styles.filterTabText}>Sellers</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Chat Rooms List */}
//       <FlatList
//         data={rooms}
//         renderItem={renderChatRoom}
//         keyExtractor={(item) => item.id}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         contentContainerStyle={rooms.length === 0 ? styles.emptyList : styles.chatList}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={renderEmptyState}
//       />

//       {/* Floating Action Button */}
//       <TouchableOpacity style={styles.fab}>
//         <MaterialIcons name="edit" size={24} color="#FFFFFF" />
//       </TouchableOpacity>
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
//   headerActions: {
//     flexDirection: 'row',
//   },
//   headerButton: {
//     padding: 8,
//     marginLeft: 8,
//   },
//   filterTabs: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#F9FAFB',
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   filterTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 8,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   activeFilterTab: {
//     backgroundColor: '#1E40AF',
//     borderColor: '#1E40AF',
//   },
//   filterTabText: {
//     fontSize: 14,
//     color: '#6B7280',
//     fontWeight: '500',
//   },
//   activeFilterTabText: {
//     color: '#FFFFFF',
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
//   participantName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//     flex: 1,
//   },
//   timestamp: {
//     fontSize: 12,
//     color: '#9CA3AF',
//   },
//   productContext: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     backgroundColor: '#F9FAFB',
//     borderRadius: 8,
//   },
//   productImage: {
//     width: 20,
//     height: 20,
//     borderRadius: 4,
//     marginRight: 8,
//   },
//   productName: {
//     fontSize: 12,
//     color: '#6B7280',
//     flex: 1,
//   },
//   lastMessageContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   lastMessage: {
//     fontSize: 14,
//     color: '#6B7280',
//     flex: 1,
//   },
//   unreadMessage: {
//     fontWeight: '600',
//     color: '#111827',
//   },
//   unreadBadge: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#1E40AF',
//     marginLeft: 8,
//   },
//   moreButton: {
//     padding: 8,
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
//   startChatButton: {
//     backgroundColor: '#1E40AF',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   startChatButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   fab: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     backgroundColor: '#1E40AF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 8,
//   },
// });

// export default BuyerChatScreen;