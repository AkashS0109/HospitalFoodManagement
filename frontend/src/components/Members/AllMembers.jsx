import React from 'react';
import {TableBody, TableCell, TableContainer,TableHead,TableRow,Table} from '@mui/material';
import useGetAllMembers from '../../Hooks/useGetAllMembers';
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"
import Navbar from '../Navbar';

const AllMembers = () => {
  const navigate =useNavigate()
  const { members }= useSelector((state) => state.member);

 const handleAddMember=(e)=>{
     navigate('/members/addmember');

 }



  useGetAllMembers();
  return (
    <><Navbar/>
       <div className='flex flex-col items-center justify-center md:m-10 pt-20 lg:mt-20 '>
          <h2 className='font-bold md:text-2xl text-xl'>Members Table</h2>
    <div className=" lg:w-3/4  w-full   flex justify-center md:p-5">
      <TableContainer className="md:w-6/10 w-full  border-gray-150">
        <Table>
          <TableHead>
            <TableRow className='bg-gray-400  '>
              <TableCell  sx={{fontSize:'1rem', fontWeight:600}}>Member Name</TableCell>
              <TableCell sx={{fontSize:'1rem', fontWeight:600}}> Role</TableCell>
              <TableCell sx={{fontSize:'1rem', fontWeight:600}}> Phone</TableCell>
              <TableCell sx={{fontSize:'1rem', fontWeight:600}}>Email</TableCell>
              <TableCell align="center" sx={{fontSize:'1rem', fontWeight:600}}>Actions</TableCell>
            </TableRow>
          </TableHead>
      
          <TableBody>
            {/* Example Empty Row */}
           
            {
              members.map((member,index)=>(
                <TableRow key={member._id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.phoneNo}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.status}</TableCell>
                </TableRow>
              ))
            }
              
         

            {/* Add Members Button Row */}
            <TableRow>
              <TableCell colSpan={5} align="center">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition" onClick={handleAddMember}>
                  Add Members
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
    </>
  );
};

export default AllMembers;
