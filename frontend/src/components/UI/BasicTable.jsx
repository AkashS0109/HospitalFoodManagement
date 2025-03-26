import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

export default function BasicTable({ patients }) {
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor
  const [menuIndex, setMenuIndex] = useState(null); // State to track which row's menu is open

  const navigate = useNavigate();

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
  };

  const handleMenuItemClick = (id) => {
    handleClose(); // Close the menu first
    navigate(`/patients/setdiet/${id}`); // Navigate after closing the menu
  };

  return (
    <div className="w-full lg:max-w-screen-lg mx-auto mt-6 lg:px-5 sm:px-0 ">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="patients table">
          <TableHead sx={{ backgroundColor: "#D3D3D1" }}>
            <TableRow>
              <TableCell sx={{ fontSize: '1rem', fontWeight: '600' }}>Patient Name</TableCell>
              <TableCell align="right" sx={{ fontSize: '1rem', fontWeight: '600' }}>Gender(Age)</TableCell>
              <TableCell align="right" sx={{ fontSize: '1rem', fontWeight: '600' }}>Floor</TableCell>
              <TableCell align="right" sx={{ fontSize: '1rem', fontWeight: '600' }}>Room</TableCell>
              <TableCell align="right" sx={{ fontSize: '1rem', fontWeight: '600' }}>Bed</TableCell>
              <TableCell align="right" sx={{ fontSize: '1rem', fontWeight: '600' }}>Phone_Number</TableCell>
              <TableCell align="right" sx={{ fontSize: '1rem', fontWeight: '600' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
       
            {patients.map((patient, index) => (
              <TableRow key={patient._id || index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {patient.name}
                </TableCell>
                <TableCell align="right">{`${patient.gender} (${patient.age})`}</TableCell>
                <TableCell align="right">{patient.floorNumber}</TableCell>
                <TableCell align="right">{patient.roomNumber}</TableCell>
                <TableCell align="right">{patient.bedNumber}</TableCell>
                <TableCell align="right">{patient.contactInfo}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="more"
                    aria-controls={`menu-${index}`}
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, index)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`menu-${index}`}
                    anchorEl={menuIndex === index ? anchorEl : null}
                    open={menuIndex === index && Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => handleMenuItemClick(patient?._id)}>
                      Set Diet
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
