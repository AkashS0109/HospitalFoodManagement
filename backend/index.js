// import express from "express";
// import cors from "cors";
// import patientRoute from "./Router/patients.route.js";
// import pantryRoute from "./Router/pantry.route.js"
// import userRoute from "./Router/user.route.js"
// import { connectDB } from "./DB/db.js";
// import dotenv from "dotenv";
// import cookieParser from 'cookie-parser';

// dotenv.config({}); // Load environment variables

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());


// // CORS Options
// const corsOptions = {
//   origin: ["http://localhost:5174"],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// };
// app.use(cors(corsOptions));





// // Routes
// app.use("/api/user",userRoute);
// app.use("/api/patients", patientRoute);
// app.use("/api/pantry",pantryRoute);





// // Start the server and connect to the database
// const PORT = process.env.PORT || 3000;
// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server started on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Failed to connect to the database", error);
//     process.exit(1); // Exit the process if the DB connection fails
//   });
import express from "express";
import cors from "cors";
import patientRoute from "./Router/patients.route.js";
import pantryRoute from "./Router/pantry.route.js";
import userRoute from "./Router/user.route.js";
import cookRoute from "./Router/cook.route.js";
import deliveryRoute from "./Router/delivery.route.js";
import { connectDB } from "./DB/db.js";
import dotenv from "dotenv";
import adminRoute from "./Router/admin.route.js";
import cookieParser from "cookie-parser";
import { createServer } from "http"; 
import initializeSocket from "./socket.js"; // Import WebSocket initialization

dotenv.config(); 

const app = express();
const httpServer = createServer(app); // Create HTTP server
initializeSocket(httpServer); // Initialize WebSocket

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Options
const corsOptions = {
  origin: ["http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/patients", patientRoute);
app.use("/api/pantry", pantryRoute);
app.use("/api/cook", cookRoute);
app.use("/api/delivery",deliveryRoute)

// Start the server and connect to the database
const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });
