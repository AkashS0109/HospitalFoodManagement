import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {USE} from "../utils/constant"
import axios from "axios";
import { setLoading, setMembers } from "../redux/membersSlice";

const useGetAllMembers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        dispatch(setLoading(true)); // Start loading
        const response = await axios.get(`${USE}/getallmembers`);
 
        dispatch(setMembers(response.data.users)); 
        console.log("response:",response.data)
      } catch (error) {
        console.error("Failed to fetch members:", error.message);
      } finally {
        dispatch(setLoading(false)); // End loading
      }
    };

    fetchWorkers();
  }, [dispatch]);
};

export default useGetAllMembers;
