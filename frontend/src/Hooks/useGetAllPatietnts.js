// useGetAllPatients.js
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPatients, setLoading } from '../redux/patientSlice';
import { PATIENT } from '../utils/constant';

const useGetAllPatients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPatients = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${PATIENT}`); // Ensure the correct API endpoint
         
          dispatch(setPatients(response.data.patients)); 
   
        }
       catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchPatients();
  }, [dispatch]);

  return;
};

export default useGetAllPatients;
