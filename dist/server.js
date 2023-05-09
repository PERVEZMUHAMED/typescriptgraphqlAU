"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const app = new app_1.default();
const database = new database_1.default();
app.startServer();
database.databaseConnection();
// const myarr =[
//     {currency:"INR", code:"143"},
//     {currency:"USD", code:"143"},
//     {currency:"OMN", code:"143"},
// ];
// let objec:any = {}
// let arr:any = []
// for (let i =0; i<myarr.length; i++) {
//     objec = {};
//     objec.currency = myarr[i].currency;
//     objec.code = myarr[i].code;
//     arr.push(objec);
// }
// console.log(myarr.length);
// console.log(arr);
// myarr.forEach((items, index, arrr)=>{
//     objec = {};
//     objec.currency = myarr[index].currency;
//     objec.code = myarr[index].code;
//     arr.push(objec);
//     console.log("arr", arr);
//     // console.log(items);  
// })
