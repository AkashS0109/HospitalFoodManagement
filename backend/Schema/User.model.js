import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo:{type:Number ,required:true},
    role: {
      type: String,
      enum: ['admin', 'cook', 'delivery'],
      required: true,
    },
    status: {
      type: String,
      enum: ['present', 'absent'],
      default: 'absent', // Default to 'present'
    },
  },
  { timestamps: true }
);



export const User = mongoose.model('User', userSchema);
