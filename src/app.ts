import express, { Application } from "express";
import { ApolloError, ApolloServer } from "apollo-server-express";
import { join } from "path";
import dotenv from "dotenv";
dotenv.config({path:join(__dirname, "config/config.env")})
import {typeDefs} from "./type/typedefs";
import { mutationResolver } from "./resolver/mutation";
import jwt from "jsonwebtoken"; 
import { userMutation } from "./resolver/Mutation/userMutation";


export default class App {
    app:Application;
    constructor(){
        this.app = express();
    }
    public startServer = async()=>{
        const {PORT} = process.env; 
        const server = new ApolloServer({
            typeDefs:typeDefs,
            resolvers:[mutationResolver, userMutation],
            context:({req, res})=>{
                try {
                    
                    const {JWT_SECRET} = process.env;
                    const token = req.headers.authorization||"";
                    const verifyToken = jwt.verify(token, JWT_SECRET);
                    // console.log("verifyToken", verifyToken);                   
                    if(!verifyToken) throw new ApolloError("Unauthorized user","401");
                    return verifyToken;
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