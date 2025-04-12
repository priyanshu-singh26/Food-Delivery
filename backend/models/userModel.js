import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    cardData:{
        type: mongoose.Schema.Types.ObjectId ,   // ref cart model
        // default:{}
        ref:"cartSchema"
    },


},{minimize:false}
);

export const userModel = mongoose.model('User', userSchema);
