// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { MaterialIcons } from '@expo/vector-icons';

// // Import Buyer Screens
// import BuyerHomeScreen from './BuyerHomeScreen';
// import BuyerSearchScreen from './BuyerSearchScreen';
// import BuyerCartScreen from './BuyerCartScreen';
// import BuyerOrdersScreen from './BuyerOrdersScreen';
// import BuyerChatScreen from './BuyerChatScreen';
// import BuyerProfileScreen from './BuyerProfileScreen';

// const Tab = createBottomTabNavigator();

// const BuyerTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = 'home';
//           } else if (route.name === 'Search') {
//             iconName = 'search';
//           } else if (route.name === 'Cart') {
//             iconName = 'shopping-cart';
//           } else if (route.name === 'Orders') {
//             iconName = 'receipt';
//           } else if (route.name === 'Chat') {
//             iconName = 'chat';
//           } else if (route.name === 'Profile') {
//             iconName = 'person';
//           }

//           return <MaterialIcons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#1E40AF',
//         tabBarInactiveTintColor: 'gray',
//         headerShown: false,
//         tabBarStyle: {
//           paddingBottom: 8,
//           paddingTop: 8,
//           height: 60,
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={BuyerHomeScreen} />
//       <Tab.Screen name="Search" component={BuyerSearchScreen} />
//       <Tab.Screen name="Cart" component={BuyerCartScreen} />
//       <Tab.Screen name="Orders" component={BuyerOrdersScreen} />
//       <Tab.Screen name="Chat" component={BuyerChatScreen} />
//       <Tab.Screen name="Profile" component={BuyerProfileScreen} />
//     </Tab.Navigator>
//   );
// };

// export default BuyerTabs;