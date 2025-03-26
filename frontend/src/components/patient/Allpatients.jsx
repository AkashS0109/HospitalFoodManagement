import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddPatient from './Addpatient';
import BasicTable from '../UI/BasicTable';
import useGetAllPatients from '../../Hooks/useGetAllPatietnts';
import Navbar from '../Navbar';


const AllPatients = () => {
  const navigate = useNavigate();
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);

  // const patients = useSelector((state) => state.patients.patients);
  const patients = useSelector((state) => state.patient?.patients );
 
  useGetAllPatients(); // Fetch and store patients when the component is mounted

  const addNewPatient = () => {
    setShowAddPatientForm(true); // Show the AddNewPatient component
    navigate('/patients/addpatient');
  };

  return (
    <>
    <Navbar/>
    <div className="w-full mt-30 p-10">
     
      {showAddPatientForm ? (
        <AddPatient />
      ) : (
        <div className="m-3 ">
          <div className="flex justify-end mb-4">
            <button
              onClick={addNewPatient}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-10"
            >
              Add New Patient
            </button>
          </div>
          <h1 className="text-3xl font-bold text-center">Patients</h1>
          <div className="  flex justify-center">
            <BasicTable patients={patients} />
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AllPatients;
