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
const withdraw_repository_1 = __importDefault(require("../repository/withdraw.repository"));
const withdraw_model_1 = __importDefault(require("../model/withdraw.model"));
const Types_1 = require("../di/Types");
const apollo_server_express_1 = require("apollo-server-express");
const auditor_model_1 = __importDefault(require("../model/auditor.model"));
const wallet_model_1 = __importDefault(require("../model/wallet.model"));
const currency_model_1 = __importDefault(require("../model/currency.model"));
let WithdrawBusiness = class WithdrawBusiness {
    constructor(_withdraw) {
        this._withdraw = _withdraw;
        // Withdraw Create
        this.createWithdraw = (args) => __awaiter(this, void 0, void 0, function* () {
            console.log("argsB", args);
            const { user_id, currency, transactionId, Amount } = args.input;
            if (!user_id || !currency || !transactionId || !Amount) {
                throw new apollo_server_express_1.ApolloError("Please Filled all the Fields", "401");
            }
            try {
                const existTransactionId = yield this.withdraw.FindOne({ transactionId: transactionId }, withdraw_model_1.default);
                if (existTransactionId)
                    throw new apollo_server_express_1.ApolloError("TransactionId Must Be Unique", "401");
                const currencyCode = yield this.withdraw.FindOne({ code: currency }, currency_model_1.default);
                console.log("currencyCode", currencyCode);
                //wallet previous Amount before  that currency withdraw
                const walletPre = yield this.withdraw.wallet(args.input, wallet_model_1.default);
                console.log("walletPre", walletPre);
                // Withdraw Created
                const createWithdraw = yield this.withdraw.Create({
                    user_id: user_id,
                    currency_id: currencyCode._id,
                    transactionId: transactionId,
                    currency: currency,
                    Amount: Amount
                }, withdraw_model_1.default);
                console.log("createWithdraw", createWithdraw);
                // if(!createWithdraw) throw new ApolloError("withdraw not Created", "401"); 
                // Wallet update currency balance after withdraw that currency
                const walletupdate = yield this.withdraw.walletUpdate(args.input, wallet_model_1.default);
                console.log("walletUpdate", walletupdate);
                const walletPost = yield this.withdraw.wallet(args.input, wallet_model_1.default);
                console.log("walletPost", walletPost);
                // Auditor Created
                const createAuditor = yield this.withdraw.Create({
                    user_id: user_id,
                    currency_id: currencyCode.id,
                    transactionId: transactionId,
                    preBalance: walletPre.wallet[0].Amount,
                    postBalance: walletPost.wallet[0].Amount,
                    category: "Withdraw",
                }, auditor_model_1.default);
                console.log("createAuditor", createAuditor);
                if (!createAuditor)
                    throw new apollo_server_express_1.ApolloError("Auditor is not Created", "401");
                return createWithdraw;
            }
            catch (error) {
                return error;
            }
        });
        this.withdraw = _withdraw;
    }
};
WithdrawBusiness = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(Types_1.TYPES.Withdraw)),
    __metadata("design:paramtypes", [withdraw_repository_1.default])
], WithdrawBusiness);
exports.default = WithdrawBusiness;
