import { Schema, model } from "mongoose";
import Currency from "./Interface/currency.model.interface";

const currencySchema = new Schema({
    currencyName:{
        type:String,
        required:[true, "Please, Enter currencyName"]
    },
    code:{
        type:String,
        required:[true, "Please enter currency code"]
    }
},{timestamps:true})

export default model<Currency>("currencys", currencySchema);