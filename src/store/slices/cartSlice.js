import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("luxury_cart");
      return saved ? JSON.parse(saved) : [];
    }
  } catch (e) {
    console.error("Failed to load cart from storage", e);
  }
  return [];
};

const saveCartToStorage = (cart) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("luxury_cart", JSON.stringify(cart));
    }
  } catch (e) {
    console.error("Failed to save cart to storage", e);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
  },
  reducers: {
    addToCart(state, action) {
      const { product, quantity = 1 } = action.payload;

      const existingItem = state.cart.find(
        (item) => item.product?.id === product?.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ product, quantity });
      }
      saveCartToStorage(state.cart);
    },

    removeFromCart(state, action) {
      state.cart = state.cart.filter(
        (item) => item.product?.id !== action.payload
      );
      saveCartToStorage(state.cart);
    },

    updateCartQuantity(state, action) {
      const item = state.cart.find(
        (item) => item.product?.id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveCartToStorage(state.cart);
    },

    clearCart(state) {
      state.cart = [];
      saveCartToStorage(state.cart);
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
