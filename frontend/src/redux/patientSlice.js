import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  selectedPatient: null,
  loading: false, // Ensure this is initialized properly
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatients: (state, action) => {
     
      state.patients = action.payload; // Ensure payload is an array
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Ensure payload is a boolean
    },
    selectPatientById: (state, action) => {
      state.selectedPatient = action.payload;
    },
  },
});

export const { setPatients, setLoading, selectPatientById } = patientSlice.actions;
export const patientReducer = patientSlice.reducer;
