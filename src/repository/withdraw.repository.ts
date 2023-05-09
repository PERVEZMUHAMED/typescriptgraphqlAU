import { injectable } from "inversify";
import "reflect-metadata";
import IWithdrawRepository from "./Interface/withdraw.repository.interface";
import { ApolloError } from "apollo-server-express";

@injectable()
class WithdrawRepository implements IWithdrawRepository {
    public Create =async(args, model) =>{
        try {
            const create = await model.create(args);
            // if(!create) throw new ApolloError("Data not created");
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
                {$inc:{"wallet.$.Amount":-args.Amount}});
                console.log("walletUpdate", wallet);
            // if(wallet) throw new ApolloError("Data not Find");
            return wallet;
        } catch (error) {
            return error;
        }
    }
}
export default WithdrawRepository;