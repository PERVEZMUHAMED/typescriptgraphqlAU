import {injectable, inject} from "inversify";
import CurrencyRepository from "../repository/currency.repository";
import { TYPES } from "../di/Types";
import { ApolloError } from "apollo-server-express";
import currencyModel from "../model/currency.model";
import ICurrencyBusiness from "./Interface/currency.business.interface";
import walletModel from "../model/wallet.model";


@injectable()
class CurrencyBusiness implements ICurrencyBusiness {
    private currency : CurrencyRepository;
    constructor(
        @inject(TYPES.currency) private _currency : CurrencyRepository,
    ) {
        this.currency = _currency;
    }
    public createCurrency = async(args)=>{
        console.log("argsb", args);
        
        const {currencyName, code} = args.input;
        if(!currencyName||!code) {
            throw new ApolloError("Please Filled all The Fields", "401");
        }
        try {
            const existCurr = await this.currency.FindOne({currencyName:currencyName}, currencyModel);
            if(existCurr) throw new ApolloError("currencyName Already Exists. Try with Another CurrencyName","401");
            const existCode = await this.currency.FindOne({code:code}, currencyModel);
            if(existCode) throw new ApolloError("Code Already Exists.Try with Another Code","401");
            const walletUpdate = await this.currency.walletUpdate(args.input, walletModel);
            console.log("walletUpdateB", walletUpdate);
            if(!walletUpdate) throw new ApolloError("In wallet currency not Updated", "401");
            const createCurrency = await this.currency.Create({...args.input}, currencyModel);
            if(!createCurrency) throw new ApolloError("Currency Not Created","401")
            return createCurrency;
        } catch (error) {
            return error;
        }
    }
}
export default CurrencyBusiness;