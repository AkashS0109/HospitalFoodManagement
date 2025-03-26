import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetPatientById from "../../Hooks/useGetPatientById";
import { PATIENT } from "../../utils/constant";

// already responsive for all devices 


const SetDiet = () => {
  const { id } = useParams(); // Get the patient ID from the URL
  const navigate = useNavigate();
  useGetPatientById(id);
  const selectedPatient = useSelector((state) => state.patient.selectedPatient);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    diet_type: "Morning", // default value
    diet: [{ itemName: "", quantity: "" }],
    instructions: "",
  });

  useEffect(() => {
    if (selectedPatient) {
      setFormData((prevState) => ({
        ...prevState,
        name: selectedPatient.name || "", // Pre-fill patient name
      }));
    }
  }, [selectedPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDietChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDiet = [...formData.diet];
    updatedDiet[index][name] = value;
    setFormData((prevState) => ({
      ...prevState,
      diet: updatedDiet,
    }));
  };

  const handleAddDietItem = () => {
    setFormData((prevState) => ({
      ...prevState,
      diet: [...prevState.diet, { itemName: "", quantity: "" }],
    }));
  };

  const handleRemoveDietItem = (index) => {
    const updatedDiet = formData.diet.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      diet: updatedDiet,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${PATIENT}/getdiet/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Diet plan submitted successfully!");
        navigate("/innerpantry");
      } else {
        toast.error("Failed to submit diet plan. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the diet plan. Please try again.");
    }
  };

  return (
    <div className="flex mt-5 justify-center items-center flex-col">
      <ToastContainer />
      <h1 className="mt-5 font-bold text-2xl text-center">Submit Diet Plan</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Patient Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date:
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Diet Type:
          </label>
          <select
            name="diet_type"
            value={formData.diet_type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Diet Items:
          </label>
          {formData.diet.map((dietItem, index) => (
            <div key={index} className="flex flex-wrap items-center space-x-2 mb-2">
              <input
                type="text"
                name="itemName"
                placeholder="Food Item Name"
                value={dietItem.itemName}
                onChange={(e) => handleDietChange(index, e)}
                className="flex-grow p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                value={dietItem.quantity}
                onChange={(e) => handleDietChange(index, e)}
                className="flex-grow p-2 border border-gray-300 rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveDietItem(index)}
                className="p-2 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddDietItem}
            className="mt-2 p-2 bg-blue-500 text-white rounded-md"
          >
            Add Diet Item
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Instructions:
          </label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded-md"
          >
            Submit it for Cooking
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetDiet;
