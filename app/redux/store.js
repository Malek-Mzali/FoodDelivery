import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import busketReducer from "./slices/basketSlice";
import addSlice from "./slices/AdressSlice";
import addSliceAdress from "./slices/AdressSelection";
import addRoleSlice from "./slices/RoleSlice";

export const store = configureStore({
  reducer: {
    busket: busketReducer,
    auth: authReducer,
    address: addSlice,
    SelectAddress: addSliceAdress,
    deliverer: addRoleSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});
