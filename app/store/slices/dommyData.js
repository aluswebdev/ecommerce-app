// src/store/slices/dommyData.js

const producs = {
  items: [
    {
      id: "1",
      name: "Traditional Gele Headwrap",
      description:
        "Beautiful handwoven gele headwrap in traditional Sierra Leonean patterns",
      price: 75000,
      images: [
        "https://images.unsplash.com/photo-1594736797933-d0b1b80d0b6e?w=500",
      ],
      category: "fashion",
      sellerId: "seller1",
      sellerName: "Aminata Fashion",
      location: "Freetown",
      stock: 15,
      variants: [
        { id: "v1", name: "Red & Gold", price: 75000, stock: 5 },
        { id: "v2", name: "Blue & Silver", price: 80000, stock: 10 },
      ],
      rating: 4.8,
      reviews: 24,
      createdAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "2",
      name: "Premium Palm Oil",
      description: "Fresh red palm oil from organic farms in Bo district",
      price: 45000,
      images: [
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500",
      ],
      category: "food",
      sellerId: "seller2",
      sellerName: "Bo Farms Cooperative",
      location: "Bo",
      stock: 50,
      variants: [
        { id: "v3", name: "1 Liter", price: 45000, stock: 30 },
        { id: "v4", name: "5 Liters", price: 200000, stock: 20 },
      ],
      rating: 4.9,
      reviews: 89,
      createdAt: "2024-01-10T00:00:00Z",
    },
    {
      id: "3",
      name: "Handmade Leather Bag",
      description:
        "Authentic leather handbag crafted by local artisans in Kenema",
      price: 150000,
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      ],
      category: "fashion",
      sellerId: "seller3",
      sellerName: "Kenema Leather Works",
      location: "Kenema",
      stock: 8,
      variants: [
        { id: "v5", name: "Brown", price: 150000, stock: 4 },
        { id: "v6", name: "Black", price: 160000, stock: 4 },
      ],
      rating: 4.7,
      reviews: 32,
      createdAt: "2024-01-12T00:00:00Z",
    },
  ],

  categories: [
    { id: "all", name: "All Categories", icon: "grid-view" },
    { id: "fashion", name: "Fashion & Clothing", icon: "checkroom" },
    { id: "food", name: "Food & Beverages", icon: "restaurant" },
    { id: "electronics", name: "Electronics", icon: "phone-android" },
    { id: "home", name: "Home & Garden", icon: "home" },
    { id: "beauty", name: "Beauty & Health", icon: "spa" },
    { id: "crafts", name: "Local Crafts", icon: "palette" },
  ],
};

export default producs;
