import {MealDelivery} from "../Schema/mealDeliverySchema.model.js"; 

export const getAllPendingDiet = async (req, res) => {
    try {
        // Find all meal deliveries where status is NOT "Delivered" and populate referenced schemas
       
        const pendingDiets = await MealDelivery.find({ status: { $ne: "Delivered" } })
            .populate("patientId", "name") // Get patient name
            .populate("cookId", "name") // Get cook name
            .populate("deliveryPersonnelId", "name"); // Get delivery boy name

        res.status(200).json(pendingDiets);
    } catch (error) {
        console.error("Error fetching pending diets:", error);
        res.status(500).json({ message: "Error fetching pending diets", error });
    }
};





 
