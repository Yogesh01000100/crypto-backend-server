import axios from "axios";
import "dotenv/config";
import { User } from "../models/User.js";
import { Transaction } from "../models/Transaction.js";
import { fetchAllTransactions } from "../utils/fetch.js";

const BASE_URL_COINGECKO = process.env.COINGECKO_URL;

export const getTransactions = async (req, res) => {
  const address = req.params.address.toLowerCase();
  try {
    let user = await User.findOne({ address });

    if (!user) {
      await fetchAllTransactions(address);
      user = await User.findOne({ address });
    }

    const transactions = await Transaction.find({ user: user._id });

    res.status(200).json({
      status: "success",
      message: "Transactions fetched successfully!",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching transactions!",
      data: [],
    });
  }
};

export const fetchUserBalanceAndPrice = async (req, res) => {
  const address = req.params.address.toLowerCase();

  try {
    const priceResponse = await axios.get(`${BASE_URL_COINGECKO}`);
    const ethPrice = priceResponse.data.ethereum.inr;

    let user = await User.findOne({ address });

    if (!user) {
      await fetchAllTransactions(address);
      user = await User.findOne({ address });
    }

    const transactions = await Transaction.find({
      $or: [{ from: address }, { to: address }],
    });

    let balance = 0;
    transactions.forEach((tx) => {
      const toTransaction = tx.to.toLowerCase();
      const fromTransaction = tx.from.toLowerCase();

      const valueInEth = parseFloat(tx.value) / 1e18;
      if (tx.isError === "0" && tx.txreceipt_status === "1") {
        if (toTransaction == address) {
          balance += valueInEth;
        }
        if (fromTransaction.toLowerCase() == address) {
          balance -= valueInEth;
        }
      }
    });
    balance = parseFloat(balance.toFixed(6));
    user.balance = balance;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Balance updated successfully!",
      data: [{ balance: `${balance} ETH`, ethPrice: `₹ ${ethPrice}` }],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update the balance!",
      data: [],
    });
  }
};
