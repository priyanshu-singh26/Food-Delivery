import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())  // get the request frontend to backend that will be parse  
app.use(cors())

// api endPoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user/auth", userRouter);
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


// app.get("/", (req,res)=>{
//     res.send("Api working")
// })

app.listen(port,()=>{
    connectDB();
   console.log(`Server is start on ${port}`)
})