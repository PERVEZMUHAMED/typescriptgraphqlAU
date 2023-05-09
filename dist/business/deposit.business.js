"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const deposit_repository_1 = __importDefault(require("../repository/deposit.repository"));
const Types_1 = require("../di/Types");
const apollo_server_express_1 = require("apollo-server-express");
const deposit_model_1 = __importDefault(require("../model/deposit.model"));
const auditor_model_1 = __importDefault(require("../model/auditor.model"));
const wallet_model_1 = __importDefault(require("../model/wallet.model"));
const currency_model_1 = __importDefault(require("../model/currency.model"));
let DepositBusiness = class DepositBusiness {
    constructor(_depsoit) {
        this._depsoit = _depsoit;
        this.createDeposit = (args) => __awaiter(this, void 0, void 0, function* () {
            const { user_id, currency, transactionId, Amount } = args.input;
            if (!user_id || !currency || !transactionId || !Amount) {
                throw new apollo_server_express_1.ApolloError("Please Filled all the Fields", "401");
            }
            try {
                const existTransactionId = yield this.deposit.FindOne({ transactionId: transactionId }, deposit_model_1.default);
                if (existTransactionId)
                    throw new apollo_server_express_1.ApolloError("TransactionId Must Be Unique", "401");
                const currencyCode = yield this.deposit.FindOne({ code: currency }, currency_model_1.default);
                const walletPre = yield this.deposit.wallet(args.input, wallet_model_1.default);
                console.log("walletPre", walletPre);
                const createDeposit = yield this.deposit.Create({
                    user_id: user_id,
                    currency_id: currencyCode._id,
                    transactionId: transactionId,
                    currency: currency,
                    Amount: Amount
                }, deposit_model_1.default);
                console.log("createDeposit", createDeposit);
                // if(!createDeposit) throw new ApolloError("deposit not Created", "401"); 
                // wallet Amount after deposit of that currency
                const walletupdate = yield this.deposit.walletUpdate(args.input, wallet_model_1.default);
                console.log("walletupdateB", walletupdate);
                const walletPost = yield this.deposit.wallet(args.input, wallet_model_1.default);
                console.log("walletPost", walletPost);
                const createAuditor = yield this.deposit.Create({
                    user_id: user_id,
                    currency_id: currencyCode.id,
                    transactionId: transactionId,
                    preBalance: walletPre.wallet[0].Amount,
                    postBalance: walletPost.wallet[0].Amount,
                    category: "Deposit",
                }, auditor_model_1.default);
                console.log("createAuditor", createAuditor);
                if (!createAuditor)
                    throw new apollo_server_express_1.ApolloError("Auditor is not Created", "401");
                return createDeposit;
            }
            catch (error) {
                return error;
            }
        });
        this.deposit = _depsoit;
    }
};
DepositBusiness = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(Types_1.TYPES.Deposit)),
    __metadata("design:paramtypes", [deposit_repository_1.default])
], DepositBusiness);
exports.default = DepositBusiness;
