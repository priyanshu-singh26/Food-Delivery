import { userModel } from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import validator from 'validator'


// For SINGUP//
export const signup = async (req,res) =>{
    console.log('body-->', req.body)
    const { email,password,name } = req.body;

    try{
        if(!email || !password || !name){
            throw new Error("All field are required");
        }
        // check user allready exist
        const userAlreadyexit = await userModel.findOne({email});
        if(userAlreadyexit)
            return res.status(400).json({success:false, message:"user already exists"});     

        // validating email formate and strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false, message:"Please enter valid email"});
        }
        if(password.length<8){
            return res.status(400).json({success:false, message:"Please enter strong password"});
        }

        // hashing the password //
        const hashPassword = await bcrypt.hash(password, 10); 

        // generatVerificationCode//
        // const verificationToken = Math.floor(10000 + Math.random() * 90000).toString();

        // Save in dataBAse//
        const newUser = new userModel({
            name,
            email,
            password: hashPassword,
            // verificationToken,
            // verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });

        const user = await newUser.save();

        const token = createToken( user._id );

        res.status(200).json({
        status: true,
        token,
        message: "Signup Successfull",
        // user: {
        //     ...user._doc
        // },
       });
    }

    catch(error){
         res.status(400).json({success: false, message: error.message});
    }
};



// for LOGIN //
export const login = async (req,res) =>{
    const {email,password}=req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid mail"
            })
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if(!passwordValid){
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
            // alert("Invalid password");
        }

        // generat token
        const token = createToken(user._id);

        user.lastlogin = new Date();

        await user.save();

            res.status(200).json({
            success: true,
            token,
            message: "Login Successfull"
            // user: {
            //    ...user._doc,
            // },
            });
    }
    catch(error){
         console.log("error in login");
         return res.status(400).json({
            success: false,
            message: error.message
        });
    }

};


//  for LOGOUT //
export const logout = async (req,res) =>{
    // res.clearCookie("token");
    localStorage.removeItem("token")
    res.status(200).json({
        success: true,
        message: "logout Successfull"
    });
};


// create token
const createToken = (id) =>{
       return jwt.sign({ id }, process.env.JWT_SECRET ,{
        expiresIn: "7d",
       })
}    