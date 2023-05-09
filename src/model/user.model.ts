import {Schema, model} from "mongoose";
import validator from "validator";
import User from "./Interface/user.model.interface";

const userSchema = new Schema({
    userName:{
        type:String,
        required:[true, "Please, Enter the userName"],
        trim:true
    },
    email:{
        type:String,
        required:[true, "Please Enter Email"],
        validate:[validator.isEmail, "Please Enter valid Email Address"]
    },
    password:{
        type:String,
        required:[true, "Please Enter Password"]
    },
    personalDetails:{
        gender:String,
        age:Number
    }
},{timestamps:true})

export default model<User>("users", userSchema);