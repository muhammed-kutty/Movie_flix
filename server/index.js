import express from "express"
import dotenv from "dotenv"
import { authRout } from "./routes/auth.routes.js"
import { DBCONNECTION } from "./config/dbConnection.js"
import cors from "cors";
import morgan from "morgan";

dotenv.config()
DBCONNECTION()
const PORT = process.env.PORT || 5000
const app = express()
app.use(morgan("dev"));
app.use(express.json())

app.use(cors("*"))

app.use("/api/user",authRout)

app.listen(PORT,()=>{
    console.log("Server Is Running at localhost://",PORT);
})
