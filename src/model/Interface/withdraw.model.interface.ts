import { Document } from "mongoose";

export default interface Withdraw extends Document {
    user_id:string
    currency_id:string
    transactionId:string
    currency:string
    Amount:number
}