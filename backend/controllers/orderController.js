import { orderModel } from "../models/orderModel.js";
// import { userModel } from "../models/userModel.js";
// import Stripe from 'stripe';

// const strip = new Stripe(yourKey)



// placing user order from  frontend
export const placeOrder = async (req,res) => {

    const { userId,items,amount,address } = req.body;

    const frontend_url = "http://localhost:5173";

    try{
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address
        });

         await newOrder.save();
         await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});


         const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount : item.price*100*80
            },
            quantity:item.quantity

         }))

         line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
         })

        //  const session = await stripe.checkout.sessions.create({
        //     line_items:line_items,
        //     mode:"payment",
        //     success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`
            // cancle_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`

        //  })
              res.json({
                success:true,
                session_url : session.url

              })
    }
    catch(error){
        console.log("Error")


    }

}

// const userOrders from frontend
export const userOrders = async (req,res) => {
    try{
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({
            success:true,
            data:orders
        })
    }
    catch(error){
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }
  
}

// Listing orders for admin panel
export const listOrders = async (req,res) => {
    try{
        const orders = await orderModel.find({});
        res.json({
            success:true,
            data:orders
        })
    }
    catch(error){
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }
} 