// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { MaterialIcons } from '@expo/vector-icons';

// // Import Seller Screens
// import SellerDashboardScreen from './SellerDashboardScreen';
// import SellerProductsScreen from './SellerProductsScreen';
// import SellerOrdersScreen from './SellerOrdersScreen';
// import SellerChatScreen from './SellerChatScreen';
// import SellerAnalyticsScreen from './SellerAnalyticsScreen';
// import SellerProfileScreen from './SellerProfileScreen';

// const Tab = createBottomTabNavigator();

// const SellerTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Dashboard') {
//             iconName = 'dashboard';
//           } else if (route.name === 'Products') {
//             iconName = 'inventory';
//           } else if (route.name === 'Orders') {
//             iconName = 'receipt-long';
//           } else if (route.name === 'Chat') {
//             iconName = 'chat';
//           } else if (route.name === 'Analytics') {
//             iconName = 'analytics';
//           } else if (route.name === 'Profile') {
//             iconName = 'store';
//           }

//           return <MaterialIcons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#10B981',
//         tabBarInactiveTintColor: 'gray',
//         headerShown: false,
//         tabBarStyle: {
//           paddingBottom: 8,
//           paddingTop: 8,
//           height: 60,
//         },
//       })}
//     >
//       <Tab.Screen name="Dashboard" component={SellerDashboardScreen} />
//       <Tab.Screen name="Products" component={SellerProductsScreen} />
//       <Tab.Screen name="Orders" component={SellerOrdersScreen} />
//       <Tab.Screen name="Chat" component={SellerChatScreen} />
//       <Tab.Screen name="Analytics" component={SellerAnalyticsScreen} />
//       <Tab.Screen name="Profile" component={SellerProfileScreen} />
//     </Tab.Navigator>
//   );
// };

// export default SellerTabs;