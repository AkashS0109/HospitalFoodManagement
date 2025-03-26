import mongoose from "mongoose";
const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true  },
        age:{
            type:Number,
            required:true,
        },
        gender:{
            type:String,
            enum:['Male','Female','Others'],
            default:'Female'
        },
        roomNumber:{type:String,required:true},
        bedNumber:{type:String,required:true},
        floorNumber:{type:Number,required:true},
        diseases:{type:[String] ,required:true},
        allergies:{type:[String], required:true},
        contactInfo:{type:Number,required:true},
        emergency:{type:String,required:true}
},{timestamps:true});

export const Patient = mongoose.model('Patient',patientSchema);