import mongoose from "mongoose"

const PriceSchema = new mongoose.Schema({
    price: Number,
    timestamp: { type: Date, default: Date.now }
});
export const Price = mongoose.model('Price', PriceSchema);