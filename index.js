import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from './src/routes/userRoutes.js';
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3001;  
const mongoUri = process.env.MONGODB_URI; 

async function connectDatabase() {
    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

connectDatabase();

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.status(200).send(" Welcome to KOINX BACKEND server !");
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
