import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { Link } from "react-router-dom";
import PendingAdminDiet from "./PendingAdminDiet";

const Hero = () => {
  const date = new Date().toLocaleDateString();

  return (
    <div className=" ">
    <Box display="flex  "  >
      <Box
        sx={{
          width: { xs: "100%", }, // Full width on small screens, 85% on large screens
          p:{xs:1,lg: 10},
          overflowY: "auto",
          height: "100vh",
           backgroundColor:""
        }}
      >
        <Typography variant="h4" textAlign="center" mb={3}>
          Hospital Dashboard - {date}
        </Typography>

        {/* Graph Section */}
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
  {/* Patient Admission Over Time */}
  <Grid item xs={12} sm={4} lg={3} >
    <Paper elevation={3} sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",borderRadius:4  }}>
      <Typography variant="h6" textAlign="center">Patient Admissions Over Time</Typography>
      <LineChart
        series={[{ data: [10, 30, 50, 70, 90], label: "Admissions" ,color: '#0000ff'}]}
        width={300}
        height={200}
        
        
      />
    </Paper>
  </Grid>

  {/* Diet Plan Distribution */}
  <Grid item xs={12}  sm={4} lg={3}>
    <Paper elevation={3} sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" ,borderRadius:4 }}>
      <Typography variant="h6" textAlign="center">Diet Plan Distribution</Typography>
      <PieChart
        series={[{ data: [{ value: 40, label: "Vegetarian" ,  color: "#4CAF50" }, { value: 30, label: "Vegan" ,color: "#FF9070"  }, { value: 30, label: "Non-Vegetarian",color: "#F44336",borderRadius:4  }] }]}
        width={300}
        height={200}
      />
    </Paper>
  </Grid>

  {/* Meal Delivery Time Analysis */}
  <Grid item xs={12}  sm={5} lg={3}>
    <Paper elevation={3} sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",borderRadius:4 }}>
      <Typography variant="h6" textAlign="center">Meal Delivery Time Analysis</Typography>
      <BarChart
        series={[{ data: [20, 35, 40, 50, 60], label: "Delivery Time (mins)",color:"#4CAF50",  }]}
        width={300}
        height={200}
      />
    </Paper>
  </Grid>
</Grid>


       <div className=" flex w-full justify-center items-center">
        {/* Additional Component Below the Graphs */}
        <Box mt={3}   sx={{
          width: { xs: "100%", lg: "85%" }, }}>
          <PendingAdminDiet />
        </Box>
        </div>
      </Box>
    </Box>
    </div>
  );
};

export default Hero;
