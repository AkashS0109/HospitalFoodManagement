import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import axios from "axios";
import image from "./imas.jpg";
import { USE } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" }); // Single object for form data
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${USE}/login`,
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      );
  
      // Check if login is successful and navigate accordingly
      if (response.data && response.data.user) {

         dispatch(setUser(response.data.user))
        const role = response.data.user.role;
        if (role === "admin") {
          navigate("/admin");
          toast.success("Welcome, Admin!");
        } else if (role === "cook") {
          navigate("/cook");
          toast.success("Welcome, Cook!");
        } else if (role === "delivery") {
          navigate("/delivery");
          toast.success("Welcome, Delivery!");
        } else {
          toast.warning("Role not recognized. Please contact support.");
        }
     
      } else {
        throw new Error("Invalid login response from the server.");
      }
    } catch (error) {
      // Show an error toast with a clear message
      const errorMessage = error.response?.data?.error || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error("Login failed:", error);
    }
  };
  

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage:`url(${image})`,
        backgroundSize: { xs: "cover", sm: "80%", md: "100%", lg: "100%", xl: "100%" },
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: { xs: "20px", sm: "30px", md: "40px" },
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "black" }}
          >
            Login
          </Typography>
          <TextField
            label="Email"
            name="email" // Add name to identify the input
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{ style: { color: "green", borderColor: "blue" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
          />
          <TextField
            label="Password"
            name="password" // Add name to identify the input
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{ style: { color: "green", borderColor: "blue" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              color: "white",
              backgroundColor: "blue",
              border: "1px solid blue",
              "&:hover": { backgroundColor: "rgba(100, 149, 237, 0.8)" },
            }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;