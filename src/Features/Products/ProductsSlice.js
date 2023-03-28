import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteProduct, fetchProducts, postProduct } from "./ProductAPI"

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    postSuccess: false,
    deletesuccess: false,
    error: '',
}

export const getProducts = createAsyncThunk('Products/getProduct', async () => {
    const products = fetchProducts()
    return products;
})
export const addProduct = createAsyncThunk('Products/addProduct', async (data) => {
    const products = await postProduct(data)
    return products;
})
export const removeProduct = createAsyncThunk('Products/removeProduct', async (id, thunkAPI) => {
    const products = await deleteProduct(id)
    thunkAPI.dispatch(removefromList(id))
    return products;
})

const productsSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        togglePostsuccess: (state) => {
            state.postSuccess = false;
        },
        toggleDeletesuccess: (state) => {
            state.deletesuccess = false;
        },
        removefromList: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.products = []
                state.isError = true
                state.error = action.error.message
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.postSuccess = false
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false
                state.postSuccess = true;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.postSuccess = false;
                state.isError = true
                state.error = action.error.message
            })
            .addCase(removeProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.deletesuccess = false
            })
            .addCase(removeProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false
                state.deletesuccess = true;
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.deletesuccess = false;
                state.isError = true
                state.error = action.error.message
            })
    }
})

export const { togglePostsuccess, toggleDeletesuccess, removefromList } = productsSlice.actions;

export default productsSlice.reducer;