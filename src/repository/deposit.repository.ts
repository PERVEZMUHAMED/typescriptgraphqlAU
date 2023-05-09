import { injectable } from "inversify";
import "reflect-metadata";
import { ApolloError } from "apollo-server-express";
import IDepositRepository from "./Interface/deposit.repository.interface";

@injectable()
class DepsoitRepository implements IDepositRepository {
    public Create =async(args, model) =>{
        console.log("argsR", args);
        try {
            const create = await model.create(args);
            console.log("creater", create);
            if(!create) throw new ApolloError("Data not created");
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
    public wallet = async(args, model)=>{
        console.log("argsR", args);
        try {
            const wallet = await model.findOne({user_id:args.user_id},
            {_id:0,wallet:{$elemMatch:{currency:args.currency}}});
            console.log("wallet", wallet);
            return wallet;
        } catch (error) {
            return error;
        }
    }
    public walletUpdate = async(args, model)=>{
        console.log("argsWUR", args);
        try {
            const wallet = await model.updateOne({user_id:args.user_id,
            wallet:{$elemMatch:{currency:args.currency}}},
            {$inc:{"wallet.$.Amount":args.Amount}});
            console.log("walletUpdate", wallet);
            // if(wallet) throw new ApolloError("Data not Find");
            return wallet;
        } catch (error) {
            return error;
        }
    }
}
export default DepsoitRepository;