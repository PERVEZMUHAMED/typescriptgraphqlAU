import { ApolloError } from "apollo-server-express";
import { currency, deposit, user, withdraw } from "../../di/container.di"

export const userMutation = {
  Mutation:{
    createUser: async(parent, args, context)=>{
      console.log("argss", args);
      try {
        const createuser = await user.Register(args);
        console.log("createuser", createuser);
        if(!createuser) throw new ApolloError("Data Not Found", "401");
        return {
          success:true,
          status:201,
          message:"Registration Successfully",
          userData:createuser
        }
      } catch (error) {
        return error
      }
    },
    Login:async(parent, args, Context)=>{
      // console.log("context", Context);
      try {
        const login = await user.Login(args, Context);
        console.log("loginM", login);
        if(!login) throw new ApolloError("Data Not Found", "401");
        return {
          success:true,
          status:201,
          message:"Login Successfully",
          userData:login,
          login
        }
      } catch (error) {
        return error;
      }
    },
    updateUser:async(parent, args, context)=>{
      try {
        const updateuser = await user.updateUser(args, context);
        if(!updateuser) throw new ApolloError("Data Not Found", "401");
        return {
          success:true,
          status:201,
          message:"Updated Successfully",
          userData:updateuser
        }
      } catch (error) {
        return error;
      }
    },
    deleteUser:async(parent, args, context)=>{
      try {
        const deleteuser = await user.deleteUser(args, context);
        if(!deleteuser) throw new ApolloError("Data Not Found", "401");
        return {
          success:true,
          status:201,
          message:"Deleted Successfully",
        }
      } catch (error) {
        return error;
      }
    },
    forgotPassword:async(parent, args, context)=>{
      try {
        const forgotpassword = await user.forgotPassword(args);
        if(!forgotpassword) throw new ApolloError("Data Not Found", "401");
        return {
          success:true,
          status:201,
          message:`Email send to ${args.input.email}`,
        }
      } catch (error) {
        return error;  
      }
    },
    resetPassword:async(parent, args, context)=>{
      try {
        const resetPassword = await user.resetPassword(args);
        console.log("resetPasswordM", resetPassword);
        if(!resetPassword) throw new ApolloError("Data not Found", "401");
        return {
          success:true,
          status:201,
          message:"Login Successfully",
          resetPasswordData:resetPassword,
        }
      } catch (error) {
        return error;
      }
    },
    changePassword:async(parent, args, context)=>{
      try {
        const changePassword = await user.changePassword(args, context);
        console.log("changePasswordM", changePassword);
        if(!changePassword) throw new ApolloError("Data not Found", "401");
        return {
          success:true,
          status:201,
          // message:"Login Successfully",
          // changePasswordData:changePassword,
        }
      } catch (error) {
        return error;
      }
    }
  }
}