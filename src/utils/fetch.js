import axios from "axios";
import { User } from "../models/User.js";
import { Transaction } from "../models/Transaction.js";

const API_KEY = process.env.API_KEY;
const BASE_URL_ETHERSCAN = process.env.ETHERSCAN_URL;

export const fetchAllTransactions = async (address) => {
    let page = 1;
    const maxRecords = 10000;
    let transactionsToInsert = [];

    let user = await User.findOne({ address: address });
    if (!user) {
        user = new User({ address: address.toLowerCase(), balance: 0 });
        await user.save();
    }

    try {
        while (true) {
            const response = await axios.get(`${BASE_URL_ETHERSCAN}`, {
                params: {
                    module: "account",
                    action: "txlist",
                    address,
                    startblock: 0,
                    endblock: 99999999,
                    page,
                    offset: maxRecords,
                    sort: "asc",
                    apikey: API_KEY,
                },
            });

            if (response.data.status !== "1") {
                console.error("Etherscan API error:", response.data.message);
                break;
            }

            const txs = response.data.result;
            if (txs.length === 0) {
                break;
            }

            transactionsToInsert = txs.map((tx) => new Transaction({
                ...tx,
                user: user._id,
                userAddress: address,
            }));

            await Transaction.insertMany(transactionsToInsert);
            transactionsToInsert = [];

            if (txs.length < maxRecords) {
                break;
            }

            page++;
        }
    } catch (error) {
        console.error("Error from Etherscan:", error);
        throw new Error("Failed to fetch transactions");
    }
};
