import React, { useEffect, useState } from "react";

const FoodManagement = () => {
  

  useEffect(() => {
    // Fetch data from the API route
    const fetchData = async () => {
      try {
        const response = await fetch(`${FOODETAILS}`); // Replace with your actual route
        const data = await response.json();

         //  here redux wil come
        //setPatients(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    if (status === "Delivered") return "text-green-500";
    if (status === "Pending") return "text-yellow-500";
    if (status === "Not Delivered") return "text-red-500";
    return "text-gray-500";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full flex items-center flex-col ">
      <h1 className="text-2xl font-bold mb-4">Food Management</h1>
      <div className="overflow-x-auto">
        <table className=" border border-gray-300 bg-white shadow-lg w-full">
          <thead>
            <tr className="bg-gray-200 ">
              <th className="px-10 py-4 text-left">Patient Name</th>
              <th className="px-10 py-2 text-left">Floor</th>
              <th className="px-10 py-2 text-left">Room No</th>
              <th className="px-10 py-2 text-left">Bed Number</th>
              <th className="px-10 py-2 text-left">Cook</th>
              <th className="px-10 py-2 text-left">Delivered</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-2">{patient.name}</td>
                <td className="px-4 py-2">{patient.floorNumber}</td>
                <td className="px-4 py-2">{patient.roomNumber}</td>
                <td className="px-4 py-2">{patient.bedNumber}</td>
                <td className={`px-4 py-2 ${getStatusColor(patient.status)}`}>
                  {patient.cookstatus}
                </td>
                <td className={`px-4 py-2 ${getStatusColor(patient.status)}`}>
                  {patient.deileverstatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodManagement;
