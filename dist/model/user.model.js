"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: [true, "Please, Enter userName"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please Enter Email"],
        unique: true,
        validate: [validator_1.default.isEmail, "Please Enter valid Email Address"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"]
    },
    personalDetails: {
        gender: String,
        age: Number
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", userSchema);
