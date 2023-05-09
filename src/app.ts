import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { join } from "path";
import dotenv from "dotenv";
dotenv.config({path:join(__dirname, "config/config.env")})
import {typeDefs} from "./type/typedefs";
import { mutationResolver } from "./resolver/mutation";


export default class App {
    app:Application;
    constructor(){
        this.app = express();
    }
    public startServer = async()=>{
        const {PORT} = process.env; 
        const server = new ApolloServer(
            {typeDefs:typeDefs, resolvers:mutationResolver});
        const app = server.applyMiddleware({ app: this.app });
        this.app.listen(PORT,()=>{
            console.log(`Server is Connected in http://localhost:${PORT}${server.graphqlPath}`);
        })
    }
}