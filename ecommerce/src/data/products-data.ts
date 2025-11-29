import { Product } from "@/types/product";

// Mock database - in-memory array of products
export let productsDB: Product[] = [
  // Flash Sale Items
  {
    id: "1",
    title: "Wireless Bluetooth Headphones",
    price: 99.99,
    discountPercentage: 35,
    isOnSale: true,
    saleEndsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    category: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=1000&fit=crop",
    description: "High-fidelity wireless Bluetooth headphones with noise-cancellation.",
  },
  {
    id: "2",
    title: "Leather Crossbody Bag",
    price: 129.99,
    discountPercentage: 40,
    isOnSale: true,
    saleEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    category: "fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&h=1000&fit=crop",
    description: "Stylish and durable leather crossbody bag for everyday use.",
  },
  {
    id: "3",
    title: "Organic Green Tea",
    price: 19.99,
    discountPercentage: 25,
    isOnSale: true,
    saleEndsAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    category: "groceries",
    imageUrl:
      "https://images.unsplash.com/photo-1576092762791-d2402a1e2634?w=800&h=1000&fit=crop",
    description: "A refreshing and healthy organic green tea.",
  },
  {
    id: "4",
    title: "Yoga Mat",
    price: 49.99,
    discountPercentage: 30,
    isOnSale: true,
    saleEndsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: "sports",
    imageUrl:
      "https://images.unsplash.com/photo-1591291621226-97f3b99342ba?w=800&h=1000&fit=crop",
    description: "Eco-friendly and non-slip yoga mat for your daily practice.",
  },
  {
    id: "5",
    title: "Smart Watch",
    price: 199.99,
    discountPercentage: 45,
    isOnSale: true,
    saleEndsAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    category: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=1000&fit=crop",
    description: "Stay connected with this feature-packed smart watch.",
  },
  {
    id: "6",
    title: "Denim Jacket",
    price: 89.99,
    discountPercentage: 20,
    isOnSale: true,
    saleEndsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: "fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&h=1000&fit=crop",
    description: "A classic denim jacket that never goes out of style.",
  },
  {
    id: "7",
    title: "Natural Honey",
    price: 15.99,
    discountPercentage: 35,
    isOnSale: true,
    saleEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    category: "groceries",
    imageUrl:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=1000&fit=crop",
    description: "100% pure and natural honey.",
  },
  {
    id: "8",
    title: "Dumbbell Set",
    price: 79.99,
    discountPercentage: 28,
    isOnSale: true,
    saleEndsAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    category: "sports",
    imageUrl:
      "https://images.unsplash.com/photo-1581009137042-c55216867c42?w=800&h=1000&fit=crop",
    description: "A versatile dumbbell set for your home workouts.",
  },

  // Regular Products
  {
    id: "9",
    title: "Laptop Backpack",
    price: 59.99,
    isOnSale: false,
    category: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eada6b5a5a?w=800&h=1000&fit=crop",
    description: "A spacious and stylish backpack to carry your laptop and other essentials.",
  },
  {
    id: "10",
    title: "T-shirt",
    price: 29.99,
    isOnSale: false,
    category: "fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop",
    description: "A comfortable and soft cotton t-shirt for everyday wear.",
  },
  {
    id: "11",
    title: "Coffee Beans",
    price: 25.99,
    isOnSale: false,
    category: "groceries",
    imageUrl:
      "https://images.unsplash.com/photo-1511920183334-9b71b3e1d1d1?w=800&h=1000&fit=crop",
    description: "Freshly roasted coffee beans for a perfect cup of coffee.",
  },
  {
    id: "12",
    title: "Basketball",
    price: 39.99,
    isOnSale: false,
    category: "sports",
    imageUrl:
      "https://images.unsplash.com/photo-1515523110822-a93e3b334137?w=800&h=1000&fit=crop",
    description: "A high-quality basketball for both indoor and outdoor use.",
  },
  {
    id: "13",
    title: "Gaming Mouse",
    price: 79.99,
    isOnSale: false,
    category: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1615663249852-595f04269818?w=800&h=1000&fit=crop",
    description: "A high-precision gaming mouse for the ultimate gaming experience.",
  },
  {
    id: "14",
    title: "Sneakers",
    price: 119.99,
    isOnSale: false,
    category: "fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27a2?w=800&h=1000&fit=crop",
    description: "A stylish and comfortable pair of sneakers for your daily walks.",
  },
  {
    id: "15",
    title: "Olive Oil",
    price: 12.99,
    isOnSale: false,
    category: "groceries",
    imageUrl:
      "https://images.unsplash.com/photo-1622240506782-b3c1fc090b83?w=800&h=1000&fit=crop",
    description: "Extra virgin olive oil for your cooking needs.",
  },
  {
    id: "16",
    title: "Resistance Bands",
    price: 19.99,
    isOnSale: false,
    category: "sports",
    imageUrl:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2a8f4c?w=800&h=1000&fit=crop",
    description: "A set of resistance bands for a full-body workout.",
  },
  {
    id: "17",
    title: "Portable Charger",
    price: 39.99,
    isOnSale: false,
    category: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-15211311-633b2a2b7e12?w=800&h=1000&fit=crop",
    description: "A high-capacity portable charger to keep your devices powered up on the go.",
  },
  {
    id: "18",
    title: "Leather Belt",
    price: 49.99,
    isOnSale: false,
    category: "fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1543163521-1ac54b2b2a6b?w=800&h=1000&fit=crop",
    description: "A stylish and durable leather belt to complete your look.",
  },
  {
    id: "19",
    title: "Pasta",
    price: 5.99,
    isOnSale: false,
    category: "groceries",
    imageUrl:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=1000&fit=crop",
    description: "A bag of delicious pasta for your favorite Italian dishes.",
  },
  {
    id: "20",
    title: "Jump Rope",
    price: 9.99,
    isOnSale: false,
    category: "sports",
    imageUrl:
      "https://images.unsplash.com/photo-1522898467493-49726bf28798?w=800&h=1000&fit=crop",
    description: "A lightweight and durable jump rope for your cardio workouts.",
  },
  {
    id: "21",
    title: "Webcam",
    price: 69.99,
    isOnSale: false,
    category: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1516733723236-c3a67a3b3a1a?w=800&h=1000&fit=crop",
    description: "A high-definition webcam for your video calls and streaming needs.",
  },
  {
    id: "22",
    title: "Sunglasses",
    price: 79.99,
    isOnSale: false,
    category: "fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=1000&fit=crop",
    description: "A pair of stylish sunglasses to protect your eyes from the sun.",
  },
];

// Helper functions for CRUD operations
export const getAllProducts = (): Product[] => productsDB;

export const getProductById = (id: string): Product | undefined => {
  return productsDB.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return productsDB.filter((p) => p.category === category);
};

export const getOnSaleProducts = (): Product[] => {
  return productsDB.filter((p) => p.isOnSale);
};

export const createProduct = (product: Omit<Product, "id">): Product => {
  const newProduct: Product = {
    ...product,
    id: (productsDB.length + 1).toString(),
  };
  productsDB.push(newProduct);
  return newProduct;
};

export const updateProduct = (
  id: string,
  updates: Partial<Product>
): Product | null => {
  const index = productsDB.findIndex((p) => p.id === id);
  if (index === -1) return null;

  productsDB[index] = { ...productsDB[index], ...updates };
  return productsDB[index];
};

export const deleteProduct = (id: string): boolean => {
  const index = productsDB.findIndex((p) => p.id === id);
  if (index === -1) return false;

  productsDB.splice(index, 1);
  return true;
};
