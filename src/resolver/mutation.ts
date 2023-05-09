import { ApolloError } from "apollo-server-express";
import { currency, deposit, user, withdraw } from "../di/container.di"

export const mutationResolver = {
    Mutation:{
        createUser: async(parent, args, context)=>{
            try {
                const createuser = await user.Register(args);
                console.log("argss", args);
                
                if(!createuser) throw new ApolloError("Data Not Found", "401");
                return {
                    success:true,
                    status:201,
                    message:"Registration Successfully",
                    userData:createuser
                }
            } catch (error) {
                return error
            }
        },
        createCurrency: async(parent, args, context)=>{
          try {
            const createcurrency = await currency.createCurrency(args);
            if(!createcurrency) throw new ApolloError("Data Not FOund", "401");
            return {
                success:true,
                status:201,
                message:"Currency successfully Created",
                currencyData:createcurrency
            }
          } catch (error) {
            return error;
          }  
        },
        createDeposit: async(parent, args, context)=>{
            try {
              const createdeposit = await deposit.createDeposit(args);
              console.log("createdeposit", createdeposit);
              if(!createdeposit) throw new ApolloError("Data Not Found", "401");
              return {
                  success:true,
                  status:201,
                  message:"deposit successfully Created",
                  depositData:createdeposit
              }
            } catch (error) {
              return error;
            }  
          },
          createWithdraw: async(parent, args, context)=>{
            try {
              const createwithdraw = await withdraw.createWithdraw(args);
              if(!createwithdraw) throw new ApolloError("Data Not FOund", "401");
              return {
                  success:true,
                  status:201,
                  message:"withdraw successfully Created",
                  withdrawData:createwithdraw
              }
            } catch (error) {
              return error;
            }  
          }
    }
}