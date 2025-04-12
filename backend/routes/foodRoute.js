import express from "express";
import multer from "multer";
import { addFood, listFood } from "../controllers/foodController.js";


// Router
const foodRouter = express.Router();


// Image Storage Engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})


// Router Endpoint
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood)
// foodRouter.delete("/remove", removeFood)





export default foodRouter;