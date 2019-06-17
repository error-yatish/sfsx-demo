import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    trader: String,
    ticker: String,
    side: String,
    price: Number,
    shares: Number,
    timestamp: { type: Number, default: new Date().getTime() },
    isExecuted: Boolean,
});
