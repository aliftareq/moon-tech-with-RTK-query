import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { productApi } from "../Features/API/apiSlice";
import cartSlice from "../Features/cart/cartSlice";
import filterSlice from "../Features/filter/filterSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        filter: filterSlice,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, productApi.middleware)
})

export default store;