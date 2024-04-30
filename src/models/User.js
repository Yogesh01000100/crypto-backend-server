import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    blockNumber: String,
    timeStamp: String,
    hash: String,
    nonce: String,
    blockHash: String,
    transactionIndex: String,
    from: String,
    to: String,
    value: String,
    gas: String,
    gasPrice: String,
    isError: String,
    txreceipt_status: String,
    input: String,
    contractAddress: String,
    cumulativeGasUsed: String,
    gasUsed: String,
    confirmations: String
});

const userSchema = new mongoose.Schema({
    address: { type: String, unique: true, required: true },
    transactions: [transactionSchema]
});

export const User = mongoose.model('User', userSchema);
