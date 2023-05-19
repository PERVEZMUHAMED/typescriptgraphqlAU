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
import  nodemailer from 'nodemailer';
import { createHash, randomBytes } from "crypto";
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
    //  Create a user and wallet for user.
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
    // create a login when a user login to create jwt token.
    public Login = async(args:any, context:any)=>{
        console.log("args", args);
        // console.log("context", .context._id);
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
    //create a logout when the user logout token is deleted.
    public logoutUser = async(args, context)=>{
        const {user, email, password} = args.input;
        try {
        
        } catch (error) {
            
        }
    }
    // update a user details when the user login.
    public updateUser= async(args,context)=>{
        console.log("context", context);
        if(context.users) {
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
    //delete a user details. When, the  user login, they only delete his account only.
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
    // Read all users when a user login.
    public getAllUsers = async(args, context)=>{
        console.log("context", context);
        if(context.user) {
            try {
                const getuser = await this.user.Find(args.input, userModel);
                if(!getuser) throw new ApolloError("Data not Retrive", "401");
                return getuser;
            } catch (error) {
                return error;
            }
        } else {
            throw new ApolloError("You not have Access to update this Account", "401");
        }
    }
    // User read or get only his details.
    public getUser = async(args, context)=>{
        // console.log("argsB", args);     
        // console.log("contextss", context.userToken._id);
        console.log("context", context);
        if(context.users._id == args._id) {
            try {
                const getuser = await this.user.Findbyid
                ({_id:args._id}, userModel);
                console.log("getuserssB", getuser);
                if(!getuser) throw new ApolloError("Data not Retrive", "401");
                return getuser;
            } catch (error) {
                return error;
            }
        } else {
            throw new ApolloError("You not have Access to retrive this Account", "401");
        }
    }
    // Verify  token
    public verifyToken = async(args)=>{
        try {
            const {JWT_SECRET} = process.env;
            // const token = context.req.headers.authorization;
            // if(!token) throw new ApolloError("Login first to Handle this resource","401");
            const decoded:any = jwt.verify(args, JWT_SECRET);
            if(!decoded) throw new ApolloError("Unauthorized User", "401");
            const user = await this.user.Findbyid(decoded._id, userModel);
            return user;
        } catch (error) {
            return error;
        }
    }
    public generateresetToken=(args)=>{
        try {
            const token = randomBytes(20).toString('hex');
            const resetToken = createHash('sha256').update(token); 
            const expireToken = Date.now() + 30 * 60 * 1000;
        } catch (error) {
            return error;
        }
    }
    public forgotPassword=async(args)=>{
        const {email} = args.input
        try {
            const token = randomBytes(20).toString('hex');
            //Generate a Hash reset Token
            const resetToken = createHash('sha256').update(token).digest("hex"); 
            console.log("resetTokenB", resetToken);
            //set token expire time
            const expireToken = Date.now() + 30 * 60 * 1000;
            const user = await this.user.FindOne({email:email}, userModel);
            console.log("userB", user);
            if(!user) throw new ApolloError("User Not Found", "404");
            user.resetPasswordToken = resetToken;
            user.resetPasswordTokenExpire = expireToken;
            user.save({validateBeforeSave:false});
            console.log("resetPasswordToken", user.resetPasswordToken);
            //Create a reset Url
            const resetUrl = `http://localhost:5000/reset-password?token=${resetToken}`
            const message = `Your Password reset url is as follows \n\n
            ${resetUrl} \n\n If you not request this email, then ignore it.`;
            const sendEmail = await this.sendResetPasswordEmail({
                email:user.email,
                subject:"APCART Password Recovery",
                message:message
            })
            console.log("sendEmailB", sendEmail);
            return true;
        } catch (error) {
            // user.resetPasswordToken = undefined;
            // user.resetPasswordTokenExpire = undefined;
            // await user.save({validateBeforeSave:false});
            return error;
        }
    }
    public sendResetPasswordEmail = async(options)=>{
        const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_NAME, SMTP_FROM_EMAIL} = process.env;
        const transport:any ={
            host: SMTP_HOST,
            port: SMTP_PORT,
            auth: {
              user: SMTP_USER,
              pass: SMTP_PASS
            }
        }
        const transporter = nodemailer.createTransport(transport);
        const message = {
            from: `${SMTP_FROM_NAME} <${SMTP_FROM_EMAIL}>`,
            to:options.email,
            subject:options.subject,
            text:options.message
        }
        await transporter.sendMail(message)
    }
    public resetPassword = async(args)=>{
        const {resetPasswordToken, newPassword} = args.input;
        try {
            // const resetPasswordToke = createHash('sha256').update(resetPasswordToken).digest('hex');
            console.log("resetPasswordTokenB", resetPasswordToken);
            const user = await this.user.FindOne(
                {resetPasswordToken:resetPasswordToken,
                resetPasswordTokenExpire:{$gt:Date.now()}
                }, 
            userModel);
            console.log("useB", user);
            if(!user) throw new ApolloError("Password reset token is invalid or expire", "401");
            const hashPassword = await bcrypt.hash(newPassword, 7);
            user.password = hashPassword
            user.resetPasswordToken = undefined
            user.resetPasswordTokenExpire = undefined
            await user.save({validateBeforeSave:false});
            const token = await this.user.getJwtToken({email:user.email}, userModel);
            console.log("headerTokens", token);
            return {token};
        } catch (error) {
            return error;
        }
    }
    public changePassword = async(args,context)=>{
        const {oldPassword, password} = args.input;
        if(context.users){
            try {
                const user = await this.user.Findbyid(context.users._id, userModel);
                console.log("userB", user);
                //check old Password
                const validPw = await bcrypt.compare(oldPassword, user.password);
                if(!validPw) {
                    throw new ApolloError("Old password is incorrect", "401");
                }
                //Assign new Password
                const hashPassword = await bcrypt.hash(password, 7);
                user.password = hashPassword;
                await user.save();
                return true;
            } catch (error) {
                return error;
            }
        }
    }
}
export default UserBusiness;