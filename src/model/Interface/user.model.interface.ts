import { Document } from "mongoose";

export default interface User extends Document {
    userName:string,
    email:string,
    password:string
    peronalDetails:{
        gender:string,
        age:number
    }
    role:string,
    resetPasswordToken:string,
    resetPasswordTokenExpire:string
}