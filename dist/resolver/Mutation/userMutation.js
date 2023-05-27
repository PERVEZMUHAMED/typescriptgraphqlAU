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
exports.userMutation = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const container_di_1 = require("../../di/container.di");
exports.userMutation = {
    Mutation: {
        createUser: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("argss", args);
            try {
                const createuser = yield container_di_1.user.Register(args);
                console.log("createuser", createuser);
                if (!createuser)
                    throw new apollo_server_express_1.ApolloError("Data Not Found", "401");
                return {
                    success: true,
                    status: 201,
                    message: "Registration Successfully",
                    userData: createuser
                };
            }
            catch (error) {
                return error;
            }
        }),
        Login: (parent, args, Context) => __awaiter(void 0, void 0, void 0, function* () {
            // console.log("context", Context);
            try {
                const login = yield container_di_1.user.Login(args, Context);
                console.log("loginM", login);
                if (!login)
                    throw new apollo_server_express_1.ApolloError("Data Not Found", "401");
                return {
                    success: true,
                    status: 201,
                    message: "Login Successfully",
                    userData: login,
                    login
                };
            }
            catch (error) {
                return error;
            }
        }),
        updateUser: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updateuser = yield container_di_1.user.updateUser(args, context);
                if (!updateuser)
                    throw new apollo_server_express_1.ApolloError("Data Not Found", "401");
                return {
                    success: true,
                    status: 201,
                    message: "Updated Successfully",
                    userData: updateuser
                };
            }
            catch (error) {
                return error;
            }
        }),
        deleteUser: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const deleteuser = yield container_di_1.user.deleteUser(args, context);
                if (!deleteuser)
                    throw new apollo_server_express_1.ApolloError("Data Not Found", "401");
                return {
                    success: true,
                    status: 201,
                    message: "Deleted Successfully",
                };
            }
            catch (error) {
                return error;
            }
        }),
        forgotPassword: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const forgotpassword = yield container_di_1.user.forgotPassword(args);
                if (!forgotpassword)
                    throw new apollo_server_express_1.ApolloError("Data Not Found", "401");
                return {
                    success: true,
                    status: 201,
                    message: `Email send to ${args.input.email}`,
                };
            }
            catch (error) {
                return error;
            }
        }),
        resetPassword: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const resetPassword = yield container_di_1.user.resetPassword(args);
                console.log("resetPasswordM", resetPassword);
                if (!resetPassword)
                    throw new apollo_server_express_1.ApolloError("Data not Found", "401");
                return {
                    success: true,
                    status: 201,
                    message: "Login Successfully",
                    resetPasswordData: resetPassword,
                };
            }
            catch (error) {
                return error;
            }
        }),
        changePassword: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const changePassword = yield container_di_1.user.changePassword(args, context);
                console.log("changePasswordM", changePassword);
                if (!changePassword)
                    throw new apollo_server_express_1.ApolloError("Data not Found", "401");
                return {
                    success: true,
                    status: 201,
                    // message:"Login Successfully",
                    // changePasswordData:changePassword,
                };
            }
            catch (error) {
                return error;
            }
        })
    }
};
