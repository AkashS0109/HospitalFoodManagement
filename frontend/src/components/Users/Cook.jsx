import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client"; // ✅ Import Socket.IO Client
import axios from "axios";
import { COOK } from "../../utils/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";

const Cook = () => {
  const user = useSelector((store) => store.auth.user);
  const id = user?._id;
  const [patientFoodData, setPatientFoodData] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // ✅ Connect to the Socket.IO server instead of using WebSockets
    const socketInstance = io("http://localhost:8000"); // Change URL if needed
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("✅ Connected to Socket.IO Server:", socketInstance.id);
    });

    socketInstance.on("statusUpdated", (updatedData) => {
    
      setPatientFoodData((prevData) =>
        prevData.map((item) =>
          item._id === updatedData.itemId ? { ...item, status: updatedData.status } : item
        )
      );
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Disconnected from Socket.IO server");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(COOK, { id });
        if (response?.data) {
          setPatientFoodData(response.data);
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch patient food data.");
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleStatusChange = (itemId, newStatus) => {
    setPatientFoodData((prevData) =>
      prevData.map((item) =>
        item._id === itemId ? { ...item, status: newStatus } : item
      )
    );

    // ✅ Emit status update event to the backend
    if (socket) {
      socket.emit("changeStatus", { itemId, status: newStatus });
      
    }

    // ✅ Update status in the database
    axios
      .post(`${COOK}/updatestatus`, { itemId, status: newStatus })
      .then((response) => {
        if (response.status === 200) {
          console.log("✅ Status updated in database");
        } else {
          toast.error("Failed to update status in database");
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error("Failed to update status in database.");
      });
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center  min-h-screen bg-gray-100 p-4">
    
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Cook's Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Manage patient meals and update the cooking status.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Patient Name</th>
                <th className="p-2 border">Food</th>
                <th className="p-2 border">Instructions</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {patientFoodData.map((item) => (
                <tr key={item._id} className="border">
                  <td className="p-2 border">{item.patientDetails?.name || "N/A"}</td>
                  <td className="p-2 border">
                    {Array.isArray(item.dietDetails?.diet) && item.dietDetails.diet.length > 0 ? (
                      item.dietDetails.diet.map((dietItem) => (
                        <div key={dietItem._id}>{dietItem.itemName}</div>
                      ))
                    ) : (
                      <p>No Diet Assigned</p>
                    )}
                  </td>
                  <td className="p-2 border">{item.instructions || "No Instructions"}</td>
                  <td className="p-2 border">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      className="p-2 border rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Cooking in Progress">Cooking in Progress</option>
                      <option value="Ready for Delivery">Ready for Delivery</option>      
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="mt-6 text-center text-gray-600">
          <p>© 2025 Hospital Food Management System. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
    </>
  );
};

export default Cook;
