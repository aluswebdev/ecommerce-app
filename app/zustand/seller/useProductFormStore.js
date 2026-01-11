import { create } from "zustand";
// import Category and Subcategory types are removed for JS

export const useProductFormStore = create((set, get) => ({
  selectedCategory: null,
  selectedSubcategory: null,
  formData: {},

  setCategory: (c) =>
    set({ selectedCategory: c, selectedSubcategory: null, formData: {} }),
  setSubcategory: (s) => set({ selectedSubcategory: s, formData: {} }),
  setFieldValue: (k, v) => set({ formData: { ...get().formData, [k]: v } }),
  reset: () =>
    set({ selectedCategory: null, selectedSubcategory: null, formData: {} }),

  validate: () => {
    const { selectedSubcategory, formData } = get();
    if (!selectedSubcategory) return { valid: false, missing: ["Subcategory"] };

    const missing = (selectedSubcategory.fields || [])
      .filter(
        (f) =>
          f.required &&
          (formData[f.key] === undefined || formData[f.key] === "")
      )
      .map((f) => f.name);

    return { valid: missing.length === 0, missing };
  },
}));
