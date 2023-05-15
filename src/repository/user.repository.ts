import { injectable } from "inversify";
import "reflect-metadata";
import IUserRepository from "./Interface/user.repository.interface";
import { ApolloError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import { model } from "mongoose";
import userModel from "../model/user.model";
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
            const update = await model.findByIdAndUpdate(context.user,
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
    public Find = async(args, model)=>{
        try {
            const find = await model.find();
            console.log("findR", find);
            return find;
        } catch (error) {
            return error;
        }
    }
    public Findbyid = async(args, model, context)=>{
        try {
            const find = await model.findById(context.user._id);
            console.log("findbyidR", find);
            return find;
        } catch (error) {
            return error;
        }
    }
    // public verifyToken = async(args, model, context)=>{
    //     try {
    //         const {JWT_SECRET} = process.env;
    //         const token = context.req.headers.authorization;
    //         if(!token) throw new ApolloError("Login first to Handle this resource","401");
    //         const decoded:any = jwt.verify(token, JWT_SECRET);
    //         if(!decoded) throw new ApolloError("Unauthorized User", "401");
    //         const user = await model.findById(decoded._id);
    //         return user;
    //     } catch (error) {
            
    //     }
    // }
}
export default UserRepository;