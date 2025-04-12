import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount : {
        type: String,
        required: true
    },
    address : {
        type: Object,
        required: true
    },
    status : {
        type: String,
        default:"Food Processing",
        required: true
    },
    date : {
        type: Date,
        default: Date.now()
    },
    payment : {
        type : Boolean,
        default : false
    }
})


export const orderModel = mongoose.model('order', orderSchema);