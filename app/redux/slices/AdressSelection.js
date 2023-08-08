import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  home: false,
  work: false,
  other: "",
};

const addSliceAdress = createSlice({
  name: "SelectAddress",
  initialState,
  reducers: {
    SelectHome: (state, action) => {
      state.home = action.payload;
    },
    SelectWork: (state, action) => {
      state.work = action.payload;
    },
    SelectOther: (state, action) => {
      state.other = action.payload;
    },

  },
});

export const { SelectHome, SelectWork, SelectOther } = addSliceAdress.actions;

export const selectAdressChoice = (state) => state.SelectAddress;

export default addSliceAdress.reducer;
