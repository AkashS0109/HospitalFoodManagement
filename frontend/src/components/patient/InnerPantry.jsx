import React, { useState, useEffect } from "react";
import axios from "axios";
import useGetPendingMealData from "../../Hooks/useGetPendingMealData";
import { useSelector } from "react-redux";
import { PANTRY } from "../../utils/constant";
import { USE } from "../../utils/constant";
import { DietChart } from "../../../../backend/Schema/DietChat";
import Navbar from "../Navbar";
const InnerPantry = () => {

  const [users, setUsers] = useState([]);  // for storing user data ex cook and chef
 
  const [selectedDiet, setSelectedDiet] = useState(null); // For storing the selected diet chart and patient details
  const [formData, setFormData] = useState({
    cookId: "",
    deliveryPersonnelId: "",
    status: "Pending", // Default value as per schema
    deliveryTime: "", // Empty for initial value
  });

  useGetPendingMealData();
 
const pendingDiets = useSelector((state) => state.diet.pendingDiets);
  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response =await axios.get(`${USE}/getallmembers`);
        setUsers(response.data.users);  // data  is stored in  users
       
      } catch (error){
        console.error("Error fetching personnel:", error);
      }
    };

    fetchPersonnel();
  }, []);

  const handleSelectDiet = (diet) => {
    if (selectedDiet?._id === diet._id) {
      setSelectedDiet(null); // Deselect the diet if it's already selected
    } else {
      setSelectedDiet(diet); // Select the diet if it's not already selected
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDiet || !formData.cookId || !formData.deliveryPersonnelId || !formData.status || !formData.deliveryTime) {
      alert("Please fill in all fields.");
      return;
    }

    const { patientId} = selectedDiet;
    const  dietChartId =selectedDiet._id;

    try {
      const data= await axios.post(PANTRY, {
        patientId,
         dietChartId,
        cookId: formData.cookId,
        deliveryPersonnelId: formData.deliveryPersonnelId,
        status: formData.status,

        deliveryTime: formData.deliveryTime,
      });
   
      alert("Assignment successful!");
      setFormData({
        cookId: "",
        deliveryPersonnelId: "",
        status: "Pending",
        deliveryTime: "",
      });
      setSelectedDiet(null); // Clear selected diet
    } catch (error) {
      console.error("Error assigning personnel:", error);
      alert("Failed to assign personnel. Please try again.");
    }
  };

  return (
    <>
  <Navbar />
  <div className="flex justify-center items-center h-screen">
    <div className="w-full lg:w-1/2 lg:p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="font-bold text-2xl text-center">Assign Meal Delivery</h2>

      {/* Pending Diets Table */}
      <div className="mb-5">
        <h3 className="font-bold text-xl text-center">Pending Diets</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-400">
              <th className="border border-gray-300 p-2">Patient Name</th>
              <th className="border border-gray-300 p-2">Diet</th>
              <th className="border border-gray-300 p-2">Floor</th>
              <th className="border border-gray-300 p-2">Room</th>
              <th className="border border-gray-300 p-2">Bed No</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {pendingDiets.data && Array.isArray(pendingDiets.data) && pendingDiets.data.length > 0 ? (
              pendingDiets.data.map((dietObj) => (
                <tr key={dietObj._id}>
                  <td className="border border-gray-300 p-2">{dietObj.patientId.name || "No Name"}</td>
                  <td className="border border-gray-300 p-2">
                    {dietObj.diet?.length > 0 ? dietObj.diet[0].itemName || "No Diet Details" : "No Diet Available"}
                  </td>
                  <td className="border border-gray-300 p-2">{dietObj.patientId.floorNumber || "No Name"}</td>
                  <td className="border border-gray-300 p-2">{dietObj.patientId.roomNumber || "No Name"}</td>
                  <td className="border border-gray-300 p-2">{dietObj.patientId.bedNumber || "No Name"}</td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedDiet?._id === dietObj._id}
                        onChange={() => handleSelectDiet(dietObj)}
                        className="cursor-pointer"
                      />
                      <span className="ml-2">{selectedDiet?._id === dietObj._id ? "Selected" : "Select"}</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-2">No pending diets available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Assignment Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {selectedDiet && (
          <div className="bg-gray-50 p-4 border-2 flex flex-col gap-2">
            <h2 className="font-bold">Patient Name: <span className="text-red-500">{selectedDiet.patientId.name}</span></h2>
            <h2 className="font-bold">Diet with Instructions: <span className="text-red-500">{selectedDiet.diet[0].itemName} with {selectedDiet.instructions}</span></h2>
            <h2 className="font-bold">Diet Type: <span className="text-red-500">{selectedDiet.diet_type}</span></h2>
          </div>
        )}

        <div className="flex flex-row justify-between gap-6">
          <div className="flex flex-col w-1/2">
            <label className="font-bold text-lg" htmlFor="cookId">Select Cook</label>
            <select id="cookId" name="cookId" value={formData.cookId} onChange={handleChange} required className="bg-gray-50 px-4 p-2 w-full rounded-md">
              <option value="" disabled>Select Cook</option>
              {users.map((user) => user.role === 'cook' && (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-1/2">
            <label className="font-bold text-lg" htmlFor="deliveryPersonnelId">Delivery Personnel</label>
            <select id="deliveryPersonnelId" name="deliveryPersonnelId" value={formData.deliveryPersonnelId} onChange={handleChange} required className="bg-gray-50 px-4 p-2 w-full rounded-md">
              <option value="" disabled>Select a Delivery Guy</option>
              {users.map((user) => user.role === 'delivery' && (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-6">
          <div className="flex flex-col w-1/2">
            <label className="font-bold text-lg" htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} required className="bg-gray-50 px-4 p-2 w-full rounded-md">
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="flex flex-col w-1/2">
            <label className="font-bold text-lg" htmlFor="deliveryTime">Delivery Time</label>
            <input type="datetime-local" id="deliveryTime" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} required className="bg-gray-50 px-4 p-2 w-full rounded-md" />
          </div>
        </div>

        <button type="submit" className="bg-green-500 text-white font-bold p-2 rounded-md hover:bg-green-300">Assign</button>
      </form>
    </div>
  </div>
</>

  );
};

export default InnerPantry;