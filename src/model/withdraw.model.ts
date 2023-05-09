import { Schema, model } from "mongoose";
import Withdraw from "./Interface/withdraw.model.interface";
import { Types } from "mongoose";
let objectId = Types.ObjectId;

const withdrawSchema = new Schema({
    user_id:{
        type:objectId,
        required:true,
    },
    currency_id:{
        type:objectId,
        required:true
    },
    transactionId:{
        type:String,
        trim:true,
        required:[true, "Please Enter transactionId"],
        unique:true,
    },
    currency:{
        type:String,
        required:[true, "Please Enter currency"]
    },
    Amount:{
        type:Number,
        default:0
    }
},{timestamps:true});

export default model<Withdraw>("withdraws", withdrawSchema);