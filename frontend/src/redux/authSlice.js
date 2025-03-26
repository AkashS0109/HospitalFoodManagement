import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,       // Indicates if an authentication-related operation is ongoing
  user: null,           // Stores user information when logged in
            // Stores any error message related to authentication
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload; // Sets the loading state (true or false)
    },
    setUser: (state, action) => {
      state.user = action.payload; // Sets user information when logged in
    },
   
  },
});

// Export actions to use in components
export const { setLoading, setUser, setToken, setError, logout } = authSlice.actions;

// Export the reducer to be added to the store
export const authSliceReducer = authSlice.reducer;
