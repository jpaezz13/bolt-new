export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  image: string;
  category: 'floral' | 'woody' | 'fresh' | 'oriental';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  brand: string;
  category: string;
  priceRange: string;
  searchQuery: string;
}