import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  carts: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const existingProductIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingProductIndex >= 0) {
        state.carts[existingProductIndex].cartQuantity++;
        toast.info("increased product quantity", {
          position: "bottom-left",
        });
      } else {
        state.carts.push({ ...action.payload, cartQuantity: 1 });
          toast.success("added product to cart", {
              position: "bottom-left",
          }
        );
          }
      localStorage.setItem("carts", JSON.stringify(state.carts));
      
    },
    removeCart: (state, action) => {
      const existingIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      state.carts.splice(existingIndex, 1);
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },

    decreaseCart: (state, action) => {
      const existingIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if ( state.carts[existingIndex].cartQuantity>1) {
        state.carts[existingIndex].cartQuantity--;
        
      } else {
        state.carts.splice(existingIndex, 1);
      }
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },

    clearCart: (state) => {
      state.carts = [];
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },

    getTotalCart: (state) => {
      let { total }= state.carts.reduce((cartTotal, item) => { 
        const { price, cartQuantity } = item;
        const itemTotal = price * cartQuantity;

        cartTotal.total += itemTotal;

        return cartTotal;
      }, {
        total: 0
      })
      state.cartTotalAmount = total;
    },
  },
});

export const { addCart, removeCart, clearCart, decreaseCart, getTotalCart } =
  cartSlice.actions;

export default cartSlice.reducer;
