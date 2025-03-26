import mongoose from "mongoose";

const dietChartSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    date: { 
      type: Date, 
      required: true 
    },
    diet_type: {
      type: String,
      enum: ["Morning", "Evening", "Night"], // Restrict to specific values
      required: true,
    },
   status:{
    type:mongoose.Schema.Types.ObjectId,
     ref:"MealDelivery"
   },
    diet: [
      {
        itemName: { 
          type: String, 
          required: true 
        },
        quantity: { 
          type: String, 
          required: true 
        }, // e.g., "1 Bowl", "2 Slices"
      },
    ],
    instructions: { 
      type: String 
    },
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt`
);

export const DietChart = mongoose.model("DietChart", dietChartSchema);
