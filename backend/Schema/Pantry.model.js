import mongoose from "mongoose";
const pantrySchema = new mongoose.Schema({
    staffName: { type: String, required: true },
    contactInfo: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MealDelivery' }],
  }, { timestamps: true });
  
  export const Pantry =  mongoose.model('Pantry', pantrySchema);
  