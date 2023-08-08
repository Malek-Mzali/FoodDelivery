import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  restaurantName: null,
  restaurantId: null,
};

const addRoleSlice = createSlice({
  name: "deliverer",
  initialState,
  reducers: {
    addRole: (state, action) => {
      state.role = action.payload;
    },
    addRestaurantName: (state, action) => {
      state.restaurantName = action.payload;
    },
    addRestaurantId: (state, action) => {
      state.restaurantId = action.payload;
    },
    emptyRole: (state, action) => {
      state.restaurantId = null;
      state.restaurantName = null;
      state.role = null;

    },

  },
});

export const { addRole, addRestaurantName, addRestaurantId, emptyRole } =
  addRoleSlice.actions;

export const selectDeliverer = (state) => state.deliverer;
export default addRoleSlice.reducer;
