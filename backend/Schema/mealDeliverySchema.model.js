import mongoose from "mongoose";
const mealDeliverySchema = new mongoose.Schema({
  patientId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  dietChartId: { type: mongoose.Schema.Types.ObjectId, ref: 'DietChart', required: true },
  cookId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required:true },
  deliveryPersonnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Pending','Cooking in Process','Ready for delivery','Delivered'] , default: null },
  deliveryTime: { type:Date  },
}, { timestamps: true });

export const MealDelivery = mongoose.model('MealDelivery', mealDeliverySchema);