// import { error } from "console";
import { foodModel } from "../models/foodModel.js";
import fs from "fs"

// add food items
export const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`;
    console.log(image_filename);

    const { name, description, price, category, image } = req.body;

    const food = new foodModel({
        name,
        description,
        price,
        category,
        image:image_filename
    });
    // save in dataBase
    try{
        await food.save();
        res.status(201).json({
			success: true,
			message: "Food Added",
		});
    }
    catch(error){
        res.status(400).json({
            success: false, 
            message: error.message 
        });
    }

    
}

// all(get) food list
export const listFood = async (req,res) => {
    try{
        const foods = await foodModel.find({})
        res.status(201).json({
			success: true,
			data: foods
		});
    }
    catch(error){
            res.status(400).json({
                success: false, 
                message: error.message 
            });
    }
}


// remove food items
export const removeFood = async (req,res) => {
    try{
        const foods = await foodModel.findById(req.body.id)
        res.status(201).json({
			success: true,
			data: foods
		});
    }
    catch(error){
            res.status(400).json({
                success: false, 
                message: error.message 
            });
    }
}