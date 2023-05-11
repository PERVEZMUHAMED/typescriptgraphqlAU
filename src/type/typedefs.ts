import {gql} from "apollo-server-express"

export const typeDefs = gql `
    type User {
        _id:ID!
        userName:String
        email:String
        password:String
        token:String
        createUser:User
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
    input loginInput {
        email:String
        password:String
    }
    input updateInput {
        userName:String
        email:String
        password:String
        personalDetails:personalInput
    }
    input deleteInput {
        _id:ID
        userName:String
        email:String
        password:String
    }
    type Query {
        getUser(_id:ID!):[User]
    }
    type Mutation {
        createUser(input:userInput):Result
        createCurrency(input:currencyInput):Result
        createDeposit(input:depositInput):Result
        createWithdraw(input:withdrawInput):Result
        Login(input:loginInput):Result
        updateUser(input:updateInput):Result
        deleteUser(input:deleteInput):Result
    }
`;