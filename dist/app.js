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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, "config/config.env") });
const typedefs_1 = require("./type/typedefs");
const mutation_1 = require("./resolver/mutation");
const userMutation_1 = require("./resolver/Mutation/userMutation");
const userQuery_1 = require("./resolver/Query/userQuery");
const container_di_1 = require("./di/container.di");
class App {
    constructor() {
        this.startServer = () => __awaiter(this, void 0, void 0, function* () {
            const { PORT } = process.env;
            const server = new apollo_server_express_1.ApolloServer({
                typeDefs: typedefs_1.typeDefs,
                resolvers: [mutation_1.mutationResolver, userMutation_1.userMutation, userQuery_1.userQuery],
                context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const token = req.headers.authorization || "";
                        const users = yield container_di_1.user.verifyToken(token);
                        // if(!users) throw new ApolloError("Login first to handle this resource", "401");
                        return { users };
                        // const {JWT_SECRET} = process.env;
                        // console.log("token", token);
                        // const decoded:any = jwt.verify(token, JWT_SECRET);
                        // console.log("decoded", decoded);
                        // if(!decoded) throw new ApolloError("Unauthorized user","401");
                        // const user = await userModel.findById(decoded._id);
                        // return {user};
                    }
                    catch (error) {
                        return error;
                    }
                })
            });
            const app = server.applyMiddleware({ app: this.app });
            this.app.listen(PORT, () => {
                console.log(`Server is Connected in http://localhost:${PORT}${server.graphqlPath}`);
            });
        });
        this.app = (0, express_1.default)();
    }
}
exports.default = App;
