// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { MaterialIcons } from '@expo/vector-icons';

// // Import Admin Screens
// import AdminDashboardScreen from './AdminDashboardScreen';
// import AdminUsersScreen from './AdminUsersScreen';
// import AdminProductsScreen from './AdminProductsScreen';
// // import AdminOrdersScreen from './AdminOrdersScreen';
// // import AdminAnalyticsScreen from './AdminAnalyticsScreen';
// // import AdminSettingsScreen from './AdminSettingsScreen';

// const Tab = createBottomTabNavigator();

// const AdminTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Dashboard') {
//             iconName = 'dashboard';
//           } else if (route.name === 'Users') {
//             iconName = 'people';
//           } else if (route.name === 'Products') {
//             iconName = 'inventory-2';
//           } else if (route.name === 'Orders') {
//             iconName = 'assignment';
//           } else if (route.name === 'Analytics') {
//             iconName = 'bar-chart';
//           } else if (route.name === 'Settings') {
//             iconName = 'admin-panel-settings';
//           }

//           return <MaterialIcons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#8B5CF6',
//         tabBarInactiveTintColor: 'gray',
//         headerShown: false,
//         tabBarStyle: {
//           paddingBottom: 8,
//           paddingTop: 8,
//           height: 60,
//         },
//       })}
//     >
//       <Tab.Screen name="Dashboard" component={AdminDashboardScreen} />
//       <Tab.Screen name="Users" component={AdminUsersScreen} />
//       <Tab.Screen name="Products" component={AdminProductsScreen} />
//       {/* <Tab.Screen name="Orders" component={AdminOrdersScreen} />
//       <Tab.Screen name="Analytics" component={AdminAnalyticsScreen} />
//       <Tab.Screen name="Settings" component={AdminSettingsScreen} /> */}
//     </Tab.Navigator>
//   );
// };

// export default AdminTabs;