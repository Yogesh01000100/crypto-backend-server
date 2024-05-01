import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import userRoutes from "./src/routes/userRoutes.js";
import { setupPriceScheduler } from "./src/tasks/PriceUtility.js";
import { fileURLToPath } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGODB_URI;
const app = express();
app.use(express.json());
app.use(cors());

async function connectDatabase() {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully!");
    app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
    setupPriceScheduler();
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, ".") });
});

connectDatabase();
