import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js"
import bcrypt from "bcrypt"

const SECRET_KEY = process.env.SECRET_KEY || 'muhammed';
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '1h';

//user Registration
export const userRegister = async (req,res)=>{
    console.log(req.body);
    const {email,password,username,mobile} = req.body
    const salt = await bcrypt.genSalt(10)
    const hasPassword = await bcrypt.hash(password,salt)
   
    const checkUser = await User.findOne({ $or: [{ email }, { username },{mobile}] });
    if(checkUser){
        const status = false
        let message 
        let data 
        if(checkUser.username === username){
            message = "UserName already Taken"
            data = username
        }
        else if(checkUser.email === email){
            message = "Email already Registed"
            data = email
        }
        else if(checkUser.mobile === mobile){
            message = "Mobile Number is already Registed"
            data = mobile
        }
        return res.status(208).json({status:status,message:message, Error_Field_data:data})
        
    }else{

        try {
        
            const newUser =new User({
                username:username,
                password:hasPassword,
                email:email,
                mobile:mobile 
            })
            newUser.save()
            res.status(200).json({status:true,message:"User Registartion SuccessFull Please Login", data:newUser})
        } catch (error) {
            res.status(500).json(error)
        }
        
    } 
}

//USer Login 
export const userLogin  = async(req,res)=>{
    console.log("body===",req.body);

    const {password , username } =req.body
    const user = await User.findOne({username})
    console.log("user===",!user);
    
    if(!user || !bcrypt.compareSync(password,user.password)){
    console.log("user=== iniff");
        return res.status(208).json({ status:false, message: 'Invalid username or password ',data:username });
    }

    try {
        const payload = {id:user._id , username:user.username}
        const jwtToken= jwt.sign(payload,SECRET_KEY,{expiresIn:TOKEN_EXPIRATION})
        const responceData = {username:user.username , token:jwtToken}
        res.status(200).json({status:true,message:" Login Successfull",data:responceData})        
    } catch (error) {
        res.status(500).json(error)
    }
    
}

//User Get Movie Details
export const getMovieDetails = async (req,res)=>{
    console.log("uer==",req.user);
    res.status(200).json({status:true,message:"User is Authenticated",data:req.user})
}