import express, { Application } from "express";
import { ApolloError, ApolloServer, AuthenticationError } from "apollo-server-express";
import { join } from "path";
import dotenv from "dotenv";
dotenv.config({path:join(__dirname, "config/config.env")})
import {typeDefs} from "./type/typedefs";
import { mutationResolver } from "./resolver/mutation";
import jwt from "jsonwebtoken"; 
import { userMutation } from "./resolver/Mutation/userMutation";
import userModel from "./model/user.model";
import walletModel from "./model/wallet.model";
import currencyModel from "./model/currency.model";
import { userQuery } from "./resolver/Query/userQuery";


export default class App {
    app:Application;
    constructor(){
        this.app = express();
    }
    public startServer = async()=>{
        const {PORT} = process.env; 
        const server = new ApolloServer ({
            typeDefs:typeDefs,
            resolvers:[mutationResolver, userMutation, userQuery],
            context:async({req}) => {
                try {
                    const {JWT_SECRET} = process.env;
                    const token = req.headers.authorization;
                     if(!token) throw new ApolloError("Login first to handle this resource", "401");
                    const decoded:any = jwt.verify(token, JWT_SECRET);
                    if(!decoded) throw new ApolloError("Unauthorized user","401");
                    const user = await userModel.findById(decoded._id);
                    return {user};
                } catch (error) {
                    return error;
                }
            }
        });
        const app = server.applyMiddleware({ app: this.app });
        this.app.listen(PORT,()=>{
            console.log(`Server is Connected in http://localhost:${PORT}${server.graphqlPath}`);
        })
    }
}