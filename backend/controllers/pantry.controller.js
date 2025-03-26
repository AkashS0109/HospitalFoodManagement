import { DietChart } from "../Schema/DietChat.js";
import { MealDelivery } from "../Schema/mealDeliverySchema.model.js";
import { Patient } from "../Schema/patient.model.js";
export const getAllPendingDiets = async (req, res) => {
  try {
    // Step 1: Get all `dietChartId` entries from MealDelivery
    const deliveredDietIds = await MealDelivery.find({}, 'dietChartId'); // Only fetch dietChartId field
    const deliveredDietIdArray = deliveredDietIds.map((delivery) => delivery.dietChartId.toString()); // Extract IDs

    // Step 2: Query DietChart for entries not in the deliveredDietIdArray
    const pendingDiets = await DietChart.find({
      _id: { $nin: deliveredDietIdArray }, // Exclude delivered diets
    }).populate('patientId', 'name bedNumber floorNumber roomNumber'); // Populate patient details

    // Step 3: Handle cases with no pending diets
    if (pendingDiets.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No pending diets found without meal delivery.',
      });
    }

    // Step 4: Return pending diets
    return res.status(200).json({
      success: true,
      data: pendingDiets,
    });
  } catch (error) {
    console.error('Error fetching pending diets:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};


//setting diet for cooking & delivering

export const setDietOrder= async (req,res)=>{
  const {patientId,dietChartId,cookId,deliveryPersonnelId,status,deliveryTime}= req.body;
  console.log(dietChartId)
try {   
    
   const existDiet = await MealDelivery.findOne({
    patientId: patientId,
    deliveryTime:deliveryTime,
    dietChartId:dietChartId
   })
  
   if(existDiet){
     res.status(400).json({message:"Diet Already Set for the patient for this time "})   
   }
  
  const setMeal = new MealDelivery({
    patientId,dietChartId,cookId,deliveryPersonnelId,status,deliveryTime
  })
  await setMeal.save();
  return res.status(200).json({
    message:"Meal is Send for Cooking"
  })

  }
 catch (error) {
  console.log(error);
}
}


// one function is fetched by the delivery guy id that tells him about diet details and patient
// 2nd funciton is for cokker guy to fetch details of cooking 

