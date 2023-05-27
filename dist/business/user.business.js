"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const apollo_server_express_1 = require("apollo-server-express");
const user_repository_1 = __importDefault(require("../repository/user.repository"));
const Types_1 = require("../di/Types");
const user_model_1 = __importDefault(require("../model/user.model"));
const wallet_model_1 = __importDefault(require("../model/wallet.model"));
const currency_model_1 = __importDefault(require("../model/currency.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = require("crypto");
const mongoose_1 = require("mongoose");
let ObjectId = mongoose_1.Types.ObjectId;
let UserBusiness = class UserBusiness {
    constructor(_user) {
        this._user = _user;
        //  Create a user and wallet for user.
        this.Register = (args) => __awaiter(this, void 0, void 0, function* () {
            console.log("argsB", args);
            const { userName, email, password } = args.input;
            if (!userName || !email || !password) {
                throw new apollo_server_express_1.ApolloError("Please filled all the fields", "401");
            }
            try {
                const hashPassword = yield bcrypt_1.default.hash(password, 7);
                const existuser = yield this.user.FindOne({ userName: userName }, user_model_1.default);
                if (existuser)
                    throw new apollo_server_express_1.ApolloError("userName Already Exist.Try with Another userName", "401");
                const existemail = yield this.user.FindOne({ email: email }, user_model_1.default);
                if (existemail)
                    throw new apollo_server_express_1.ApolloError("Email Already Exists.Try with Email", "401");
                const createUser = yield this.user.Create(Object.assign(Object.assign({}, args.input), { password: hashPassword }), user_model_1.default);
                const Currency = yield this.user.currency(args.input, currency_model_1.default);
                console.log("Currency", Currency);
                let walletArr = [];
                let walletObjec = {};
                for (let i = 0; i < Currency.length; i++) {
                    walletObjec = {};
                    walletObjec.currency_id = Currency[i]._id;
                    walletObjec.currency = Currency[i].code;
                    walletArr.push(walletObjec);
                }
                console.log("walletArr", walletArr);
                const wallet = yield this.user.Create({
                    user_id: new ObjectId(createUser._id),
                    wallet: walletArr
                }, wallet_model_1.default);
                console.log("walletB", wallet);
                if (!wallet)
                    throw new apollo_server_express_1.ApolloError("Wallet not Created", "401");
                const token = yield this.user.getJwtToken({ email: email }, user_model_1.default);
                return { token, createUser };
            }
            catch (error) {
                return error;
            }
        });
        // create a login when a user login to create jwt token.
        this.Login = (args, context) => __awaiter(this, void 0, void 0, function* () {
            console.log("args", args);
            // console.log("context", .context._id);
            const { email, password } = args.input;
            if (!email || !password) {
                throw new apollo_server_express_1.ApolloError("Please Enter email and password", "401");
            }
            try {
                const userEmail = yield this.user.FindOne({ email: email }, user_model_1.default);
                if (!userEmail)
                    throw new apollo_server_express_1.ApolloError("Invalid email or password", "401");
                const validPw = yield bcrypt_1.default.compare(password, userEmail.password);
                if (!validPw)
                    throw new apollo_server_express_1.ApolloError("Invalid email or password.", "401");
                const token = yield this.user.getJwtToken({ email: email }, user_model_1.default);
                // const {JWT_SECRET, JWT_EXPIRES_TIMES} = process.env;
                // const token = jwt.sign(
                //     {_id:userEmail._id}, 
                //     JWT_SECRET, 
                //     {expiresIn:JWT_EXPIRES_TIMES}
                // );
                // console.log( "token",token);
                return { token };
            }
            catch (error) {
                return error;
            }
        });
        //create a logout when the user logout token is deleted.
        this.logoutUser = (args, context) => __awaiter(this, void 0, void 0, function* () {
            const { user, email, password } = args.input;
            try {
            }
            catch (error) {
            }
        });
        // update a user details when the user login.
        this.updateUser = (args, context) => __awaiter(this, void 0, void 0, function* () {
            console.log("context", context);
            if (context.users) {
                try {
                    const updateuser = yield this.user.Update(args.input, context, user_model_1.default);
                    if (!updateuser)
                        throw new apollo_server_express_1.ApolloError("Data Not Found", "401");
                    return updateuser;
                }
                catch (error) {
                    return error;
                }
            }
            else {
                throw new apollo_server_express_1.ApolloError("You not have access to update this account", "401");
            }
        });
        //delete a user details. When, the  user login, they only delete his account only.
        this.deleteUser = (args, context) => __awaiter(this, void 0, void 0, function* () {
            console.log(context);
            if (context._id) {
                try {
                    const deleteuser = yield this.user.Delete(args.input, context, user_model_1.default);
                    if (!deleteuser)
                        throw new apollo_server_express_1.ApolloError("Data Not Found", "401");
                    return deleteuser;
                }
                catch (error) {
                    return error;
                }
            }
            else {
                throw new apollo_server_express_1.ApolloError("You not have access to delete this account", "401");
            }
        });
        // Read all users when a user login.
        this.getAllUsers = (args, context) => __awaiter(this, void 0, void 0, function* () {
            console.log("context", context);
            if (context.user) {
                try {
                    const getuser = yield this.user.Find(args.input, user_model_1.default);
                    if (!getuser)
                        throw new apollo_server_express_1.ApolloError("Data not Retrive", "401");
                    return getuser;
                }
                catch (error) {
                    return error;
                }
            }
            else {
                throw new apollo_server_express_1.ApolloError("You not have Access to update this Account", "401");
            }
        });
        // User read or get only his details.
        this.getUser = (args, context) => __awaiter(this, void 0, void 0, function* () {
            // console.log("argsB", args);     
            // console.log("contextss", context.userToken._id);
            console.log("context", context);
            if (context.users._id == args._id) {
                try {
                    const getuser = yield this.user.Findbyid({ _id: args._id }, user_model_1.default);
                    console.log("getuserssB", getuser);
                    if (!getuser)
                        throw new apollo_server_express_1.ApolloError("Data not Retrive", "401");
                    return getuser;
                }
                catch (error) {
                    return error;
                }
            }
            else {
                throw new apollo_server_express_1.ApolloError("You not have Access to retrive this Account", "401");
            }
        });
        // Verify  token
        this.verifyToken = (args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { JWT_SECRET } = process.env;
                // const token = context.req.headers.authorization;
                // if(!token) throw new ApolloError("Login first to Handle this resource","401");
                const decoded = jsonwebtoken_1.default.verify(args, JWT_SECRET);
                if (!decoded)
                    throw new apollo_server_express_1.ApolloError("Unauthorized User", "401");
                const user = yield this.user.Findbyid(decoded._id, user_model_1.default);
                return user;
            }
            catch (error) {
                return error;
            }
        });
        this.generateresetToken = (args) => {
            try {
                const token = (0, crypto_1.randomBytes)(20).toString('hex');
                const resetToken = (0, crypto_1.createHash)('sha256').update(token);
                const expireToken = Date.now() + 30 * 60 * 1000;
            }
            catch (error) {
                return error;
            }
        };
        this.forgotPassword = (args) => __awaiter(this, void 0, void 0, function* () {
            const { email } = args.input;
            try {
                const token = (0, crypto_1.randomBytes)(20).toString('hex');
                //Generate a Hash reset Token
                const resetToken = (0, crypto_1.createHash)('sha256').update(token).digest("hex");
                console.log("resetTokenB", resetToken);
                //set token expire time
                const expireToken = Date.now() + 30 * 60 * 1000;
                const user = yield this.user.FindOne({ email: email }, user_model_1.default);
                console.log("userB", user);
                if (!user)
                    throw new apollo_server_express_1.ApolloError("User Not Found", "404");
                user.resetPasswordToken = resetToken;
                user.resetPasswordTokenExpire = expireToken;
                user.save({ validateBeforeSave: false });
                console.log("resetPasswordToken", user.resetPasswordToken);
                //Create a reset Url
                const resetUrl = `http://localhost:5000/reset-password?token=${resetToken}`;
                const message = `Your Password reset url is as follows \n\n
            ${resetUrl} \n\n If you not request this email, then ignore it.`;
                const sendEmail = yield this.sendResetPasswordEmail({
                    email: user.email,
                    subject: "APCART Password Recovery",
                    message: message
                });
                console.log("sendEmailB", sendEmail);
                return true;
            }
            catch (error) {
                // user.resetPasswordToken = undefined;
                // user.resetPasswordTokenExpire = undefined;
                // await user.save({validateBeforeSave:false});
                return error;
            }
        });
        this.sendResetPasswordEmail = (options) => __awaiter(this, void 0, void 0, function* () {
            const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_NAME, SMTP_FROM_EMAIL } = process.env;
            const transport = {
                host: SMTP_HOST,
                port: SMTP_PORT,
                auth: {
                    user: SMTP_USER,
                    pass: SMTP_PASS
                }
            };
            const transporter = nodemailer_1.default.createTransport(transport);
            const message = {
                from: `${SMTP_FROM_NAME} <${SMTP_FROM_EMAIL}>`,
                to: options.email,
                subject: options.subject,
                text: options.message
            };
            yield transporter.sendMail(message);
        });
        this.resetPassword = (args) => __awaiter(this, void 0, void 0, function* () {
            const { resetPasswordToken, newPassword } = args.input;
            try {
                // const resetPasswordToke = createHash('sha256').update(resetPasswordToken).digest('hex');
                console.log("resetPasswordTokenB", resetPasswordToken);
                const user = yield this.user.FindOne({ resetPasswordToken: resetPasswordToken,
                    resetPasswordTokenExpire: { $gt: Date.now() }
                }, user_model_1.default);
                console.log("useB", user);
                if (!user)
                    throw new apollo_server_express_1.ApolloError("Password reset token is invalid or expire", "401");
                const hashPassword = yield bcrypt_1.default.hash(newPassword, 7);
                user.password = hashPassword;
                user.resetPasswordToken = undefined;
                user.resetPasswordTokenExpire = undefined;
                yield user.save({ validateBeforeSave: false });
                const token = yield this.user.getJwtToken({ email: user.email }, user_model_1.default);
                console.log("headerTokens", token);
                return { token };
            }
            catch (error) {
                return error;
            }
        });
        this.changePassword = (args, context) => __awaiter(this, void 0, void 0, function* () {
            const { oldPassword, password } = args.input;
            if (context.users) {
                try {
                    const user = yield this.user.Findbyid(context.users._id, user_model_1.default);
                    console.log("userB", user);
                    //check old Password
                    const validPw = yield bcrypt_1.default.compare(oldPassword, user.password);
                    if (!validPw) {
                        throw new apollo_server_express_1.ApolloError("Old password is incorrect", "401");
                    }
                    //Assign new Password
                    const hashPassword = yield bcrypt_1.default.hash(password, 7);
                    user.password = hashPassword;
                    yield user.save();
                    return true;
                }
                catch (error) {
                    return error;
                }
            }
        });
        this.user = _user;
    }
};
UserBusiness = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(Types_1.TYPES.User)),
    __metadata("design:paramtypes", [user_repository_1.default])
], UserBusiness);
exports.default = UserBusiness;
