import axios from "axios";
import "dotenv/config";
import cron from "node-cron";
import { Price } from "../models/Price.js";

async function checkPrice() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    );
    const ethPriceInINR = response.data.ethereum.inr;

    const newPrice = new Price({ price: ethPriceInINR });
    await newPrice.save();
    console.log(`Ethereum price updated: INR ${ethPriceInINR}`);
  } catch (error) {
    console.error("Failed to fetch or save Ethereum price:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching price!",
      data: [],
    });
  }
}

export const setupPriceScheduler = async () => {
  cron.schedule("*/10 * * * *", checkPrice);
};
