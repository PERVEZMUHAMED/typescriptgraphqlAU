import {injectable, inject} from "inversify";
import DepsoitRepository from "../repository/deposit.repository";
import { TYPES } from "../di/Types";
import { ApolloError } from "apollo-server-express";
import IDepositBusiness from "./Interface/deposit.business.interface";
import depositModel from "../model/deposit.model";
import auditorModel from "../model/auditor.model";
import walletModel from "../model/wallet.model";
import currencyModel from "../model/currency.model";

@injectable() 
class DepositBusiness implements IDepositBusiness {
    private deposit: DepsoitRepository;
    constructor(
        @inject(TYPES.Deposit) private _depsoit:DepsoitRepository
    ){
        this.deposit = _depsoit;
    }
    public createDeposit = async(args)=>{
        const {user_id, currency, transactionId, Amount} = args.input;
        if(!user_id||!currency||!transactionId||!Amount) {
            throw new ApolloError("Please Filled all the Fields", "401");
        }
        try {
            const existTransactionId = await this.deposit.FindOne({transactionId:transactionId}, depositModel);
            if(existTransactionId) throw new ApolloError("TransactionId Must Be Unique", "401");
            const currencyCode = await this.deposit.FindOne({code:currency}, currencyModel)
            const walletPre = await this.deposit.wallet(args.input, walletModel);
            console.log("walletPre", walletPre);
            const createDeposit = await this.deposit.Create({
                user_id:user_id,
                currency_id:currencyCode._id,
                transactionId:transactionId,
                currency:currency,
                Amount:Amount
            }, depositModel);
            console.log("createDeposit", createDeposit);
            // if(!createDeposit) throw new ApolloError("deposit not Created", "401"); 
            // wallet Amount after deposit of that currency
            const walletupdate = await this.deposit.walletUpdate(args.input, walletModel);
            console.log("walletupdateB", walletupdate);
            const walletPost = await this.deposit.wallet(args.input, walletModel);
            console.log("walletPost", walletPost);
            const createAuditor = await this.deposit.Create({
                user_id:user_id,
                currency_id:currencyCode.id,
                transactionId:transactionId,
                preBalance:walletPre.wallet[0].Amount,
                postBalance:walletPost.wallet[0].Amount,
                category:"Deposit", 
            }, auditorModel);
            console.log("createAuditor", createAuditor);
            if(!createAuditor) throw new ApolloError("Auditor is not Created", "401");
            return createDeposit;
        } catch (error) {
            return error;           
        }
    }
}
export default DepositBusiness;