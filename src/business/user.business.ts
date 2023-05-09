import {injectable, inject} from "inversify";
import UserRepository from "../repository/user.repository";
import IUserBusiness from "./Interface/user.business.interface";
import { TYPES } from "../di/Types";
import bcrypt from "bcrypt";
import userModel from "../model/user.model";
import { ApolloError } from "apollo-server-express";
import walletModel from "../model/wallet.model";
import { Types } from "mongoose";
import currencyModel from "../model/currency.model";
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
        const {userName, email, password, currency} = args.input;
        if(!userName||!email||!password){
            throw new ApolloError("Please filled all the fields","401");
        }
        try {
            const hashPassword = await bcrypt.hash(password, 7);
            const existuser = await this.user.FindOne({userName:userName},userModel);
            if(existuser) throw new ApolloError("userName Already Exist. Try with Another userName", "401");
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
            return createUser;
        } catch (error) {
            return error;
        }
    }
};
export default UserBusiness;