import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // This reducer handles adding items to the cart.
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from the action payload
      // Check if the item already exists in the cart by comparing names
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        existingItem.quantity++;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    // This reducer handles removing an item from the cart completely.
    removeItem: (state, action) => {
        // It filters the items array, keeping everything except the item to be removed.
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    // This reducer handles changing the quantity of a specific item.
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload; // Destructure the product name and new quantity
        // Find the item in the cart that matches the given name
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
          // If the item is found, update its quantity to the new value
          itemToUpdate.quantity = quantity;
        }
    },
  },
});

// The action creators are automatically generated and exported here.
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// The reducer is exported to be used in the main Redux store.
export default CartSlice.reducer;