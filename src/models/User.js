import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    address: { type: String, unique: true, required: true },
    balance: { type: Number, default: 0 }
});

export const User = mongoose.model('User', userSchema);
