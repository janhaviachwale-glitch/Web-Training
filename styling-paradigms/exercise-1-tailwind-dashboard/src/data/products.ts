import type { Product } from '../types/product'

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    status: 'In Stock',
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    status: 'Low Stock',
  },
  {
    id: 3,
    name: 'Running Shoes',
    category: 'Footwear',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    status: 'In Stock',
  },
  {
    id: 4,
    name: 'Travel Backpack',
    category: 'Accessories',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
    status: 'Out of Stock',
  },
  {
    id: 5,
    name: 'Coffee Maker',
    category: 'Home Appliances',
    price: 2799,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600',
    status: 'In Stock',
  },
  {
    id: 6,
    name: 'Sunglasses',
    category: 'Accessories',
    price: 999,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
    status: 'Low Stock',
  },
]