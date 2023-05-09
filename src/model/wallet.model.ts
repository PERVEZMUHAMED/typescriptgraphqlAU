import {Schema, model} from "mongoose";
import Wallet from "./Interface/wallet.model.interface";
import {Types} from "mongoose";
let ObjectId = Types.ObjectId

const walletSchema = new Schema ({
    user_id:{
        type:ObjectId,
        required:true
    },
    wallet:[
        {
            currency_id:ObjectId,
            currency:{
                type:String,
            },
            Amount:{
                type:Number,
                default:0,
            }
        }
    ]
},{timestamps:true})

export default model<Wallet>("wallets", walletSchema);