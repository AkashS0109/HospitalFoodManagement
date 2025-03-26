import mongoose from "mongoose";
import { MealDelivery } from "../Schema/mealDeliverySchema.model.js";


export const getAllDietsForDelivery = async (req, res) => {
  try {
    const deliveryId = req.body.id;

    if (!deliveryId) {
      return res.status(400).json({ error: "Delivery Personnel ID is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(deliveryId)) {
      return res.status(400).json({ error: "Invalid Delivery Personnel ID." });
    }

  

    // Check if deliveryPersonnelId exists in the database
    const existingDelivery = await MealDelivery.findOne({ deliveryPersonnelId: new mongoose.Types.ObjectId(deliveryId) });
   

    if (!existingDelivery) {
      return res.status(404).json({ error: "No meal deliveries found for this delivery personnel." });
    }

    // MongoDB aggregation pipeline
    const data = await MealDelivery.aggregate([
      {
        $match: { deliveryPersonnelId: new mongoose.Types.ObjectId(deliveryId) } 
      },
      {
        $lookup: {
          from: "dietcharts",
          localField: "dietChartId",
          foreignField: "_id",
          as: "dietDetails"
        }
      },
      {
        $lookup: {
          from: "patients",
          localField: "patientId",
          foreignField: "_id",
          as: "patientDetails"
        }
      },
      { $unwind: { path: "$dietDetails", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$patientDetails", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          deliveryPersonnelId: 1,
          patientId: 1,
          status: 1,
          deliveryTime: 1,
          "dietDetails.diet": 1,
          "dietDetails.instructions": 1,
          "dietDetails.date": 1,
          "patientDetails.name": 1,
          "patientDetails.age": 1,
          "patientDetails.contact": 1
        }
      }
    ]);

  

    if (data.length === 0) {
      return res.status(404).json({ error: "No diet details found for this delivery personnel." });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error in getAllDietsForDelivery:", error.message);
    res.status(500).json({ error: error.message });
  }
};



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