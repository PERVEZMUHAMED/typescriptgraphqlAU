"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
let objectId = mongoose_2.Types.ObjectId;
const auditorSchema = new mongoose_1.Schema({
    user_id: {
        type: objectId,
        required: true,
    },
    currency_id: {
        type: objectId,
        required: true
    },
    transactionId: {
        type: String,
        trim: true,
        required: [true, "Please Enter transactionId"],
        unique: true,
    },
    preBalance: {
        type: Number,
        default: 0
    },
    postBalance: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: [true, "Please Enter category"]
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("auditors", auditorSchema);
