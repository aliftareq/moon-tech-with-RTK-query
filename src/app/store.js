import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import cartSlice from "../Features/cart/cartSlice";
import filterSlice from "../Features/filter/filterSlice";
import ProductsSlice from "../Features/Products/ProductsSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        filter: filterSlice,
        product: ProductsSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store;