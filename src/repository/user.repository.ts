import { injectable } from "inversify";
import "reflect-metadata";
import IUserRepository from "./Interface/user.repository.interface";
import { ApolloError } from "apollo-server-express";

@injectable()
class UserRepository implements IUserRepository {
    public Create = async(args, model) =>{
        try {
            const create = await model.create(args);
            console.log("argsss", args);
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
    public currency = async(args, model)=>{
        try {
            const currency = await model.find({}, {code:1});
            console.log("currencyR", currency);
            // if(!currency) throw new ApolloError("Data not Find");
            return currency;
        } catch (error) {
            return error;
        }
    }
}
export default UserRepository;