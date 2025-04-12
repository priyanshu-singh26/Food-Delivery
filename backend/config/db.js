import mongoose from "mongoose"

export const connectDB = async () => {
  try{  
       const conn = await mongoose.connect("mongodb://localhost:27017/food-delivery");
       console.log("MongoDB connect successfull");
  }
  catch(error){
       console.log("Error in MongoDB connections", error.message);
  }     
}

