"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const inversify_1 = require("inversify");
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
let UserRepository = class UserRepository {
    constructor() {
        this.Create = (args, model) => __awaiter(this, void 0, void 0, function* () {
            try {
                const create = yield model.create(args);
                console.log("argsss", args);
                if (!create)
                    throw new apollo_server_express_1.ApolloError("Data not created");
                return create;
            }
            catch (error) {
                return error;
            }
        });
        this.FindOne = (args, model) => __awaiter(this, void 0, void 0, function* () {
            try {
                const findOne = yield model.findOne(args);
                return findOne;
            }
            catch (error) {
                return error;
            }
        });
        this.currency = (args, model) => __awaiter(this, void 0, void 0, function* () {
            try {
                const currency = yield model.find({}, { code: 1 });
                console.log("currencyR", currency);
                // if(!currency) throw new ApolloError("Data not Find");
                return currency;
            }
            catch (error) {
                return error;
            }
        });
    }
};
UserRepository = __decorate([
    (0, inversify_1.injectable)()
], UserRepository);
exports.default = UserRepository;
