"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
let ObjectId = mongoose_2.Types.ObjectId;
const walletSchema = new mongoose_1.Schema({
    user_id: {
        type: ObjectId,
        required: true
    },
    wallet: [
        {
            currency_id: ObjectId,
            currency: {
                type: String,
            },
            Amount: {
                type: Number,
                default: 0,
            }
        }
    ]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("wallets", walletSchema);
