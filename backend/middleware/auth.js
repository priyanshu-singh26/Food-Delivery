import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;

    if(!token){
       return res.status(400).json({
            status: false,
            message: "Not Authorized Login Again",
        })    
    }
    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id;
        next();
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            status: false,
            message: "Error",
        })    
    }

}

export default authMiddleware;