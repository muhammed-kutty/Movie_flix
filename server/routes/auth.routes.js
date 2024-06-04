import express from "express"
import { getMovieDetails, userLogin, userRegister } from "../controllers/auth.contoller.js"
import { checkAuthenticated } from "../middleware/Auth_middleware.js"

const authRout = express.Router()

//Register a user
authRout.post("/register",userRegister)

//login User
authRout.post("/login",userLogin)

authRout.get("/getdata",checkAuthenticated,getMovieDetails)


export{authRout}
