import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    brands: [],
    stock: false,
    keyword: '',
}

const filterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleStock: (state) => {
            state.stock = !state.stock;
        },
        toggleBrand: (state, action) => {
            if (!state.brands.includes(action.payload)) {
                state.brands.push(action.payload)
            }
            else {
                state.brands = state.brands.filter(brand => brand !== action.payload)
            }
        }
    }
})

export const { toggleStock, toggleBrand } = filterSlice.actions;
export default filterSlice.reducer;
