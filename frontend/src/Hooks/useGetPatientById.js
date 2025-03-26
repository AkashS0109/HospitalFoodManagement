import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectPatientById,setLoading } from "../redux/patientSlice";
import axios from "axios";
import { PATIENT } from "../utils/constant";

const useGetPatientById = (id) => { 
    
      
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (!id) return; // Prevent unnecessary API call if no ID is provided
  
      const fetchPatientById = async () => {
        dispatch(setLoading(true));
        try {
          const response = await axios.get(`${PATIENT}/getdiet/${id}`); // API endpoint to fetch a specific patient
        
          dispatch(selectPatientById(response.data)); // Store the selected patient in Redux

        } catch (error) {
          console.error("Error fetching patient by ID:", error);
        } finally {
          dispatch(setLoading(false));
        }
      };
  
      fetchPatientById();
    }, [id, dispatch]); // Include `id` in the dependency array to refetch if it changes
  };
  
  export default useGetPatientById;
  