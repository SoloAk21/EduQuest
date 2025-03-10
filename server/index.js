import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import clerkWebhooks from "./routes/webhookRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use("/api/webhooks", clerkWebhooks);

app.use(errorMiddleware);
// Basic route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {});
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

connectDB();
