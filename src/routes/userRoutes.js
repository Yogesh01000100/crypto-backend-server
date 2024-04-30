import express from "express";
import { getTransactions } from "../controllers/userUtility.js";

const router = express.Router();

router.get("/transactions/:address", getTransactions);

export default router;