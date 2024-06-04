import mongoose from "mongoose";

export const DBCONNECTION =async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL , {})
        console.log("Db connected");
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Exit the process with failure
    }
} 