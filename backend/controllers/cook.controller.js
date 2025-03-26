import mongoose from "mongoose";
import { MealDelivery } from "../Schema/mealDeliverySchema.model.js";

export const getAllDietsForCooking = async (req, res) => {
  try {
    const cookId = req.body.id; // Get cookId from the request body

    if (!cookId) {
      return res.status(400).json({ error: "Cook ID is required." });
    }

    // Ensure cookId is a valid ObjectId before using it
    if (!mongoose.Types.ObjectId.isValid(cookId)) {
      return res.status(400).json({ error: "Invalid Cook ID." });
    }

    // MongoDB aggregation pipeline
    const data = await MealDelivery.aggregate([
      {
        $match: { cookId: new mongoose.Types.ObjectId(cookId) } // Use 'new' with ObjectId
      },
      {
        $lookup: {
          from: "dietcharts", // Name of the DietChart collection
          localField: "dietChartId", // Field in MealDelivery
          foreignField: "_id", // Field in DietChart
          as: "dietDetails" // Joined field name
        }
      },
      {
        $lookup: {
          from: "patients", // Name of the Patient collection
          localField: "patientId", // Field in MealDelivery
          foreignField: "_id", // Field in Patient
          as: "patientDetails" // Joined field name
        }
      },
      {
        $unwind: "$dietDetails" // Flatten the dietDetails array
      },
      {
        $unwind: "$patientDetails" // Flatten the patientDetails array
      },
      {
        $project: {
          _id: 1,
          cookId: 1,
          patientId: 1,
          status: 1,
          deliveryTime: 1,
          "dietDetails.diet": 1, // Include specific fields from DietChart
          "dietDetails.instructions": 1,
          "dietDetails.date": 1,
          "patientDetails.name": 1, // Include specific fields from Patient
          "patientDetails.age": 1,
          "patientDetails.contact": 1
        }
      }
    ]);

    res.status(200).json(data); // Send the aggregated data as response
  } catch (error) {
    console.error("Error in getAllDietsForCooking:", error.message);
    res.status(500).json({ error: error.message });
  }
};


/// to update status in database
export const updateStatus=async(req,res)=>{
  const { itemId, status } = req.body;

  if (!itemId || !status) {
    return res.status(400).json({ message: 'Item ID and status are required.' });
  }

  try {
    const updatedOrder = await MealDelivery.findByIdAndUpdate(
      itemId,
      { status: status },
      { new: true } // Returns the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    return res.status(200).json({ message: 'Status updated successfully', updatedOrder });
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}