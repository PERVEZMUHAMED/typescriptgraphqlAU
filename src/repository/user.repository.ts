import { injectable } from "inversify";
import "reflect-metadata";
import IUserRepository from "./Interface/user.repository.interface";
import { ApolloError } from "apollo-server-express";
import jwt from "jsonwebtoken";
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
    public Update = async(args, context, model)=>{
        try {
            const update = await model.findByIdAndUpdate(context._id,
            {$set:args},{new:true, runValidators:true});
            return update;
        } catch (error) {
            return error;
        }
    }
    public getJwtToken = async(args, model)=>{
        console.log("argsr", args);
        try {
            const {JWT_SECRET, JWT_EXPIRES_TIMES} = process.env;
            const user = await this.FindOne(args,model);
            console.log("userR", user);
            const token = jwt.sign({_id:user._id}, JWT_SECRET, {expiresIn:JWT_EXPIRES_TIMES})
            return token;
        } catch (error) {
            return error;
        }
    }
    public Delete = async(args, context, model)=>{
        try {
            const update = await model.findByIdAndDelete(context._id);
            return update;
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