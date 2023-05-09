import { Document } from "mongoose";

export default interface Deposit extends Document {
    user_id:string
    currency_id:string
    transactionId:string
    currency:string
    Amount:number
}