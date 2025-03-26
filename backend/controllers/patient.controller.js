import { Patient } from "../Schema/patient.model.js";
import mongoose from "mongoose";
import { DietChart } from "../Schema/DietChat.js";

// Controller to add a patient
export const addPatient = async (req, res) => {
  try {
   // Log to see the incoming data

    let {
      name,
      age,
      gender,
      roomNumber,
      bedNumber,
      floorNumber,
      diseases,
      allergies,
      contactInfo,
      emergency,
    } = req.body;

    // Check if all required fields are provided
    if (!name || !age || !gender || !roomNumber || !bedNumber) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Check for duplicate patient based on unique criteria (e.g., name and roomNumber, bedNumber)
    const existingPatient = await Patient.findOne({ name, roomNumber, bedNumber });
    if (existingPatient) {
      return res.status(409).json({ message: "Patient already exists" });
    }

    // Convert diseases and allergies to arrays if they are strings
    if (typeof diseases === 'string') {
      diseases = diseases.split(",").map(disease => disease.trim()); // Split string into array and trim extra spaces
    }

    if (typeof allergies === 'string') {
      allergies = allergies.split(",").map(allergy => allergy.trim()); // Split string into array and trim extra spaces
    }

    // If no duplicate, create a new patient entry
    const patient = new Patient({
      name,
      age,
      gender,
      roomNumber,
      floorNumber,
      bedNumber,
      diseases,
      allergies,
      contactInfo,
      emergency,
    });

    // Save the new patient to the database
    await patient.save();
    return res.status(201).json({ message: "Patient added successfully", patient });
  } catch (error) {
    console.error("Error adding patient:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// Controller to get all patients
export const getAllPatients = async (req, res) => {
  try {
    // Fetch all patients from the database
    const patients = await Patient.find();

    // Check if no patients exist
    if (patients.length === 0) {
      return res.status(404).json({ message: "No patients found" });
    }

    // Return the list of patients
    return res.status(200).json({ patients });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to get a patient by ID
export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request parameters

    // Check if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    // Find the patient by ID in the database
    const patient = await Patient.findById(id);

    if (patient) {
      // Return the patient details if found
      return res.status(200).json(patient);
    } else {
      // Return a 404 response if the patient is not found
      return res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching patient by ID:", error);

    // Return a 500 response if there is a server error
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const setDietById = async (req, res) => {
  try {
    const { id } = req.params; // Patient ID from the URL
    const { date, diet_type, diet, instructions } = req.body; // Destructure request body

    // Validate required fields
    if (!date || !diet || diet.length === 0) {
      return res.status(400).json({
        message: "Date and diet items are required",
      });
    }
     
     const doublicatediet = await Patient.findById(id);
       
      
    // Check each diet item for required fields
    const invalidDietItems = diet.some(
      (item) => !item.itemName || !item.quantity
    );

    if (invalidDietItems) {
      return res.status(400).json({
        message: "Each diet item must have 'itemName' and 'quantity'",
      });
    }

    // Validate if the patient exists
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    
    const existingDietChart = await DietChart.findOne({ 
      patientId: id, 
      date: date,
      diet_type: diet_type 
    });

    if (existingDietChart) {
      return res.status(400).json({
        message: `You can't set more than one diet for the same meal type (${diet_type}) on the same date. Please use the food management feature to update the existing diet.`,
      });
    }


    // Create a new diet chart
    const newDietChart = new DietChart({
      patientId: id, // Associate with the patient
      date,
      diet_type,
      diet,
      instructions,
    });

    // Save the diet chart to the database
    await newDietChart.save();

    return res.status(201).json({
      message: "Diet chart created successfully",
      dietChart: newDietChart,
    });
  } catch (error) {
    console.error("Error setting diet:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
