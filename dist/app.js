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
class App {
    constructor() {
        this.startServer = () => __awaiter(this, void 0, void 0, function* () {
            const { PORT } = process.env;
            const server = new apollo_server_express_1.ApolloServer({ typeDefs: typedefs_1.typeDefs, resolvers: mutation_1.mutationResolver });
            const app = server.applyMiddleware({ app: this.app });
            this.app.listen(PORT, () => {
                console.log(`Server is Connected in http://localhost:${PORT}${server.graphqlPath}`);
            });
        });
        this.app = (0, express_1.default)();
    }
}
exports.default = App;
