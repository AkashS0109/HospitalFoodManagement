import { MealDelivery } from "../Schema/mealDeliverySchema.model.js"

export const getAllFoodDetails = async(req,res)=>{
try {
    const allDetails = await MealDelivery.find();
    if(allDetails){
        return res.status(200).json({ allDetails });
        
    }
    return res.status(200).jaon({message:"No Food Details Found"})
  
} catch (error) {
    console.log(error);
}
} 