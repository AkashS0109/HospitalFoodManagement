import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPatients } from '../../redux/patientSlice'; // Example action

import {PATIENT} from "../../utils/constant"
import Navbar from '../Navbar';
const AddPatient = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contactInfo: '',
    emergency: '',
    roomNumber: '',
    bedNumber: '',
    floorNumber: '',
    diseases: '',
    allergies: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${PATIENT}/addpatient`, formData,{withCredentials:true});
      alert('Patient added successfully!');
      dispatch(setPatients(formData))
       setFormData({ name: '',
        age: '',
        gender: '',
        contactInfo: '',
        emergency: '',
        roomNumber: '',
        bedNumber: '',
        floorNumber: '',
        diseases: '',
        allergies: '',})
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Failed to add patient. Please try again.');
    }
  };

  return (
    <><Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-10">
      <div className="w-full max-w-lg p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Add Patient Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2">Patient Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2">Emergency Contact</label>
            <input
              type="text"
              name="emergency"
              value={formData.emergency}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Room Number</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Bed Number</label>
              <input
                type="text"
                name="bedNumber"
                value={formData.bedNumber}
                onChange={handleChange}
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Floor Number</label>
              <input
                type="text"
                name="floorNumber"
                value={formData.floorNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2">Diseases</label>
            <textarea
              name="diseases"
              value={formData.diseases}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 font-medium mb-2">Allergies</label>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Patient
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddPatient;
