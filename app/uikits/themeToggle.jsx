  import useThemeStore from "../zustand/useThemeStore";
 import { Ionicons } from '@expo/vector-icons';


 import React from 'react';
 import { Text, TouchableOpacity } from 'react-native';
 
 const ThemeToggle = () => {
   const {toggleTheme, theme} = useThemeStore()
   return (
     <TouchableOpacity
       className="flex-row items-center gap-2"
       onPress={toggleTheme}
     >
       <Text>
         <Ionicons name="moon" size={22} color="black" />
       </Text>

       <Text className="text-base text-gray-700 dark:text-[#A3A3A3]">
         {theme === "dark" ? "Light Mode" : "Dark Mode"}
       </Text>
     </TouchableOpacity>
     //    <Ionicons name="chevron-forward" size={20} color="#888" />
   );
 };
 

 
 export default ThemeToggle;
 
 
 
 
 {/* <ProfileItem
        icon={<Ionicons name="moon" size={22} color="black" />}
        label={theme === "dark" ? "Light Mode" : "Dark Mode"}
        onPress={toggleTheme}
      /> */}