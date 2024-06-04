import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const SECRET_KEY = process.env.SECRET_KEY || 'muhammed';


export const checkAuthenticated = (req,res,next)=>{
    const authorization = req.headers['authorization']
    if(!authorization){
       return res.status(208).json({status:false,message:"token was Missing"})
    }
    const token = authorization?.split(' ')[1]
    if(!token){
       return res.status(208).json({status:false,message:"token was expierd please login again"})
    }
    try {
        console.log("token = ",token);
        const decode = jwt.verify(token , SECRET_KEY)
        req.user = decode
        next()
    } catch (error) {
        console.log("err==",error);
        res.status(500).json(error)
    }

}

