import { Schema, model } from "mongoose";
import Auditor from "./Interface/auditor.model.interface";
import { Types } from "mongoose";
let objectId = Types.ObjectId;

const auditorSchema = new Schema({
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
    preBalance:{
        type:Number,
        default:0
    },
    postBalance:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:[true, "Please Enter category"]
    },
},{timestamps:true});

export default model<Auditor>("auditors", auditorSchema);