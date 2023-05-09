"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
let objectId = mongoose_2.Types.ObjectId;
const withdrawSchema = new mongoose_1.Schema({
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
    currency: {
        type: String,
        required: [true, "Please Enter currency"]
    },
    Amount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("withdraws", withdrawSchema);
