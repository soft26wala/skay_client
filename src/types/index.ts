/**
 * MAISON LUXE - Haute E-Commerce Type Definitions
 * Compatible with Next.js App Router and Vite + TypeScript
 */

export interface ProductImage {
  public_id?: string;
  url: string;
}

export interface ProductReview {
  review_id: string | number;
  rating: number;
  comment: string;
  reviewer?: {
    id?: string | number;
    name?: string;
    avatar?: string;
  };
  created_at?: string;
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  description?: string;
  category: string;
  stock: number;
  ratings: number;
  review_count?: number;
  images: ProductImage[];
  how_to_use?: string[];
  reviews?: ProductReview[];
  created_at?: string;
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  number: string;
  role?: string;
  avatar?: {
    public_id?: string;
    url: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  state: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface OrderItem {
  product_id?: string | number;
  title?: string;
  name?: string;
  price: number;
  quantity: number;
  image?: string;
}

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface Order {
  id: string | number;
  user_id?: string | number;
  order_status: OrderStatus;
  total_price: number;
  order_items: OrderItem[];
  shipping_address?: ShippingDetails;
  payment_method?: "COD" | "ONLINE" | "STRIPE";
  created_at: string;
}

export interface AuthState {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isUpdatingPassword: boolean;
  isRequestingForToken: boolean;
  isCheckingAuth: boolean;
}

export interface CartState {
  cart: CartItem[];
}

export interface ProductState {
  loading: boolean;
  products: Product[];
  productDetails: Partial<Product>;
  totalProducts: number;
  topRatedProducts: Product[];
  newProducts: Product[];
  aiSearching: boolean;
  isReviewDeleting: boolean;
  isPostingReview: boolean;
  productReviews: ProductReview[];
}
