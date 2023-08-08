import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../configs/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";


const initialState = {
  home: null,
  work: null,
};

const addSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addHome:  (state, action) => {
      state.home = action.payload;
       setDoc(doc(db, "users", auth.currentUser.uid),{
          Home: action.payload,
        },
        {merge: true}
      ).catch((error) => console.log("the problem"));
    },
    removeHome: (state) => {
      state.home = null;
    },
    addWork:  (state, action) => {
      state.work = action.payload;
       setDoc(doc(db, "users", auth.currentUser.uid), {
            Work: action.payload,
          },
          {merge: true}
      ).catch((error) => console.log("the problem 2"));
    },
    removeWork: (state) => {
      state.work = null;
    },
  },
});

export const { addHome, removeHome, addWork, removeWork } = addSlice.actions;

export const selectAdress = (state) => state.address;

export default addSlice.reducer;
