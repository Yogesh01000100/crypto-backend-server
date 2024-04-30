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
      status: 'success',
      message: 'Transactions fetched successfully!',
      data: transactions
  });
  } catch (error) {   
    res.status(500).json({
      status: 'error',
      message: 'Error fetching transactions!',
      data: []
  });
  }
};
