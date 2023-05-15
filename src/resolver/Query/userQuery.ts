import { ApolloError } from "apollo-server-express";
import { currency, deposit, user, withdraw } from "../../di/container.di"

export const userQuery = {
    Query:{
        getUser:async(parent, args, context)=>{
            try {
                const userData = await user.getUser(args, context);
                console.log("userDatas", userData);
                if(!userData) throw new ApolloError("Data Not Found", "401");
                return userData;
            } catch (error) {
                return error;
            }
        },
        getAllUsers:async(parent, args, context)=>{
            try {
                const userData = await user.getAllUsers(args, context);
                if(!userData) throw new ApolloError("Data Not Found", "401");
                return userData;
            } catch (error) {
                return error;
            }
        }
    }
}