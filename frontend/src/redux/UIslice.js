import { createSlice } from "@reduxjs/toolkit";
export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
      deliveries: [],
      alerts: [],
    },
    reducers: {
      setDeliveries: (state, action) => {
        state.deliveries = action.payload;
      },
      addAlert: (state, action) => {
        state.alerts.push(action.payload);
      },
      removeAlert: (state, action) => {
        state.alerts = state.alerts.filter(a => a.id !== action.payload);
      },
    },
  });
  export const {
    setDeliveries, addAlert, removeAlert
  } = dashboardSlice.actions;
  export const dashboardReducer = dashboardSlice.reducer;