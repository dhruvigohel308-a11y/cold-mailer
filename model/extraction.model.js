import mongoose from "mongoose";

const extractionSchema=new monogoose.Schema({
    data:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    rawContent:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})