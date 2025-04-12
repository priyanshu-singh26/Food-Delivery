import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId : [{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref:"userSchema"
    }],
    items: {
        type: mongoose.Schema.Types.ObjectId,      // ref food
        // required: true
        ref:"foodSchema"
    },
    amount : {
        type: String,
        required: true
    },
    quentity : {
        type : Boolean,
        default : false
    }
})


export const cartModel = mongoose.model('cart', cartSchema);