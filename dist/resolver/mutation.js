"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutationResolver = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const container_di_1 = require("../di/container.di");
exports.mutationResolver = {
    Mutation: {
        //   createUser: async(parent, args, context)=>{
        //     try {
        //       const createuser = await user.Register(args);
        //       console.log("argss", args);
        //       if(!createuser) throw new ApolloError("Data Not Found", "401");
        //       return {
        //         success:true,
        //         status:201,
        //         message:"Registration Successfully",
        //         userData:createuser
        //       }
        //     } catch (error) {
        //       return error
        //     }
        // },
        createCurrency: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("context.user", context);
            try {
                const createcurrency = yield container_di_1.currency.createCurrency(args);
                if (!createcurrency)
                    throw new apollo_server_express_1.ApolloError("Data Not FOund", "401");
                return {
                    success: true,
                    status: 201,
                    message: "Currency successfully Created",
                    currencyData: createcurrency
                };
            }
            catch (error) {
                return error;
            }
        }),
        createDeposit: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const createdeposit = yield container_di_1.deposit.createDeposit(args);
                console.log("createdeposit", createdeposit);
                if (!createdeposit)
                    throw new apollo_server_express_1.ApolloError("Data Not Found", "401");
                return {
                    success: true,
                    status: 201,
                    message: "deposit successfully Created",
                    depositData: createdeposit
                };
            }
            catch (error) {
                return error;
            }
        }),
        createWithdraw: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const createwithdraw = yield container_di_1.withdraw.createWithdraw(args);
                if (!createwithdraw)
                    throw new apollo_server_express_1.ApolloError("Data Not FOund", "401");
                return {
                    success: true,
                    status: 201,
                    message: "withdraw successfully Created",
                    withdrawData: createwithdraw
                };
            }
            catch (error) {
                return error;
            }
        }),
        // Login:async(parent, args, Context)=>{
        //   console.log("context", Context);
        //   try {
        //     const login = await user.Login(args, Context);
        //     if(!login) throw new ApolloError("Data Not Found", "401");
        //     return {
        //       success:true,
        //       status:201,
        //       message:"Login Successfully",
        //       userData:login
        //     }
        //   } catch (error) {
        //     return error;
        //   }
        // },
        // updateUser:async(parent, args, context)=>{
        //   try {
        //     const updateuser = await user.updateUser(args, context);
        //     if(!updateuser) throw new ApolloError("Data Not Found", "401");
        //     return {
        //       success:true,
        //       status:201,
        //       message:"Login Successfully",
        //       userData:updateuser
        //     }
        //   } catch (error) {
        //     return error;
        //   }
        // },
        // deleteUser:async(parent, args, context)=>{
        //   try {
        //     const deleteuser = await user.deleteUser(args, context);
        //     if(!deleteuser) throw new ApolloError("Data Not Found", "401");
        //     return {
        //       success:true,
        //       status:201,
        //       message:"Deleted Successfully",
        //     }
        //   } catch (error) {
        //     return error;
        //   }
        // },
    }
};
