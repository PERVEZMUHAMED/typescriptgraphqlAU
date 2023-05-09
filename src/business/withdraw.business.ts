import {injectable, inject} from "inversify";
import WithdrawRepository from "../repository/withdraw.repository";
import withdrawModel from "../model/withdraw.model";
import IWithdrawBusiness from "./Interface/withdraw.business.interface";
import { TYPES } from "../di/Types";
import { ApolloError } from "apollo-server-express";
import auditorModel from "../model/auditor.model";
import walletModel from "../model/wallet.model";
import currencyModel from "../model/currency.model";

@injectable() 
class WithdrawBusiness implements IWithdrawBusiness {
    private withdraw: WithdrawRepository;
    constructor(
        @inject(TYPES.Withdraw) private _withdraw : WithdrawRepository
    ){
        this.withdraw = _withdraw;
    }
     // Withdraw Create
    public createWithdraw = async(args)=>{
        console.log("argsB", args);
        const {user_id,currency, transactionId, Amount} = args.input;
        if(!user_id||!currency||!transactionId||!Amount) {
            throw new ApolloError("Please Filled all the Fields", "401");
        }
        try {
            const existTransactionId = await this.withdraw.FindOne({transactionId:transactionId}, withdrawModel);
            if(existTransactionId) throw new ApolloError("TransactionId Must Be Unique", "401");
            const currencyCode = await this.withdraw.FindOne({code:currency}, currencyModel)
            console.log("currencyCode", currencyCode);

            //wallet previous Amount before  that currency withdraw
            const walletPre = await this.withdraw.wallet(args.input, walletModel);
            console.log("walletPre", walletPre);
            
            // Withdraw Created
            const createWithdraw = await this.withdraw.Create({
                user_id:user_id,
                currency_id:currencyCode._id,
                transactionId:transactionId,
                currency:currency,
                Amount:Amount
            }, withdrawModel);
            console.log("createWithdraw", createWithdraw);
            // if(!createWithdraw) throw new ApolloError("withdraw not Created", "401"); 
            
            // Wallet update currency balance after withdraw that currency
            const walletupdate = await this.withdraw.walletUpdate(args.input, walletModel);
            console.log("walletUpdate", walletupdate);
            
            const walletPost = await this.withdraw.wallet(args.input, walletModel);
                console.log("walletPost", walletPost);
            
                // Auditor Created
            const createAuditor = await this.withdraw.Create({
                user_id:user_id,
                currency_id:currencyCode.id,
                transactionId:transactionId,
                preBalance:walletPre.wallet[0].Amount,
                postBalance:walletPost.wallet[0].Amount,
                category:"Withdraw", 
            }, auditorModel);
            console.log("createAuditor", createAuditor);
            if(!createAuditor) throw new ApolloError("Auditor is not Created", "401");
            return createWithdraw;
        } catch (error) {
            return error;           
        }
    }
}
export default WithdrawBusiness;