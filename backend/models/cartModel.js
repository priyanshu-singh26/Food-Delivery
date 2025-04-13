import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId : [{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref:"User"
    }],
    items: [{
        type: mongoose.Schema.Types.ObjectId,      // ref food
        // required: true
        ref:"food"
    }],
    amount : {
        type: String,
        required: true
    },
    quentity : {
        type : Number,
        default : 1
    }
})


export const cartModel = mongoose.model('cart', cartSchema);