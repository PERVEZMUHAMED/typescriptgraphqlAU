import { injectable } from "inversify";
import "reflect-metadata";
import ICurrencyRepository from "./Interface/currency.repository.interface";

@injectable()
class CurrencyRepository implements ICurrencyRepository {
    public Create =async(args, model) =>{
        try {
            const create = await model.create(args);
            return create;
        } catch (error) {
            return error;
        }
    }
    public FindOne = async(args, model)=>{
        try {
            const findOne = await model.findOne(args);
            return findOne;
        } catch (error) {
            return error;
        }
    }
    public walletUpdate = async(args, model)=>{
        console.log("argsR", args);
        try {
            const wallet = await model.updateMany(
            {"wallet.currency":{$ne:args.code}},
            {$push:{wallet:{currency:args.code}}});
            console.log("wallletUpdateR", wallet);
            return wallet;
        } catch (error) {
            return error;
        }
    }
}
export default CurrencyRepository;