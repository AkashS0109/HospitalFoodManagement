import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./protectedRoute";
import Home from "./components/Home";
import Allpatients from "./components/patient/Allpatients";
import AddPatient from "./components/patient/Addpatient";
import SetDiet from "./components/patient/SetDiet";
import InnerPantry from "./components/patient/InnerPantry";
import Login from "./components/Admin/Login";
import Cook from "./components/Users/Cook";
import Delivery from "./components/Users/Delivery";
import AllMembers from "./components/Members/AllMembers";
import AddMembers from "./components/Members/AddMembers";
import Profile from "./components/Profile";



const appRouter = createBrowserRouter([
  { path: "/", element: <Login /> },

  {
    path: "/admin",
    element: <ProtectedRoute element={<Home />} allowedRoles={["admin"]} />,
  },
  {
    path: "/patients",
    element: <ProtectedRoute element={<Allpatients />} allowedRoles={["admin"]} />,
  },
  {
    path: "/patients/addpatient",
    element: <ProtectedRoute element={<AddPatient />} allowedRoles={["admin"]} />,
  },
  {
    path: "/patients/setdiet/:id",
    element: <ProtectedRoute element={<SetDiet />} allowedRoles={["admin"]} />,
  },
  {
    path: "/innerpantry",
    element: <ProtectedRoute element={<InnerPantry />} allowedRoles={["admin"]} />,
  },
  {
    path: "/cook",
    element: <ProtectedRoute element={<Cook />} allowedRoles={["cook"]} />,
  },
  {
    path: "/delivery",
    element: <ProtectedRoute element={<Delivery />} allowedRoles={["delivery"]} />,
  },
  {
    path: "/members",
    element: <ProtectedRoute element={<AllMembers />} allowedRoles={["admin"]} />,
  },
  {
    path: "/members/addmember",
    element: <ProtectedRoute element={<AddMembers />} allowedRoles={["admin"]} />,
  },
  {
    path: "/updateprofile",
    element: <ProtectedRoute element={<Profile />} allowedRoles={["admin", "cook", "delivery"]} />,
  },
]);

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;

