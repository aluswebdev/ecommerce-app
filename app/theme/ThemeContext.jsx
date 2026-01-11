import { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
// import { useColorScheme } from "nativewind";
import { Theme as RootTheme } from "nativewind"; // from NativeWind

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(systemColorScheme || "light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme || "light");
    });
    return () => listener.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <RootTheme theme={theme}>{children}</RootTheme>
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);
