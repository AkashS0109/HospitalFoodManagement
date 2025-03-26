import { useEffect, useState } from "react";
import { ADMIN } from "../utils/constant";
import axios from "axios";
import { io } from "socket.io-client";

const PendingAdminDiet = () => {
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const response = await axios.get(`${ADMIN}`);
        console.log(response.data)
        setDiets(response.data);
       
      } catch (error) {
        console.error("Error fetching diets:", error);
      }
    };

    fetchDiets();

    const socket = io("http://localhost:8000");

    socket.on("statusUpdate", (updatedDiet) => {
      setDiets((prevDiets) =>
        prevDiets.map((diet) =>
          diet._id === updatedDiet._id ? { ...diet, status: updatedDiet.status } : diet
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="flex justify-center items-center lg:p-4 p-2">
      <div className="w-full lg:w-3/5 xl:w-4/5 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Pending Diets</h2>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-center min-w-[600px]">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Patient Name</th>
                <th className="p-2 border">Diet</th>
                <th className="p-2 border">Cook</th>
                <th className="p-2 border">Delivery</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {diets.map((diet) => (
                <tr key={diet._id} className="border">
                  <td className="p-2 border">{diet.patientId.name}</td>
                  <td className="p-2 border">{diet.patientId.name}</td>
                  <td className="p-2 border">{diet.cookId.name}</td>
                  <td className="p-2 border">{diet.deliveryPersonnelId.name}</td>
                  <td
                    className={`p-2 border ${
                      diet.status === "Delivered" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {diet.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingAdminDiet;