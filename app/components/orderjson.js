// dummyOrders.js
export const dummyOrders = [
  {
    _id: "ORD-001",
    date: "2025-11-05",
    status: "Delivered",
    totalAmount: 950,
    products: [
      {
        id: "P1",
        title: "Samsung Galaxy S21",
        image:
          "https://images.samsung.com/is/image/samsung/p6pim/levant/galaxy-s21/gallery/levant-galaxy-s21-ultra-5g-g988-sm-g998bzkgmea-368528616?$650_519_PNG$",
        quantity: 1,
        price: 900,
      },
    ],
  },
  {
    _id: "ORD-002",
    date: "2025-11-06",
    status: "Shipped",
    totalAmount: 420,
    tracking: {
      carrier: "DHL",
      trackingNumber: "SL-DHL-55412",
      eta: "2025-11-11",
      progress: ["Pending", "Processing", "Shipped"], // Dummy progress
    },
    products: [
      {
        id: "P2",
        title: "Nike Air Force 1",
        image:
          "https://static.nike.com/a/images/t_default/4b6e4e25-92bb-4d68-b3b1-d9a57af7b43e/air-force-1-07-mens-shoes-JkTGzADv.png",
        quantity: 1,
        price: 420,
      },
    ],
  },
  {
    _id: "ORD-003",
    date: "2025-11-07",
    status: "Processing",
    totalAmount: 650,
    products: [
      {
        id: "P3",
        title: "HP Pavilion Laptop",
        image:
          "https://m.media-amazon.com/images/I/61p5G6S9XLL._AC_SL1500_.jpg",
        quantity: 1,
        price: 650,
      },
    ],
  },
  {
    _id: "ORD-004",
    date: "2025-11-08",
    status: "Pending",
    totalAmount: 120,
    products: [
      {
        id: "P4",
        title: "Wireless Mouse",
        image:
          "https://m.media-amazon.com/images/I/61LtuGzXeaL._AC_SL1500_.jpg",
        quantity: 1,
        price: 120,
      },
    ],
  },
];

export const statusColors = {
  Pending: "#f59e0b",
  Processing: "#3b82f6",
  Shipped: "#8b5cf6",
  Delivered: "#10b981",
};
