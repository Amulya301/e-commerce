import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products-slice";
import cartReducer from "./cart-slice";

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
    },
})

export default store;