import { createSlice } from "@reduxjs/toolkit";

export const dietSlice = createSlice({
  name: 'diet',
  initialState: {
    singlePersonDiet:[],
    pendingDiets:[], // Array to store pending diets data
  },
  reducers: {
    // To store the fetched pending diets from the backend
    setPendingDiets: (state, action) => {
      state.pendingDiets = action.payload;
    },
    setCompletedDiet:(state,action)=>{
      state.pendingDiets=action.payload;
    },
    setSinglePersonDiet:(state,action)=>{
      state.singlePersonDiet=action.payload;
  },
}
});

export const { setPendingDiets ,setSinglePersonDiet } = dietSlice.actions;

export const dietReducer = dietSlice.reducer;
