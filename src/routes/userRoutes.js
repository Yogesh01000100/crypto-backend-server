import express from "express";
import { getTransactions, fetchUserBalanceAndPrice } from "../controllers/userUtility.js";

const router = express.Router();

router.get("/transactions/:address", getTransactions);
router.get("/balance/:address", fetchUserBalanceAndPrice);

export default router;