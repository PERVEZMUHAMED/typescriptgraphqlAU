import mongoose from "mongoose";

const {MONGODB_URL} = process.env;

export default class Database {
    public databaseConnection = async()=>{
        mongoose.connect(MONGODB_URL)
        .then(()=>{
            console.log("Database is Connected");
        })
        .catch((err)=>{
            console.log(`Database is not Connected:${err}`);
        })
    }
}