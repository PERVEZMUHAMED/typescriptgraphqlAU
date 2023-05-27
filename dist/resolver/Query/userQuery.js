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
exports.userQuery = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const container_di_1 = require("../../di/container.di");
exports.userQuery = {
    Query: {
        getUser: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const userData = yield container_di_1.user.getUser(args, context);
                console.log("userDatas", userData);
                if (!userData)
                    throw new apollo_server_express_1.ApolloError("Data Not Found", "401");
                return userData;
            }
            catch (error) {
                return error;
            }
        }),
        getAllUsers: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const userData = yield container_di_1.user.getAllUsers(args, context);
                if (!userData)
                    throw new apollo_server_express_1.ApolloError("Data Not Found", "401");
                return userData;
            }
            catch (error) {
                return error;
            }
        })
    }
};
