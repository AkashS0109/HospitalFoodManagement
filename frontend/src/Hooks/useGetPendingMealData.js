import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // Don't forget to import axios
import { setPendingDiets } from '../redux/dietSlice';
import { PANTRY } from '../utils/constant';

const useGetPendingMealData = () => {
  const dispatch = useDispatch();

  // Correctly destructuring the data from Redux state
  const pendingDiets = useSelector((state) => state.diet.pendingDiets);  // Updated to match Redux state structure

  useEffect(() => {
    const fetchPendingMeals = async () => {
      try {
        const response = await axios.get(PANTRY); // Ensure PANTRY is defined as the correct API URL

        if (response.status !== 200) {  // Check for successful status code (200)
          throw new Error('Failed to fetch pending meals');
        }

        // Dispatch the data to Redux
      
        dispatch(setPendingDiets(response.data));

      } catch (error) {
        console.error('Error fetching pending meals:', error);
      }
    };

    fetchPendingMeals();
  }, [dispatch]);

  return  {pendingDiets};  // Returning the correct data from the Redux state
};

export default useGetPendingMealData;
