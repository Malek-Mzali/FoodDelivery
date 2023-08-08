import { createSlice } from "@reduxjs/toolkit"
import { getAllCartFoods, getTotalCartItemPrice } from "../../utils/helpers"

const initialState = {
  items: [],
  fees : 0.00,
}

const authSlice = createSlice({
  name: "busket",
  initialState,
  reducers: {
    updateBusket: (state, action) => {
      state.items = action.payload
    },
    emptyBusket: (state, action) => {
      state.items = []
    },
    addFees: (state, action) => {
      state.fees = 3.00
    },
    removeFees: (state, action) => {
      state.fees = 0.00
    },
  }
})

export const { updateBusket, emptyBusket, addFees, removeFees } = authSlice.actions

export const selectCartItems = state => state.busket.items
export const selectCartFees = state => state.busket.fees
export const selectTotalPrice = (state) => parseFloat(getTotalCartItemPrice(state.busket.items)) + state.busket.fees
export const selectTotalItems = (state) => getAllCartFoods(state.busket.items)


export default authSlice.reducer
