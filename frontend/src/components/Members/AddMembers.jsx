import React,{useState} from "react";
import { USE } from "../../utils/constant";
import { toast } from "react-toastify";
const AddMembers = () => {
 const[data ,setData]=useState({name:'',email:'',password:'',phoneNo:'',role:'',status:''})
 
const handleChange=(e)=>{
  const{name,value}=e.target
  setData({...data,[name]:value})
}

const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
    const  response = await axios.post(`${USE}/signup`,data,{headers:{  "Content-Type": "application/json" },withCredentails:true})
     if(response){
      toast("User Added Successfully");
     }
  } catch (error) {
    toast("Error",error)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add Members
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
              onChange={handleChange}
              value={data.name}
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
              onChange={handleChange}
              value={data.email}
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              onChange={handleChange}
              value={data.password}
            />
          </div>
          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phoneNo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
              onChange={handleChange}
              value={data.phoneNo}
            />
          </div>
          {/* Role */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <input
              type="text"
              name="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter role (e.g., cook, delievery)"
              onChange={handleChange}
              value={data.role}
            />
          </div>
          {/* Status */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Status</label>
            <input
              type="text"
              name="status"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter status (e.g., Present, Absent)"
              onChange={handleChange}
              value={data.status}
            />
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMembers;
