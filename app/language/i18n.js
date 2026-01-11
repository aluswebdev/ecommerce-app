import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "../locals/en.json";
import kr from "../locals/kr.json";

// 🔤 Translations
const translations = {
  en: {
    choose_language: "Select your preferred language",
    language_change_help:
      "Your selection will apply to the whole app immediately.",
    change_language: "Change Language",
  },
  kr: {
    choose_language: "Chuz di language we yu laik",
    language_change_help: "Wen yu chuz am, di app go chenj wit dat language.",
    change_language: "Chenj Language",
  },
  men: {
    choose_language: "Ngeiya lohu laa gbɔɔbu",
    language_change_help: "Ngayi lohu wola nyande feh gbɔɔbu nye lɔhu.",
    change_language: "Kɛɛ lɔhu gbɔɔbu",
  },
};

// 🧠 Create instance
const i18n = new I18n({en, kr});
i18n.enableFallback = true;
i18n.locale = getLocales()[0]?.languageCode ?? "en";

// ⚙️ Load or set default language
export async function initLanguage() {
  try {
    const storedLang = await AsyncStorage.getItem("userLanguage");
    if (storedLang) {
      i18n.locale = storedLang;
    } else {
      const deviceLang = getLocales()[0]?.languageCode ?? "en";
      i18n.locale = deviceLang;
      await AsyncStorage.setItem("userLanguage", deviceLang);
    }
  } catch (error) {
    console.warn("Language init error:", error);
    i18n.locale = "en";
  }
}

// 🌍 Change language and save
export async function changeLanguage(langCode) {
  i18n.locale = langCode;
  await AsyncStorage.setItem("userLanguage", langCode);
}

export default i18n;
