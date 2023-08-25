import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customApi from "../customApi/customApi"

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await customApi.get("products").catch(err => err);
        return response.data;
    }
)

const initialState = {
    data: [],
    status: null
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'success';
        })
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'pending'
        })
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = 'rejected'
        })
    }
})

export default productSlice.reducer;