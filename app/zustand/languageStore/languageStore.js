import { create } from "zustand";
import i18n from "../../language/i18n";

export const useLanguageStore = create((set) => ({
  language: i18n.locale,
  setLanguage: (lang) => {
    i18n.locale = lang;
    set({ language: lang });
  },
  t: (key) => i18n.t(key), // optional helper for UI strings
}));
