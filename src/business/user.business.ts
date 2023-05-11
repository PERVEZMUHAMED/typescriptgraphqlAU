import {injectable, inject} from "inversify";
import { ApolloError } from "apollo-server-express";
import UserRepository from "../repository/user.repository";
import IUserBusiness from "./Interface/user.business.interface";
import { TYPES } from "../di/Types";
import userModel from "../model/user.model";
import walletModel from "../model/wallet.model";
import currencyModel from "../model/currency.model";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 
import { Types } from "mongoose";
let ObjectId = Types.ObjectId;

@injectable()
class UserBusiness implements IUserBusiness {
    public user: UserRepository;
    constructor(
        @inject(TYPES.User) private _user : UserRepository
    ){
        this.user = _user;
    }
    public Register = async(args)=>{
        console.log("argsB", args);
        const {userName, email, password} = args.input;
        if(!userName||!email||!password){
            throw new ApolloError("Please filled all the fields","401");
        }
        try {
            const hashPassword = await bcrypt.hash(password, 7);
            const existuser = await this.user.FindOne({userName:userName},userModel);
            if(existuser) throw new ApolloError("userName Already Exist.Try with Another userName", "401");
            const existemail = await this.user.FindOne({email:email}, userModel);
            if(existemail) throw new ApolloError
            ("Email Already Exists.Try with Email", "401");
            const createUser = await this.user.Create
            ({...args.input, password:hashPassword}, userModel);
            const Currency = await this.user.currency(args.input, currencyModel);
            console.log("Currency", Currency);
            let walletArr:any =  [];
            let walletObjec:any = {};
            for(let i=0; i<Currency.length; i++) {
                walletObjec = {};
                walletObjec.currency_id = Currency[i]._id;
                walletObjec.currency = Currency[i].code;
                walletArr.push(walletObjec);
            }
            console.log("walletArr", walletArr);
            const wallet = await this.user.Create(
                {
                    user_id:new ObjectId(createUser._id),
                    wallet:walletArr
                },
            walletModel);
            console.log("walletB",wallet);
            if(!wallet) throw new ApolloError("Wallet not Created", "401");
            const token = await this.user.getJwtToken({email:email}, userModel);
            return {token, createUser};
        } catch (error) {
            return error;
        }
    }
    public Login = async(args:any, context:any)=>{
        console.log("args", args);
        // console.log("context", context._id);
        const {email, password} = args.input; 
        if(!email||!password) {
            throw new ApolloError("Please Enter email and password", "401");
        }
        try {
            const userEmail = await this.user.FindOne({email:email}, userModel);
            if(!userEmail) throw new ApolloError("Invalid email or password", "401");
            const validPw = await bcrypt.compare(password, userEmail.password);
            if(!validPw) throw new ApolloError("Invalid email or password.", "401");
            const token = await this.user.getJwtToken({email:email}, userModel);
            // const {JWT_SECRET, JWT_EXPIRES_TIMES} = process.env;
            // const token = jwt.sign(
            //     {_id:userEmail._id}, 
            //     JWT_SECRET, 
            //     {expiresIn:JWT_EXPIRES_TIMES}
            // );
            // console.log( "token",token);
            return {token};
        } catch (error) {
            return error;
        }
    }
    public logoutUser = async(args, context)=>{
        const {user, email, password} = args.input;
        try {
        
        } catch (error) {
            
        }
    }
    public updateUser= async(args,context)=>{
        console.log("context", context);
        if(context._id) {
            try {
                const updateuser = await this.user.Update(args.input, context, userModel);
                if(!updateuser) throw new ApolloError("Data Not Found", "401");
                return updateuser;
            } catch (error) {
                return error;
            }
        } else {
            throw new ApolloError("You not have access to update this account", "401");
        }
    }
    public deleteUser= async(args,context)=>{
        console.log(context);
        if(context._id) {
            try {
                const deleteuser = await this.user.Delete(args.input, context, userModel);
                if(!deleteuser) throw new ApolloError("Data Not Found", "401");
                return deleteuser;   
            } catch (error) {
                return error;
            }
        } else {
            throw new ApolloError("You not have access to delete this account", "401");
        }
    }
}
export default UserBusiness;