import axios from "axios";
import "dotenv/config";
import { User } from "../models/User.js";

const apikey = process.env.API_KEY;

export const getTransactions = async (req, res) => {
  const address = req.params.address;
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=${apikey}`
    );
    const transactions = response.data.result;
    let user = await User.findOne({ address: address });
    if (!user) {
      user = new User({ address: address });
    }
    user.transactions = transactions;
    await user.save();
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
  const address = req.params.address;
  try {
    const priceResponse = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    );
    const ethPrice = priceResponse.data.ethereum.inr;

    const user = await User.findOne({ address: address });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let balance = 0;
    user.transactions.forEach((tx) => {
      if (tx.to === address) {
        balance += parseFloat(tx.value);
      }
      if (tx.from === address) {
        balance -= parseFloat(tx.value);
      }
    });
    res.status(200).json({
      status: "success",
      message: "Balance Updated successfully!",
      data: [{ balance: balance, ethPrice: ethPrice }],
    });
  } catch (error) {
    console.error("Error fetching user balance and Ethereum price:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update the balance!",
      data: [],
    });
  }
};
