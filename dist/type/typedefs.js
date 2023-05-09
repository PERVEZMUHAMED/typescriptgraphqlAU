"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
    type User {
        _id:ID!
        userName:String
        email:String
        password:String
        personalDetails:Personal
    }
    type Result {
        success:Boolean
        status:Int
        message:String
        userData:User
        currencyData:Currency
        depositData:Deposit
        withdrawData:Withdraw
    }
    type Personal {
        gender:String
        age:Int
    }
    type Currency {
        _id:ID!
        currencyName:String
        code:String
    }
    type Deposit {
        _id:ID!
        user_id:String
        currency_id:String
        transactionId:String
        currency:String
        Amount:Int
    }
    type Withdraw {
        _id:ID!
        user_id:String
        currency_id:String
        transactionId:String
        currency:String
        Amount:Int
    }
    input personalInput {
        gender:String
        age:Int
    }
    input userInput {
        _id:ID
        userName:String
        email:String
        password:String
        personalDetails:personalInput
    }
    input currencyInput {
        _id:ID
        currencyName:String
        code:String
    }
    input depositInput {
        _id:ID
        user_id:String
        currency_id:String
        transactionId:String
        currency:String
        Amount:Int
    }
    input withdrawInput {
        _id:ID
        user_id:String
        currency_id:String
        transactionId:String
        currency:String
        Amount:Int
    }
    type Query {
        getUser(_id:ID!):[User]
    }
    type Mutation {
        createUser(input:userInput):Result
        createCurrency(input:currencyInput):Result
        createDeposit(input:depositInput):Result
        createWithdraw(input:withdrawInput):Result
    }
`;
