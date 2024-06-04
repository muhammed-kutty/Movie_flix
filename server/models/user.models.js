import mongoos from "mongoose"


const userScheema = new  mongoos.Schema({
    username:{
        type:String,
        max:50,
        required:true,
        unique :true
    },
    email:{
        type:String,
        max:50,
        required:true,
        unique :true
    },
    mobile:{
        type:String,
        max:15,
        required:true,
        unique :true
    },
    password:{
        type:String,
        max:50,
        required:true,
    },
},{timestamps:true});

const User = mongoos.model("User",userScheema)

export {User}